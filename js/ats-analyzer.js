/**
 * ResumiQ - ATS Resume Health & Score Analyzer
 */

const ATSAnalyzer = {
  
  // High-impact action verbs
  actionVerbs: [
    'architected', 'spearheaded', 'orchestrated', 'engineered', 'accelerated',
    'optimized', 'developed', 'designed', 'implemented', 'scaled', 'built',
    'boosted', 'reduced', 'automated', 'streamlined', 'mentored', 'managed',
    'transformed', 'delivered', 'generated', 'increased', 'led', 'formulated'
  ],

  /**
   * Analyze the full resume dataset
   */
  analyze(data) {
    const p = data.personal || {};
    const experiences = data.experience || [];
    const skills = data.skills || {};
    const education = data.education || [];
    const projects = data.projects || [];

    const checks = [];
    let score = 0;

    // 1. Contact Information Check (20 points max)
    let contactScore = 0;
    if (p.fullName && p.fullName.trim().length > 2) contactScore += 5;
    if (p.jobTitle && p.jobTitle.trim().length > 2) contactScore += 5;
    if (p.email && p.email.includes('@')) contactScore += 5;
    if (p.phone && p.phone.trim().length > 5) contactScore += 3;
    if (p.linkedin || p.website || p.github) contactScore += 2;

    if (contactScore >= 18) {
      checks.push({
        status: 'pass',
        title: 'Complete Contact Information',
        desc: 'Name, professional title, email, phone, and profile links are well structured.'
      });
    } else {
      checks.push({
        status: 'warn',
        title: 'Incomplete Contact Details',
        desc: 'Ensure your Full Name, Professional Title, Email, and Phone number are filled in.'
      });
    }
    score += contactScore;

    // 2. Professional Summary Check (15 points max)
    const summaryWords = p.summary ? p.summary.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
    if (summaryWords >= 30 && summaryWords <= 120) {
      score += 15;
      checks.push({
        status: 'pass',
        title: `Strong Professional Summary (${summaryWords} words)`,
        desc: 'Your summary provides a concise, high-impact overview of your expertise.'
      });
    } else if (summaryWords > 0 && summaryWords < 30) {
      score += 8;
      checks.push({
        status: 'warn',
        title: 'Summary is too brief',
        desc: `Currently ${summaryWords} words. Aim for 40–80 words with your key achievements and core competencies.`
      });
    } else {
      checks.push({
        status: 'warn',
        title: 'Missing Professional Summary',
        desc: 'Add a 3–4 sentence executive bio to boost initial recruiter and ATS engagement.'
      });
    }

    // 3. Work Experience & Quantifiable Impact (25 points max)
    if (experiences.length > 0) {
      let totalBullets = 0;
      let metricCount = 0;
      let verbCount = 0;

      const metricRegex = /(\d+[%kM$+]|\b\d{2,}\b|\b\d+\s*(percent|users|million|thousand|k|x)\b)/gi;

      experiences.forEach(exp => {
        const text = (exp.bullets || '') + ' ' + (exp.position || '');
        const lines = (exp.bullets || '').split('\n').filter(l => l.trim().length > 0);
        totalBullets += lines.length;

        // Metric matching
        const matches = text.match(metricRegex);
        if (matches) metricCount += matches.length;

        // Action verbs matching
        const lower = text.toLowerCase();
        this.actionVerbs.forEach(v => {
          if (lower.includes(v)) verbCount++;
        });
      });

      let expScore = 10; // Base score for having experience
      if (totalBullets >= 3) expScore += 5;
      if (metricCount >= 2) expScore += 5;
      if (verbCount >= 2) expScore += 5;
      score += expScore;

      if (metricCount >= 2 && verbCount >= 2) {
        checks.push({
          status: 'pass',
          title: 'High-Impact Quantified Achievements',
          desc: `Found ${metricCount} numerical metrics (% / $ / scale) and strong action verbs in your experience bullets.`
        });
      } else {
        checks.push({
          status: 'warn',
          title: 'Add More Quantifiable Metrics',
          desc: 'ATS systems and hiring managers prefer numbers (e.g. "increased revenue by 25%", "reduced latency by 40ms").'
        });
      }
    } else {
      checks.push({
        status: 'warn',
        title: 'No Work Experience Added',
        desc: 'Include at least 1 or 2 recent roles or relevant internships.'
      });
    }

    // 4. Skills & Keywords Coverage (20 points max)
    const techSkillsCount = skills.technical ? skills.technical.length : 0;
    const toolSkillsCount = skills.tools ? skills.tools.length : 0;
    const totalSkills = techSkillsCount + toolSkillsCount + (skills.soft?.length || 0);

    if (totalSkills >= 8) {
      score += 20;
      checks.push({
        status: 'pass',
        title: `Rich Skillset (${totalSkills} skills tagged)`,
        desc: 'Strong keyword density across technical proficiencies, tools, and methodologies.'
      });
    } else if (totalSkills >= 4) {
      score += 12;
      checks.push({
        status: 'warn',
        title: 'Moderate Skills Coverage',
        desc: `You have ${totalSkills} skills. We recommend adding 8+ relevant technical and tool skills to rank higher in ATS filters.`
      });
    } else {
      checks.push({
        status: 'warn',
        title: 'Low Skill Keywords',
        desc: 'Add core technical competencies and software tools in the Skills tab.'
      });
    }

    // 5. Education & Credentials (10 points max)
    if (education.length > 0) {
      score += 10;
      checks.push({
        status: 'pass',
        title: 'Education Section Present',
        desc: 'Degree and educational background are clearly documented.'
      });
    } else {
      checks.push({
        status: 'warn',
        title: 'Missing Education Details',
        desc: 'Add your university degree, college diploma, or high school qualifications.'
      });
    }

    // 6. Projects & Extras (10 points max)
    if (projects.length > 0 || (data.certifications && data.certifications.length > 0)) {
      score += 10;
      checks.push({
        status: 'pass',
        title: 'Notable Projects or Certifications',
        desc: 'Extracurricular projects and recognized certifications set you apart.'
      });
    } else {
      score += 5; // mild partial
      checks.push({
        status: 'warn',
        title: 'Add Projects or Certifications',
        desc: 'Showcasing 1–2 portfolio projects or certifications demonstrates hands-on capability.'
      });
    }

    // Cap at 100
    const finalScore = Math.min(100, Math.max(10, score));

    return {
      score: finalScore,
      checks: checks
    };
  }
};
