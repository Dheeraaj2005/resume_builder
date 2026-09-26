/**
 * ResumiQ - Main Application Controller
 */

class ResumeApp {
  constructor() {
    this.STORAGE_KEY = 'resumiq_data_v1';
    
    // Initial State
    this.state = this.loadInitialState();

    this.zoomLevel = 1.0;

    this.initElements();
    this.bindEvents();
    this.populateFormFromState();
    this.renderSkillsTags();
    this.updatePreview();
    this.updateATSScore();
    this.initLucideIcons();
  }

  /**
   * Load initial state from LocalStorage or fallback to Senior SWE preset
   */
  loadInitialState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    // Default to Software Engineer preset
    return JSON.parse(JSON.stringify(RESUME_PRESETS.swe));
  }

  /**
   * Save state to LocalStorage
   */
  saveState() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    if (statusDot) statusDot.classList.add('saving');
    if (statusText) statusText.textContent = 'Saving...';

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }

    setTimeout(() => {
      if (statusDot) statusDot.classList.remove('saving');
      if (statusText) statusText.textContent = 'All changes saved';
    }, 400);
  }

  /**
   * Cache DOM elements
   */
  initElements() {
    // Navigation & Menus
    this.btnSamplesMenu = document.getElementById('btn-samples-menu');
    this.samplesDropdown = document.getElementById('samples-dropdown');
    this.btnDataMenu = document.getElementById('btn-data-menu');
    this.dataDropdown = document.getElementById('data-dropdown');
    this.btnThemeToggle = document.getElementById('btn-theme-toggle');
    this.themeIcon = document.getElementById('theme-icon');
    this.btnDownloadPDF = document.getElementById('btn-download-pdf');
    this.btnExportJSON = document.getElementById('btn-export-json');
    this.jsonFileInput = document.getElementById('json-file-input');
    this.btnClearData = document.getElementById('btn-clear-data');

    // ATS Modal
    this.btnAtsToggle = document.getElementById('btn-ats-toggle');
    this.atsBadge = document.getElementById('ats-score-badge');
    this.atsModal = document.getElementById('ats-modal');
    this.btnCloseAts = document.getElementById('btn-close-ats');
    this.atsModalBody = document.getElementById('ats-modal-body');

    // Summary AI Helper Modal
    this.btnSuggestSummary = document.getElementById('btn-suggest-summary');
    this.summaryModal = document.getElementById('summary-helper-modal');
    this.btnCloseSummaryModal = document.getElementById('btn-close-summary-modal');
    this.summaryPresetsList = document.getElementById('summary-presets-list');

    // Tabs
    this.tabButtons = document.querySelectorAll('.editor-tabs .tab-btn');
    this.tabContents = document.querySelectorAll('.tab-content');

    // Personal Form Fields
    this.fieldFullName = document.getElementById('field-full-name');
    this.fieldJobTitle = document.getElementById('field-job-title');
    this.fieldEmail = document.getElementById('field-email');
    this.fieldPhone = document.getElementById('field-phone');
    this.fieldLocation = document.getElementById('field-location');
    this.fieldWebsite = document.getElementById('field-website');
    this.fieldLinkedin = document.getElementById('field-linkedin');
    this.fieldGithub = document.getElementById('field-github');
    this.fieldSummary = document.getElementById('field-summary');
    this.avatarInput = document.getElementById('avatar-input');
    this.avatarImgPreview = document.getElementById('avatar-img-preview');
    this.avatarPlaceholder = document.getElementById('avatar-placeholder');
    this.btnRemovePhoto = document.getElementById('btn-remove-photo');
    this.fieldShowPhoto = document.getElementById('field-show-photo');

    // Dynamic List Add Buttons & Containers
    this.btnAddExperience = document.getElementById('btn-add-experience');
    this.experienceList = document.getElementById('experience-list');
    this.btnAddEducation = document.getElementById('btn-add-education');
    this.educationList = document.getElementById('education-list');
    this.btnAddProject = document.getElementById('btn-add-project');
    this.projectsList = document.getElementById('projects-list');
    this.btnAddCertification = document.getElementById('btn-add-certification');
    this.certificationsList = document.getElementById('certifications-list');

    // Custom section
    this.fieldCustomEnable = document.getElementById('field-custom-enable');
    this.fieldCustomTitle = document.getElementById('field-custom-title');
    this.fieldCustomContent = document.getElementById('field-custom-content');

    // Customizer Controls
    this.templatePills = document.querySelectorAll('.tpl-pill');
    this.colorDots = document.querySelectorAll('.color-dot');
    this.customColorPicker = document.getElementById('custom-color-picker');
    this.fontSelect = document.getElementById('font-family-select');
    this.densitySelect = document.getElementById('density-select');

    // Zoom Controls
    this.btnZoomIn = document.getElementById('btn-zoom-in');
    this.btnZoomOut = document.getElementById('btn-zoom-out');
    this.btnZoomFit = document.getElementById('btn-zoom-fit');
    this.zoomValue = document.getElementById('zoom-value');
    this.resumePaperWrapper = document.getElementById('resume-paper-wrapper');
    this.resumePreviewDoc = document.getElementById('resume-preview-document');
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Dropdown toggles
    this.btnSamplesMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      this.samplesDropdown.classList.toggle('show');
      this.dataDropdown.classList.remove('show');
    });

    this.btnDataMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      this.dataDropdown.classList.toggle('show');
      this.samplesDropdown.classList.remove('show');
    });

    document.addEventListener('click', () => {
      this.samplesDropdown.classList.remove('show');
      this.dataDropdown.classList.remove('show');
    });

    // Preset Loaders
    this.samplesDropdown.querySelectorAll('[data-sample]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sampleKey = btn.getAttribute('data-sample');
        if (RESUME_PRESETS[sampleKey]) {
          this.state = JSON.parse(JSON.stringify(RESUME_PRESETS[sampleKey]));
          this.populateFormFromState();
          this.renderSkillsTags();
          this.updatePreview();
          this.updateATSScore();
          this.saveState();
          this.showToast(`Loaded ${btn.querySelector('strong').textContent} template!`, 'success');
        }
      });
    });

    // Theme Toggle
    this.btnThemeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      this.initLucideIcons();
    });

    // Data Export / Import
    this.btnExportJSON.addEventListener('click', () => this.exportJSON());
    this.jsonFileInput.addEventListener('change', (e) => this.importJSON(e));
    this.btnClearData.addEventListener('click', () => this.clearAllData());

    // PDF Download
    this.btnDownloadPDF.addEventListener('click', () => this.downloadPDF());

    // ATS Modal
    this.btnAtsToggle.addEventListener('click', () => this.openATSModal());
    this.btnCloseAts.addEventListener('click', () => this.atsModal.classList.add('hidden'));
    this.atsModal.addEventListener('click', (e) => {
      if (e.target === this.atsModal) this.atsModal.classList.add('hidden');
    });

    // AI Summary Modal
    this.btnSuggestSummary.addEventListener('click', () => this.openSummaryModal());
    this.btnCloseSummaryModal.addEventListener('click', () => this.summaryModal.classList.add('hidden'));
    this.summaryModal.addEventListener('click', (e) => {
      if (e.target === this.summaryModal) this.summaryModal.classList.add('hidden');
    });

    // Tabs Switcher
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        this.tabButtons.forEach(b => b.classList.remove('active'));
        this.tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`tab-${targetTab}`).classList.add('active');
        this.initLucideIcons();
      });
    });

    // Personal Form Inputs (Real-time sync)
    const personalFields = [
      { el: this.fieldFullName, key: 'fullName' },
      { el: this.fieldJobTitle, key: 'jobTitle' },
      { el: this.fieldEmail, key: 'email' },
      { el: this.fieldPhone, key: 'phone' },
      { el: this.fieldLocation, key: 'location' },
      { el: this.fieldWebsite, key: 'website' },
      { el: this.fieldLinkedin, key: 'linkedin' },
      { el: this.fieldGithub, key: 'github' },
      { el: this.fieldSummary, key: 'summary' }
    ];

    personalFields.forEach(({ el, key }) => {
      el.addEventListener('input', () => {
        this.state.personal[key] = el.value;
        this.updatePreview();
        this.updateATSScore();
        this.saveState();
      });
    });

    // Photo input
    this.avatarInput.addEventListener('change', (e) => this.handlePhotoUpload(e));
    this.btnRemovePhoto.addEventListener('click', () => this.removePhoto());
    this.fieldShowPhoto.addEventListener('change', (e) => {
      this.state.personal.showPhoto = e.target.checked;
      this.updatePreview();
      this.saveState();
    });

    // Action verbs click to append into active experience textarea
    document.querySelectorAll('.verb-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const verb = chip.getAttribute('data-verb');
        const activeTextarea = document.querySelector('#experience-list textarea');
        if (activeTextarea) {
          activeTextarea.value += (activeTextarea.value ? '\n• ' : '• ') + verb + ' ';
          activeTextarea.dispatchEvent(new Event('input'));
          activeTextarea.focus();
        } else {
          this.showToast(`Click on a job description to insert "${verb}"`, 'info');
        }
      });
    });

    // Dynamic Add Buttons
    this.btnAddExperience.addEventListener('click', () => this.addExperienceItem());
    this.btnAddEducation.addEventListener('click', () => this.addEducationItem());
    this.btnAddProject.addEventListener('click', () => this.addProjectItem());
    this.btnAddCertification.addEventListener('click', () => this.addCertificationItem());

    // Custom Section
    this.fieldCustomEnable.addEventListener('change', (e) => {
      if (!this.state.customSection) this.state.customSection = {};
      this.state.customSection.enabled = e.target.checked;
      this.updatePreview();
      this.saveState();
    });
    this.fieldCustomTitle.addEventListener('input', (e) => {
      if (!this.state.customSection) this.state.customSection = {};
      this.state.customSection.title = e.target.value;
      this.updatePreview();
      this.saveState();
    });
    this.fieldCustomContent.addEventListener('input', (e) => {
      if (!this.state.customSection) this.state.customSection = {};
      this.state.customSection.content = e.target.value;
      this.updatePreview();
      this.saveState();
    });

    // Skills Tag Inputs & Suggestions
    this.bindSkillInputs();

    // Customizer: Template selector
    this.templatePills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.templatePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const tpl = pill.getAttribute('data-template');
        this.state.settings.template = tpl;
        this.applyTemplateStyles();
        this.updatePreview();
        this.saveState();
      });
    });

    // Customizer: Color palette
    this.colorDots.forEach(dot => {
      dot.addEventListener('click', () => {
        this.colorDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        const color = dot.getAttribute('data-color');
        this.state.settings.color = color;
        this.applyColorAccent(color);
        this.saveState();
      });
    });

    this.customColorPicker.addEventListener('input', (e) => {
      this.colorDots.forEach(d => d.classList.remove('active'));
      const color = e.target.value;
      this.state.settings.color = color;
      this.applyColorAccent(color);
      this.saveState();
    });

    // Customizer: Typography & Density
    this.fontSelect.addEventListener('change', (e) => {
      this.state.settings.font = e.target.value;
      this.applyFontFamily(e.target.value);
      this.saveState();
    });

    this.densitySelect.addEventListener('change', (e) => {
      this.state.settings.density = e.target.value;
      this.applyDensity(e.target.value);
      this.saveState();
    });

    // Zoom
    this.btnZoomIn.addEventListener('click', () => this.setZoom(this.zoomLevel + 0.1));
    this.btnZoomOut.addEventListener('click', () => this.setZoom(this.zoomLevel - 0.1));
    this.btnZoomFit.addEventListener('click', () => this.setZoom(1.0));
  }

  /**
   * Populate Form inputs from current state
   */
  populateFormFromState() {
    const p = this.state.personal || {};
    this.fieldFullName.value = p.fullName || '';
    this.fieldJobTitle.value = p.jobTitle || '';
    this.fieldEmail.value = p.email || '';
    this.fieldPhone.value = p.phone || '';
    this.fieldLocation.value = p.location || '';
    this.fieldWebsite.value = p.website || '';
    this.fieldLinkedin.value = p.linkedin || '';
    this.fieldGithub.value = p.github || '';
    this.fieldSummary.value = p.summary || '';
    this.fieldShowPhoto.checked = p.showPhoto !== false;

    // Photo preview
    if (p.photo) {
      this.avatarImgPreview.src = p.photo;
      this.avatarImgPreview.classList.remove('hidden');
      this.avatarPlaceholder.classList.add('hidden');
      this.btnRemovePhoto.classList.remove('hidden');
    } else {
      this.avatarImgPreview.src = '';
      this.avatarImgPreview.classList.add('hidden');
      this.avatarPlaceholder.classList.remove('hidden');
      this.btnRemovePhoto.classList.add('hidden');
    }

    // Dynamic Lists
    this.renderExperienceList();
    this.renderEducationList();
    this.renderProjectsList();
    this.renderCertificationsList();

    // Custom Section
    const cs = this.state.customSection || {};
    this.fieldCustomEnable.checked = !!cs.enabled;
    this.fieldCustomTitle.value = cs.title || '';
    this.fieldCustomContent.value = cs.content || '';

    // Settings
    if (!this.state.settings) {
      this.state.settings = { template: 'modern', color: '#2563eb', font: 'Inter', density: 'normal' };
    }

    // Activate Template Pill
    this.templatePills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-template') === this.state.settings.template);
    });

    // Apply color
    this.applyColorAccent(this.state.settings.color || '#2563eb');
    this.applyFontFamily(this.state.settings.font || 'Inter');
    this.applyDensity(this.state.settings.density || 'normal');
    this.fontSelect.value = this.state.settings.font || 'Inter';
    this.densitySelect.value = this.state.settings.density || 'normal';

    this.updateCounters();
  }

  /**
   * Update badge counts on tabs
   */
  updateCounters() {
    document.getElementById('count-experience').textContent = (this.state.experience || []).length;
    document.getElementById('count-education').textContent = (this.state.education || []).length;
    const totalSkills = Object.values(this.state.skills || {}).reduce((acc, arr) => acc + (arr ? arr.length : 0), 0);
    document.getElementById('count-skills').textContent = totalSkills;
    document.getElementById('count-projects').textContent = (this.state.projects || []).length;
    document.getElementById('count-certifications').textContent = (this.state.certifications || []).length;
  }

  /**
   * Render Experience list in form
   */
  renderExperienceList() {
    this.experienceList.innerHTML = '';
    const experiences = this.state.experience || [];

    experiences.forEach((exp, idx) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div class="item-header">
          <div class="item-title-preview">#${idx + 1} ${TemplateEngine.escapeHTML(exp.position || 'Position')} ${exp.company ? 'at ' + TemplateEngine.escapeHTML(exp.company) : ''}</div>
          <div class="item-actions">
            <button type="button" class="action-btn-sm delete" data-action="delete" title="Delete"><i data-lucide="trash-2"></i></button>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group col-6">
            <label>Position / Role Title</label>
            <input type="text" class="form-control" data-field="position" value="${TemplateEngine.escapeHTML(exp.position || '')}" placeholder="e.g. Lead Software Engineer">
          </div>
          <div class="form-group col-6">
            <label>Company Name</label>
            <input type="text" class="form-control" data-field="company" value="${TemplateEngine.escapeHTML(exp.company || '')}" placeholder="e.g. Stripe">
          </div>
          <div class="form-group col-4">
            <label>Location</label>
            <input type="text" class="form-control" data-field="location" value="${TemplateEngine.escapeHTML(exp.location || '')}" placeholder="e.g. Remote / New York, NY">
          </div>
          <div class="form-group col-4">
            <label>Start Date</label>
            <input type="text" class="form-control" data-field="startDate" value="${TemplateEngine.escapeHTML(exp.startDate || '')}" placeholder="e.g. Jan 2021">
          </div>
          <div class="form-group col-4">
            <label>End Date</label>
            <input type="text" class="form-control" data-field="endDate" value="${TemplateEngine.escapeHTML(exp.endDate || '')}" placeholder="e.g. Present" ${exp.current ? 'disabled' : ''}>
          </div>
          <div class="form-group col-12">
            <div class="checkbox-row">
              <input type="checkbox" id="curr-${exp.id}" data-field="current" ${exp.current ? 'checked' : ''}>
              <label for="curr-${exp.id}">I currently work here</label>
            </div>
          </div>
          <div class="form-group col-12">
            <label>Key Achievements & Responsibilities (Supports bullet points with •)</label>
            <textarea rows="3" class="form-control" data-field="bullets" placeholder="• Spearheaded development of...&#10;• Reduced latency by 35%...">${TemplateEngine.escapeHTML(exp.bullets || '')}</textarea>
          </div>
        </div>
      `;

      // Event handlers for this card
      card.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', (e) => {
          const field = e.target.getAttribute('data-field');
          if (field === 'current') {
            exp.current = e.target.checked;
            const endInput = card.querySelector('[data-field="endDate"]');
            if (endInput) {
              endInput.disabled = exp.current;
              if (exp.current) endInput.value = 'Present';
            }
          } else {
            exp[field] = e.target.value;
          }
          this.updatePreview();
          this.updateATSScore();
          this.saveState();
        });
      });

      card.querySelector('[data-action="delete"]').addEventListener('click', () => {
        this.state.experience.splice(idx, 1);
        this.renderExperienceList();
        this.updateCounters();
        this.updatePreview();
        this.updateATSScore();
        this.saveState();
        this.initLucideIcons();
      });

      this.experienceList.appendChild(card);
    });

    this.initLucideIcons();
  }

  addExperienceItem() {
    if (!this.state.experience) this.state.experience = [];
    this.state.experience.unshift({
      id: 'exp-' + Date.now(),
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: 'Present',
      current: true,
      bullets: '• Spearheaded '
    });
    this.renderExperienceList();
    this.updateCounters();
    this.updatePreview();
    this.updateATSScore();
    this.saveState();
    this.initLucideIcons();
  }

  /**
   * Render Education list in form
   */
  renderEducationList() {
    this.educationList.innerHTML = '';
    const education = this.state.education || [];

    education.forEach((edu, idx) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div class="item-header">
          <div class="item-title-preview">#${idx + 1} ${TemplateEngine.escapeHTML(edu.degree || 'Degree')} ${edu.institution ? 'at ' + TemplateEngine.escapeHTML(edu.institution) : ''}</div>
          <div class="item-actions">
            <button type="button" class="action-btn-sm delete" data-action="delete" title="Delete"><i data-lucide="trash-2"></i></button>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group col-6">
            <label>Degree / Certificate</label>
            <input type="text" class="form-control" data-field="degree" value="${TemplateEngine.escapeHTML(edu.degree || '')}" placeholder="e.g. B.S. in Computer Science">
          </div>
          <div class="form-group col-6">
            <label>Institution / University</label>
            <input type="text" class="form-control" data-field="institution" value="${TemplateEngine.escapeHTML(edu.institution || '')}" placeholder="e.g. Stanford University">
          </div>
          <div class="form-group col-4">
            <label>Start Year</label>
            <input type="text" class="form-control" data-field="startDate" value="${TemplateEngine.escapeHTML(edu.startDate || '')}" placeholder="e.g. 2018">
          </div>
          <div class="form-group col-4">
            <label>Graduation Year</label>
            <input type="text" class="form-control" data-field="endDate" value="${TemplateEngine.escapeHTML(edu.endDate || '')}" placeholder="e.g. 2022">
          </div>
          <div class="form-group col-4">
            <label>GPA / Honors (Optional)</label>
            <input type="text" class="form-control" data-field="gpa" value="${TemplateEngine.escapeHTML(edu.gpa || '')}" placeholder="e.g. GPA: 3.9 / 4.0">
          </div>
        </div>
      `;

      card.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', (e) => {
          const field = e.target.getAttribute('data-field');
          edu[field] = e.target.value;
          this.updatePreview();
          this.updateATSScore();
          this.saveState();
        });
      });

      card.querySelector('[data-action="delete"]').addEventListener('click', () => {
        this.state.education.splice(idx, 1);
        this.renderEducationList();
        this.updateCounters();
        this.updatePreview();
        this.updateATSScore();
        this.saveState();
        this.initLucideIcons();
      });

      this.educationList.appendChild(card);
    });

    this.initLucideIcons();
  }

  addEducationItem() {
    if (!this.state.education) this.state.education = [];
    this.state.education.push({
      id: 'edu-' + Date.now(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      gpa: ''
    });
    this.renderEducationList();
    this.updateCounters();
    this.updatePreview();
    this.updateATSScore();
    this.saveState();
    this.initLucideIcons();
  }

  /**
   * Render Projects list in form
   */
  renderProjectsList() {
    this.projectsList.innerHTML = '';
    const projects = this.state.projects || [];

    projects.forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div class="item-header">
          <div class="item-title-preview">#${idx + 1} ${TemplateEngine.escapeHTML(proj.title || 'Project Name')}</div>
          <div class="item-actions">
            <button type="button" class="action-btn-sm delete" data-action="delete" title="Delete"><i data-lucide="trash-2"></i></button>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group col-6">
            <label>Project Name</label>
            <input type="text" class="form-control" data-field="title" value="${TemplateEngine.escapeHTML(proj.title || '')}" placeholder="e.g. Real-Time Chat App">
          </div>
          <div class="form-group col-6">
            <label>Tech Stack / Tags</label>
            <input type="text" class="form-control" data-field="techStack" value="${TemplateEngine.escapeHTML(proj.techStack || '')}" placeholder="e.g. React, Node.js, WebSockets">
          </div>
          <div class="form-group col-6">
            <label>Project Link / GitHub URL</label>
            <input type="url" class="form-control" data-field="link" value="${TemplateEngine.escapeHTML(proj.link || '')}" placeholder="https://github.com/user/project">
          </div>
          <div class="form-group col-6">
            <label>Date / Year</label>
            <input type="text" class="form-control" data-field="date" value="${TemplateEngine.escapeHTML(proj.date || '')}" placeholder="e.g. 2023">
          </div>
          <div class="form-group col-12">
            <label>Description & Key Features</label>
            <textarea rows="2" class="form-control" data-field="description" placeholder="• Built full-stack system with...&#10;• Deployed on AWS...">${TemplateEngine.escapeHTML(proj.description || '')}</textarea>
          </div>
        </div>
      `;

      card.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', (e) => {
          const field = e.target.getAttribute('data-field');
          proj[field] = e.target.value;
          this.updatePreview();
          this.updateATSScore();
          this.saveState();
        });
      });

      card.querySelector('[data-action="delete"]').addEventListener('click', () => {
        this.state.projects.splice(idx, 1);
        this.renderProjectsList();
        this.updateCounters();
        this.updatePreview();
        this.updateATSScore();
        this.saveState();
        this.initLucideIcons();
      });

      this.projectsList.appendChild(card);
    });

    this.initLucideIcons();
  }

  addProjectItem() {
    if (!this.state.projects) this.state.projects = [];
    this.state.projects.push({
      id: 'proj-' + Date.now(),
      title: '',
      techStack: '',
      link: '',
      date: '',
      description: '• '
    });
    this.renderProjectsList();
    this.updateCounters();
    this.updatePreview();
    this.updateATSScore();
    this.saveState();
    this.initLucideIcons();
  }

  /**
   * Render Certifications list in form
   */
  renderCertificationsList() {
    this.certificationsList.innerHTML = '';
    const certifications = this.state.certifications || [];

    certifications.forEach((cert, idx) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div class="item-header">
          <div class="item-title-preview">#${idx + 1} ${TemplateEngine.escapeHTML(cert.name || 'Certification')}</div>
          <div class="item-actions">
            <button type="button" class="action-btn-sm delete" data-action="delete" title="Delete"><i data-lucide="trash-2"></i></button>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group col-6">
            <label>Certification Name</label>
            <input type="text" class="form-control" data-field="name" value="${TemplateEngine.escapeHTML(cert.name || '')}" placeholder="e.g. AWS Certified Solutions Architect">
          </div>
          <div class="form-group col-6">
            <label>Issuing Organization</label>
            <input type="text" class="form-control" data-field="issuer" value="${TemplateEngine.escapeHTML(cert.issuer || '')}" placeholder="e.g. Amazon Web Services">
          </div>
          <div class="form-group col-6">
            <label>Issue Date</label>
            <input type="text" class="form-control" data-field="date" value="${TemplateEngine.escapeHTML(cert.date || '')}" placeholder="e.g. Nov 2023">
          </div>
          <div class="form-group col-6">
            <label>Credential ID or URL (Optional)</label>
            <input type="text" class="form-control" data-field="url" value="${TemplateEngine.escapeHTML(cert.url || '')}" placeholder="e.g. aws.amazon.com/verify/123">
          </div>
        </div>
      `;

      card.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', (e) => {
          const field = e.target.getAttribute('data-field');
          cert[field] = e.target.value;
          this.updatePreview();
          this.updateATSScore();
          this.saveState();
        });
      });

      card.querySelector('[data-action="delete"]').addEventListener('click', () => {
        this.state.certifications.splice(idx, 1);
        this.renderCertificationsList();
        this.updateCounters();
        this.updatePreview();
        this.updateATSScore();
        this.saveState();
        this.initLucideIcons();
      });

      this.certificationsList.appendChild(card);
    });

    this.initLucideIcons();
  }

  addCertificationItem() {
    if (!this.state.certifications) this.state.certifications = [];
    this.state.certifications.push({
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      date: '',
      url: ''
    });
    this.renderCertificationsList();
    this.updateCounters();
    this.updatePreview();
    this.updateATSScore();
    this.saveState();
    this.initLucideIcons();
  }

  /**
   * Bind Skill category tag inputs & pills
   */
  bindSkillInputs() {
    const categories = ['technical', 'tools', 'soft', 'languages'];

    categories.forEach(cat => {
      const input = document.getElementById(`input-skill-${cat}`);
      if (!input) return;

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const val = input.value.trim().replace(/^,|,$/g, '');
          if (val) {
            this.addSkill(cat, val);
            input.value = '';
          }
        }
      });
    });

    // Quick suggestion pills
    document.querySelectorAll('.sugg-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const cat = pill.getAttribute('data-cat');
        const text = pill.textContent.replace(/^\+\s*/, '').trim();
        this.addSkill(cat, text);
      });
    });
  }

  addSkill(category, skillName) {
    if (!this.state.skills) this.state.skills = {};
    if (!this.state.skills[category]) this.state.skills[category] = [];

    if (!this.state.skills[category].includes(skillName)) {
      this.state.skills[category].push(skillName);
      this.renderSkillsTags();
      this.updateCounters();
      this.updatePreview();
      this.updateATSScore();
      this.saveState();
    }
  }

  removeSkill(category, index) {
    if (this.state.skills && this.state.skills[category]) {
      this.state.skills[category].splice(index, 1);
      this.renderSkillsTags();
      this.updateCounters();
      this.updatePreview();
      this.updateATSScore();
      this.saveState();
    }
  }

  renderSkillsTags() {
    const categories = ['technical', 'tools', 'soft', 'languages'];

    categories.forEach(cat => {
      const container = document.getElementById(`tags-${cat}`);
      if (!container) return;
      container.innerHTML = '';

      const list = (this.state.skills && this.state.skills[cat]) || [];
      list.forEach((skill, idx) => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.innerHTML = `
          <span>${TemplateEngine.escapeHTML(skill)}</span>
          <span class="remove-tag" title="Remove">&times;</span>
        `;
        tag.querySelector('.remove-tag').addEventListener('click', () => {
          this.removeSkill(cat, idx);
        });
        container.appendChild(tag);
      });
    });
  }

  /**
   * Photo handling
   */
  handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      this.showToast('Please upload an image smaller than 3MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      this.state.personal.photo = event.target.result;
      this.avatarImgPreview.src = event.target.result;
      this.avatarImgPreview.classList.remove('hidden');
      this.avatarPlaceholder.classList.add('hidden');
      this.btnRemovePhoto.classList.remove('hidden');
      this.updatePreview();
      this.saveState();
      this.showToast('Profile photo updated!', 'success');
    };
    reader.readAsDataURL(file);
  }

  removePhoto() {
    this.state.personal.photo = '';
    this.avatarImgPreview.src = '';
    this.avatarImgPreview.classList.add('hidden');
    this.avatarPlaceholder.classList.remove('hidden');
    this.btnRemovePhoto.classList.add('hidden');
    this.avatarInput.value = '';
    this.updatePreview();
    this.saveState();
  }

  /**
   * Render Live Resume Preview
   */
  updatePreview() {
    const templateName = this.state.settings?.template || 'modern';
    this.resumePreviewDoc.className = `resume-paper template-${templateName}`;
    this.resumePreviewDoc.innerHTML = TemplateEngine.render(templateName, this.state);
    this.initLucideIcons();
  }

  /**
   * Apply Customizer Styling
   */
  applyTemplateStyles() {
    const tpl = this.state.settings.template;
    this.resumePreviewDoc.className = `resume-paper template-${tpl}`;
  }

  applyColorAccent(color) {
    document.documentElement.style.setProperty('--resume-accent', color);
  }

  applyFontFamily(font) {
    document.documentElement.style.setProperty('--resume-font', font);
  }

  applyDensity(density) {
    const wrapper = document.getElementById('resume-viewport');
    wrapper.classList.remove('density-compact', 'density-normal', 'density-spacious');
    wrapper.classList.add(`density-${density}`);
  }

  /**
   * Zoom Control
   */
  setZoom(level) {
    this.zoomLevel = Math.max(0.4, Math.min(1.6, level));
    this.resumePaperWrapper.style.transform = `scale(${this.zoomLevel})`;
    this.zoomValue.textContent = `${Math.round(this.zoomLevel * 100)}%`;
  }

  /**
   * ATS Score update
   */
  updateATSScore() {
    const result = ATSAnalyzer.analyze(this.state);
    this.atsBadge.textContent = `${result.score}%`;
    
    // Style pill color
    if (result.score >= 80) {
      this.atsBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      this.atsBadge.style.color = '#10b981';
    } else if (result.score >= 50) {
      this.atsBadge.style.background = 'rgba(245, 158, 11, 0.2)';
      this.atsBadge.style.color = '#f59e0b';
    } else {
      this.atsBadge.style.background = 'rgba(239, 68, 68, 0.2)';
      this.atsBadge.style.color = '#ef4444';
    }

    return result;
  }

  /**
   * Open ATS Health Modal
   */
  openATSModal() {
    const result = this.updateATSScore();
    
    let checklistHtml = result.checks.map(chk => `
      <div class="ats-item ${chk.status}">
        <div class="ats-status-icon">
          <i data-lucide="${chk.status === 'pass' ? 'check-circle-2' : 'alert-triangle'}"></i>
        </div>
        <div class="ats-item-content">
          <strong>${TemplateEngine.escapeHTML(chk.title)}</strong>
          <span>${TemplateEngine.escapeHTML(chk.desc)}</span>
        </div>
      </div>
    `).join('');

    this.atsModalBody.innerHTML = `
      <div class="ats-score-hero">
        <div class="score-circle-box" style="border-color: ${result.score >= 80 ? 'var(--accent-emerald)' : result.score >= 50 ? 'var(--accent-amber)' : 'var(--danger)'}">
          <span class="score-big-num">${result.score}</span>
          <span class="score-label">ATS Score</span>
        </div>
        <div class="score-details-text">
          <h4>${result.score >= 80 ? '🎉 Excellent ATS Compatibility' : result.score >= 50 ? '⚡ Good Progress — Optimization Needed' : '⚠️ Action Required'}</h4>
          <p>${result.score >= 80 ? 'Your resume is rich in relevant keywords, action verbs, and quantifiable impact.' : 'Follow the recommendations below to increase your resume ranking in automated applicant filters.'}</p>
        </div>
      </div>

      <div class="ats-checklist">
        ${checklistHtml}
      </div>
    `;

    this.atsModal.classList.remove('hidden');
    this.initLucideIcons();
  }

  /**
   * Open AI Summary Modal
   */
  openSummaryModal() {
    this.summaryPresetsList.innerHTML = SUMMARY_PRESETS.map((item, idx) => `
      <div class="summary-preset-card" data-idx="${idx}">
        <h4><i data-lucide="sparkles" class="icon-sm" style="color: var(--primary);"></i> ${TemplateEngine.escapeHTML(item.role)}</h4>
        <p>${TemplateEngine.escapeHTML(item.text)}</p>
      </div>
    `).join('');

    this.summaryPresetsList.querySelectorAll('.summary-preset-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = card.getAttribute('data-idx');
        const text = SUMMARY_PRESETS[idx].text;
        this.fieldSummary.value = text;
        this.state.personal.summary = text;
        this.summaryModal.classList.add('hidden');
        this.updatePreview();
        this.updateATSScore();
        this.saveState();
        this.showToast('Summary loaded into editor!', 'success');
      });
    });

    this.summaryModal.classList.remove('hidden');
    this.initLucideIcons();
  }

  /**
   * Export PDF
   */
  downloadPDF() {
    this.showToast('Preparing high quality PDF...', 'info');

    // Use html2pdf if available for direct file download or native print
    if (typeof html2pdf !== 'undefined') {
      const element = this.resumePreviewDoc;
      const opt = {
        margin: 0,
        filename: `${(this.state.personal?.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        this.showToast('PDF downloaded successfully!', 'success');
      }).catch(err => {
        console.warn('html2pdf fallback to window.print():', err);
        window.print();
      });
    } else {
      window.print();
    }
  }

  /**
   * Export JSON Backup
   */
  exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ResumiQ_${(this.state.personal?.fullName || 'backup').replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast('JSON backup exported!', 'success');
  }

  /**
   * Import JSON Backup
   */
  importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported && (imported.personal || imported.experience || imported.skills)) {
          this.state = imported;
          this.populateFormFromState();
          this.renderSkillsTags();
          this.updatePreview();
          this.updateATSScore();
          this.saveState();
          this.showToast('Resume data successfully imported!', 'success');
        } else {
          this.showToast('Invalid resume JSON format', 'error');
        }
      } catch (err) {
        this.showToast('Error reading JSON file', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  /**
   * Clear all form data
   */
  clearAllData() {
    if (confirm('Are you sure you want to reset and clear all data? This cannot be undone.')) {
      this.state = {
        personal: { fullName: '', jobTitle: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '', photo: '', showPhoto: false, summary: '' },
        experience: [],
        education: [],
        skills: { technical: [], tools: [], soft: [], languages: [] },
        projects: [],
        certifications: [],
        customSection: { enabled: false, title: '', content: '' },
        settings: { template: 'modern', color: '#2563eb', font: 'Inter', density: 'normal' }
      };
      this.populateFormFromState();
      this.renderSkillsTags();
      this.updatePreview();
      this.updateATSScore();
      this.saveState();
      this.showToast('Form reset to blank slate', 'info');
    }
  }

  /**
   * Show Toast Notification
   */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle-2';
    if (type === 'error') iconName = 'alert-circle';

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="icon-sm"></i>
      <span>${TemplateEngine.escapeHTML(message)}</span>
    `;
    container.appendChild(toast);
    this.initLucideIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  /**
   * Initialize Lucide Icons
   */
  initLucideIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }
}

// Initialize Application once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new ResumeApp();
});
