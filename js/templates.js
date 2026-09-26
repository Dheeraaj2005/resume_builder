/**
 * ResumiQ - Multi-Template Resume Rendering Engine
 */

const TemplateEngine = {
  
  /**
   * Helper: Escape HTML string
   */
  escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /**
   * Helper: Render bullet points from multiline text
   */
  renderBullets(text) {
    if (!text || !text.trim()) return '';
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return '';
    
    const items = lines.map(line => {
      // Remove leading bullet characters if present
      const cleanLine = line.replace(/^[\u2022\u2023\u25E6\u2043\u2219\*\-]\s*/, '');
      return `<li>${this.escapeHTML(cleanLine)}</li>`;
    }).join('');

    return `<ul class="resume-bullets">${items}</ul>`;
  },

  /**
   * Helper: Render skills pills
   */
  renderSkillsPills(skillsList) {
    if (!skillsList || skillsList.length === 0) return '';
    const pills = skillsList.map(skill => `<span class="resume-skill-pill">${this.escapeHTML(skill)}</span>`).join('');
    return `<div class="resume-skill-pills">${pills}</div>`;
  },

  /**
   * Render Template 1: Modern Minimal (Default)
   */
  renderModern(data) {
    const p = data.personal || {};
    const hasPhoto = p.photo && p.showPhoto;

    return `
      <div class="cv-header">
        <div class="cv-header-text">
          <h1 class="cv-name">${this.escapeHTML(p.fullName || 'Your Name')}</h1>
          <div class="cv-jobtitle">${this.escapeHTML(p.jobTitle || 'Professional Title')}</div>
          <div class="cv-contact-list">
            ${p.email ? `<span class="cv-contact-item"><i data-lucide="mail" class="icon-sm"></i> ${this.escapeHTML(p.email)}</span>` : ''}
            ${p.phone ? `<span class="cv-contact-item"><i data-lucide="phone" class="icon-sm"></i> ${this.escapeHTML(p.phone)}</span>` : ''}
            ${p.location ? `<span class="cv-contact-item"><i data-lucide="map-pin" class="icon-sm"></i> ${this.escapeHTML(p.location)}</span>` : ''}
            ${p.website ? `<span class="cv-contact-item"><i data-lucide="globe" class="icon-sm"></i> ${this.escapeHTML(p.website.replace(/^https?:\/\//, ''))}</span>` : ''}
            ${p.linkedin ? `<span class="cv-contact-item"><i data-lucide="linkedin" class="icon-sm"></i> ${this.escapeHTML(p.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/'))}</span>` : ''}
            ${p.github ? `<span class="cv-contact-item"><i data-lucide="github" class="icon-sm"></i> ${this.escapeHTML(p.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'github/'))}</span>` : ''}
          </div>
        </div>
        ${hasPhoto ? `<img src="${p.photo}" alt="${this.escapeHTML(p.fullName)}" class="cv-avatar">` : ''}
      </div>

      ${p.summary ? `
        <div class="resume-section">
          <h2 class="section-heading">Professional Summary</h2>
          <p class="resume-summary-text">${this.escapeHTML(p.summary)}</p>
        </div>
      ` : ''}

      ${data.experience && data.experience.length > 0 ? `
        <div class="resume-section">
          <h2 class="section-heading">Work Experience</h2>
          ${data.experience.map(exp => `
            <div class="resume-entry">
              <div class="resume-entry-header">
                <div>
                  <span class="resume-entry-title">${this.escapeHTML(exp.position || 'Role')}</span>
                  ${exp.company ? ` — <span class="resume-entry-subtitle">${this.escapeHTML(exp.company)}</span>` : ''}
                </div>
                <div class="resume-entry-date">${this.escapeHTML(exp.startDate || '')} ${exp.startDate && (exp.endDate || exp.current) ? '–' : ''} ${exp.current ? 'Present' : this.escapeHTML(exp.endDate || '')}</div>
              </div>
              ${exp.location ? `<div class="resume-entry-location">${this.escapeHTML(exp.location)}</div>` : ''}
              ${this.renderBullets(exp.bullets)}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.projects && data.projects.length > 0 ? `
        <div class="resume-section">
          <h2 class="section-heading">Key Projects</h2>
          ${data.projects.map(proj => `
            <div class="resume-entry">
              <div class="resume-entry-header">
                <div>
                  <span class="resume-entry-title">${this.escapeHTML(proj.title || 'Project')}</span>
                  ${proj.techStack ? ` <span class="resume-entry-subtitle">(${this.escapeHTML(proj.techStack)})</span>` : ''}
                </div>
                ${proj.date ? `<div class="resume-entry-date">${this.escapeHTML(proj.date)}</div>` : ''}
              </div>
              ${proj.link ? `<div class="resume-entry-location"><a href="${this.escapeHTML(proj.link)}" target="_blank">${this.escapeHTML(proj.link)}</a></div>` : ''}
              ${this.renderBullets(proj.description)}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.skills && (data.skills.technical?.length || data.skills.tools?.length || data.skills.soft?.length || data.skills.languages?.length) ? `
        <div class="resume-section">
          <h2 class="section-heading">Skills & Competencies</h2>
          <div style="display: flex; flex-direction: column; gap: 2mm;">
            ${data.skills.technical?.length ? `<div><strong>Technical Skills:</strong> ${data.skills.technical.map(s => this.escapeHTML(s)).join(', ')}</div>` : ''}
            ${data.skills.tools?.length ? `<div><strong>Tools & Platforms:</strong> ${data.skills.tools.map(s => this.escapeHTML(s)).join(', ')}</div>` : ''}
            ${data.skills.soft?.length ? `<div><strong>Soft Skills:</strong> ${data.skills.soft.map(s => this.escapeHTML(s)).join(', ')}</div>` : ''}
            ${data.skills.languages?.length ? `<div><strong>Languages:</strong> ${data.skills.languages.map(s => this.escapeHTML(s)).join(', ')}</div>` : ''}
          </div>
        </div>
      ` : ''}

      ${data.education && data.education.length > 0 ? `
        <div class="resume-section">
          <h2 class="section-heading">Education</h2>
          ${data.education.map(edu => `
            <div class="resume-entry">
              <div class="resume-entry-header">
                <div>
                  <span class="resume-entry-title">${this.escapeHTML(edu.degree || 'Degree')}</span>
                  ${edu.institution ? ` — <span class="resume-entry-subtitle">${this.escapeHTML(edu.institution)}</span>` : ''}
                </div>
                <div class="resume-entry-date">${this.escapeHTML(edu.startDate || '')} ${edu.startDate && edu.endDate ? '–' : ''} ${this.escapeHTML(edu.endDate || '')}</div>
              </div>
              ${edu.gpa ? `<div class="resume-entry-location">${this.escapeHTML(edu.gpa)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.certifications && data.certifications.length > 0 ? `
        <div class="resume-section">
          <h2 class="section-heading">Certifications & Honors</h2>
          ${data.certifications.map(cert => `
            <div class="resume-entry">
              <div class="resume-entry-header">
                <div>
                  <span class="resume-entry-title">${this.escapeHTML(cert.name)}</span>
                  ${cert.issuer ? ` <span class="resume-entry-subtitle">(${this.escapeHTML(cert.issuer)})</span>` : ''}
                </div>
                ${cert.date ? `<div class="resume-entry-date">${this.escapeHTML(cert.date)}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.customSection?.enabled && data.customSection.title ? `
        <div class="resume-section">
          <h2 class="section-heading">${this.escapeHTML(data.customSection.title)}</h2>
          ${this.renderBullets(data.customSection.content)}
        </div>
      ` : ''}
    `;
  },

  /**
   * Render Template 2: Executive Navy / Classic Corporate
   */
  renderExecutive(data) {
    const p = data.personal || {};
    const hasPhoto = p.photo && p.showPhoto;

    return `
      <div class="cv-banner">
        <div class="cv-banner-inner">
          <div>
            <h1 class="cv-name">${this.escapeHTML(p.fullName || 'Your Name')}</h1>
            <div class="cv-jobtitle">${this.escapeHTML(p.jobTitle || 'Executive Title')}</div>
            <div class="cv-contact-list">
              ${p.email ? `<span><i data-lucide="mail" class="icon-sm"></i> ${this.escapeHTML(p.email)}</span>` : ''}
              ${p.phone ? `<span><i data-lucide="phone" class="icon-sm"></i> ${this.escapeHTML(p.phone)}</span>` : ''}
              ${p.location ? `<span><i data-lucide="map-pin" class="icon-sm"></i> ${this.escapeHTML(p.location)}</span>` : ''}
              ${p.linkedin ? `<span><i data-lucide="linkedin" class="icon-sm"></i> ${this.escapeHTML(p.linkedin)}</span>` : ''}
            </div>
          </div>
          ${hasPhoto ? `<img src="${p.photo}" alt="${this.escapeHTML(p.fullName)}" class="cv-avatar">` : ''}
        </div>
      </div>

      <div class="cv-body-content">
        ${p.summary ? `
          <div class="resume-section">
            <h2 class="section-heading">Executive Profile</h2>
            <p>${this.escapeHTML(p.summary)}</p>
          </div>
        ` : ''}

        ${data.experience && data.experience.length > 0 ? `
          <div class="resume-section">
            <h2 class="section-heading">Executive Experience</h2>
            ${data.experience.map(exp => `
              <div class="resume-entry">
                <div class="resume-entry-header">
                  <div>
                    <span class="resume-entry-title">${this.escapeHTML(exp.position || 'Role')}</span>
                    ${exp.company ? ` | <strong>${this.escapeHTML(exp.company)}</strong>` : ''}
                  </div>
                  <div class="resume-entry-date">${this.escapeHTML(exp.startDate || '')} ${exp.startDate && (exp.endDate || exp.current) ? '–' : ''} ${exp.current ? 'Present' : this.escapeHTML(exp.endDate || '')}</div>
                </div>
                ${exp.location ? `<div class="resume-entry-location">${this.escapeHTML(exp.location)}</div>` : ''}
                ${this.renderBullets(exp.bullets)}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.skills && (data.skills.technical?.length || data.skills.tools?.length || data.skills.soft?.length) ? `
          <div class="resume-section">
            <h2 class="section-heading">Core Competencies & Leadership</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2mm 5mm;">
              ${data.skills.technical?.length ? `<div><strong>Core Skills:</strong> ${data.skills.technical.map(s => this.escapeHTML(s)).join(', ')}</div>` : ''}
              ${data.skills.soft?.length ? `<div><strong>Leadership & Strategy:</strong> ${data.skills.soft.map(s => this.escapeHTML(s)).join(', ')}</div>` : ''}
              ${data.skills.tools?.length ? `<div><strong>Tools & Systems:</strong> ${data.skills.tools.map(s => this.escapeHTML(s)).join(', ')}</div>` : ''}
              ${data.skills.languages?.length ? `<div><strong>Languages:</strong> ${data.skills.languages.map(s => this.escapeHTML(s)).join(', ')}</div>` : ''}
            </div>
          </div>
        ` : ''}

        ${data.education && data.education.length > 0 ? `
          <div class="resume-section">
            <h2 class="section-heading">Education & Credentials</h2>
            ${data.education.map(edu => `
              <div class="resume-entry">
                <div class="resume-entry-header">
                  <div>
                    <span class="resume-entry-title">${this.escapeHTML(edu.degree || 'Degree')}</span>
                    ${edu.institution ? ` — ${this.escapeHTML(edu.institution)}` : ''}
                  </div>
                  <div class="resume-entry-date">${this.escapeHTML(edu.startDate || '')} ${edu.startDate && edu.endDate ? '–' : ''} ${this.escapeHTML(edu.endDate || '')}</div>
                </div>
                ${edu.gpa ? `<div class="resume-entry-location">${this.escapeHTML(edu.gpa)}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.customSection?.enabled && data.customSection.title ? `
          <div class="resume-section">
            <h2 class="section-heading">${this.escapeHTML(data.customSection.title)}</h2>
            ${this.renderBullets(data.customSection.content)}
          </div>
        ` : ''}
      </div>
    `;
  },

  /**
   * Render Template 3: Creative Split (Two-Column Layout)
   */
  renderSplit(data) {
    const p = data.personal || {};
    const hasPhoto = p.photo && p.showPhoto;

    return `
      <!-- Left Column / Sidebar -->
      <div class="split-sidebar">
        ${hasPhoto ? `<img src="${p.photo}" alt="${this.escapeHTML(p.fullName)}" class="cv-avatar">` : ''}
        
        <div>
          <h3 class="sidebar-section-title">Contact</h3>
          ${p.email ? `<div class="sidebar-contact-item"><i data-lucide="mail" class="icon-sm"></i> <span>${this.escapeHTML(p.email)}</span></div>` : ''}
          ${p.phone ? `<div class="sidebar-contact-item"><i data-lucide="phone" class="icon-sm"></i> <span>${this.escapeHTML(p.phone)}</span></div>` : ''}
          ${p.location ? `<div class="sidebar-contact-item"><i data-lucide="map-pin" class="icon-sm"></i> <span>${this.escapeHTML(p.location)}</span></div>` : ''}
          ${p.website ? `<div class="sidebar-contact-item"><i data-lucide="globe" class="icon-sm"></i> <span>${this.escapeHTML(p.website.replace(/^https?:\/\//, ''))}</span></div>` : ''}
          ${p.linkedin ? `<div class="sidebar-contact-item"><i data-lucide="linkedin" class="icon-sm"></i> <span>${this.escapeHTML(p.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/'))}</span></div>` : ''}
        </div>

        ${data.skills && (data.skills.technical?.length || data.skills.tools?.length || data.skills.soft?.length) ? `
          <div>
            <h3 class="sidebar-section-title">Skills & Tech</h3>
            ${data.skills.technical?.length ? `
              <div style="margin-bottom: 2.5mm;">
                <strong style="font-size: 8pt; display: block; margin-bottom: 1mm;">Core Skills:</strong>
                ${this.renderSkillsPills(data.skills.technical)}
              </div>
            ` : ''}
            ${data.skills.tools?.length ? `
              <div style="margin-bottom: 2.5mm;">
                <strong style="font-size: 8pt; display: block; margin-bottom: 1mm;">Tools:</strong>
                ${this.renderSkillsPills(data.skills.tools)}
              </div>
            ` : ''}
          </div>
        ` : ''}

        ${data.education && data.education.length > 0 ? `
          <div>
            <h3 class="sidebar-section-title">Education</h3>
            ${data.education.map(edu => `
              <div style="margin-bottom: 2.5mm;">
                <div style="font-weight: 700; font-size: 8.5pt;">${this.escapeHTML(edu.degree || '')}</div>
                <div style="font-size: 8pt; color: #475569;">${this.escapeHTML(edu.institution || '')}</div>
                <div style="font-size: 7.5pt; color: #64748b;">${this.escapeHTML(edu.endDate || '')}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.skills?.languages?.length ? `
          <div>
            <h3 class="sidebar-section-title">Languages</h3>
            <div style="font-size: 8pt; color: #334155;">
              ${data.skills.languages.map(l => `<div>• ${this.escapeHTML(l)}</div>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Right Column / Main Body -->
      <div class="split-main">
        <div>
          <h1 class="cv-name">${this.escapeHTML(p.fullName || 'Your Name')}</h1>
          <div class="cv-jobtitle">${this.escapeHTML(p.jobTitle || 'Product Designer')}</div>
          ${p.summary ? `<p style="font-size: 9pt; color: #334155; line-height: 1.5; margin-top: 1.5mm;">${this.escapeHTML(p.summary)}</p>` : ''}
        </div>

        ${data.experience && data.experience.length > 0 ? `
          <div>
            <h2 class="main-section-title">Work Experience</h2>
            ${data.experience.map(exp => `
              <div class="resume-entry">
                <div class="resume-entry-header">
                  <div>
                    <span class="resume-entry-title">${this.escapeHTML(exp.position || 'Role')}</span>
                    ${exp.company ? ` — <span class="resume-entry-subtitle">${this.escapeHTML(exp.company)}</span>` : ''}
                  </div>
                  <div class="resume-entry-date">${this.escapeHTML(exp.startDate || '')} ${exp.startDate && (exp.endDate || exp.current) ? '–' : ''} ${exp.current ? 'Present' : this.escapeHTML(exp.endDate || '')}</div>
                </div>
                ${this.renderBullets(exp.bullets)}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.projects && data.projects.length > 0 ? `
          <div>
            <h2 class="main-section-title">Projects</h2>
            ${data.projects.map(proj => `
              <div class="resume-entry">
                <div class="resume-entry-header">
                  <span class="resume-entry-title">${this.escapeHTML(proj.title)}</span>
                  ${proj.date ? `<span class="resume-entry-date">${this.escapeHTML(proj.date)}</span>` : ''}
                </div>
                ${this.renderBullets(proj.description)}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.customSection?.enabled && data.customSection.title ? `
          <div>
            <h2 class="main-section-title">${this.escapeHTML(data.customSection.title)}</h2>
            ${this.renderBullets(data.customSection.content)}
          </div>
        ` : ''}
      </div>
    `;
  },

  /**
   * Render Template 4: ATS Compact Minimalist
   */
  renderCompact(data) {
    const p = data.personal || {};

    return `
      <div class="cv-header">
        <h1 class="cv-name">${this.escapeHTML(p.fullName || 'Your Name')}</h1>
        <div class="cv-jobtitle">${this.escapeHTML(p.jobTitle || 'Professional')}</div>
        <div class="cv-contact-list">
          ${p.email ? `<span>${this.escapeHTML(p.email)}</span>` : ''}
          ${p.phone ? `<span>| ${this.escapeHTML(p.phone)}</span>` : ''}
          ${p.location ? `<span>| ${this.escapeHTML(p.location)}</span>` : ''}
          ${p.linkedin ? `<span>| ${this.escapeHTML(p.linkedin)}</span>` : ''}
          ${p.github ? `<span>| ${this.escapeHTML(p.github)}</span>` : ''}
        </div>
      </div>

      ${p.summary ? `
        <div class="resume-section">
          <h2 class="section-heading">Summary</h2>
          <p>${this.escapeHTML(p.summary)}</p>
        </div>
      ` : ''}

      ${data.skills && (data.skills.technical?.length || data.skills.tools?.length || data.skills.soft?.length) ? `
        <div class="resume-section">
          <h2 class="section-heading">Technical Skills</h2>
          <div style="display: flex; flex-direction: column; gap: 1mm;">
            ${data.skills.technical?.length ? `<div><strong>Languages & Frameworks:</strong> ${data.skills.technical.map(s => this.escapeHTML(s)).join(', ')}</div>` : ''}
            ${data.skills.tools?.length ? `<div><strong>Developer Tools & Cloud:</strong> ${data.skills.tools.map(s => this.escapeHTML(s)).join(', ')}</div>` : ''}
            ${data.skills.soft?.length ? `<div><strong>Core Competencies:</strong> ${data.skills.soft.map(s => this.escapeHTML(s)).join(', ')}</div>` : ''}
          </div>
        </div>
      ` : ''}

      ${data.experience && data.experience.length > 0 ? `
        <div class="resume-section">
          <h2 class="section-heading">Professional Experience</h2>
          ${data.experience.map(exp => `
            <div class="resume-entry">
              <div class="resume-entry-header">
                <div>
                  <strong>${this.escapeHTML(exp.position || 'Role')}</strong>, ${this.escapeHTML(exp.company || 'Company')}
                </div>
                <div class="resume-entry-date">${this.escapeHTML(exp.startDate || '')} ${exp.startDate && (exp.endDate || exp.current) ? '–' : ''} ${exp.current ? 'Present' : this.escapeHTML(exp.endDate || '')}</div>
              </div>
              ${this.renderBullets(exp.bullets)}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.projects && data.projects.length > 0 ? `
        <div class="resume-section">
          <h2 class="section-heading">Projects</h2>
          ${data.projects.map(proj => `
            <div class="resume-entry">
              <div class="resume-entry-header">
                <div>
                  <strong>${this.escapeHTML(proj.title)}</strong> ${proj.techStack ? `| <em>${this.escapeHTML(proj.techStack)}</em>` : ''}
                </div>
                ${proj.date ? `<div class="resume-entry-date">${this.escapeHTML(proj.date)}</div>` : ''}
              </div>
              ${this.renderBullets(proj.description)}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.education && data.education.length > 0 ? `
        <div class="resume-section">
          <h2 class="section-heading">Education</h2>
          ${data.education.map(edu => `
            <div class="resume-entry">
              <div class="resume-entry-header">
                <div>
                  <strong>${this.escapeHTML(edu.institution || 'University')}</strong> — ${this.escapeHTML(edu.degree || 'Degree')}
                </div>
                <div class="resume-entry-date">${this.escapeHTML(edu.endDate || '')}</div>
              </div>
              ${edu.gpa ? `<div>${this.escapeHTML(edu.gpa)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
  },

  /**
   * Render Template 5: Emerald Elite
   */
  renderEmerald(data) {
    return this.renderModern(data); // Reuses modern structure enhanced with template-emerald CSS styling tokens
  },

  /**
   * Master Dispatcher
   */
  render(templateName, resumeData) {
    let html = '';
    switch (templateName) {
      case 'executive':
        html = this.renderExecutive(resumeData);
        break;
      case 'split':
        html = this.renderSplit(resumeData);
        break;
      case 'compact':
        html = this.renderCompact(resumeData);
        break;
      case 'emerald':
        html = this.renderEmerald(resumeData);
        break;
      case 'modern':
      default:
        html = this.renderModern(resumeData);
        break;
    }
    return html;
  }
};
