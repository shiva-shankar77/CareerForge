/**
 * @file Profile.jsx
 * @module StudentModule
 * @owner Member 1 (Student profile + Resume)
 * @description Comprehensive multi-section student profile management page.
 * Includes dynamic skill tags, education/project array management, server-side completeness progress bar,
 * and responsive loading, error, and empty states.
 */

import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  Award,
  Globe,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Save,
  Github,
  Linkedin,
  Phone,
  Briefcase,
  FileText,
  X,
  ExternalLink,
  Info
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { EmptyState } from '../../components/common/EmptyState';
import { useAuth } from '../../hooks/useAuth';
import studentService from '../../services/studentService';

const SUGGESTED_SKILLS = [
  'JavaScript',
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'Express',
  'MongoDB',
  'Tailwind CSS',
  'Docker',
  'Git',
  'Next.js',
  'SQL',
  'AWS',
  'Redux'
];

export const Profile = () => {
  const { user } = useAuth();

  // State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [newSkillInput, setNewSkillInput] = useState('');

  // Profile Form State
  const [formData, setFormData] = useState({
    headline: '',
    bio: '',
    phone: '',
    skills: [],
    education: [],
    projects: [],
    certifications: [],
    links: {
      github: '',
      linkedin: '',
      portfolio: ''
    }
  });

  // Completeness State from Server
  const [completeness, setCompleteness] = useState({
    percentage: 0,
    breakdown: {
      personal: 0,
      education: 0,
      skills: 0,
      projects: 0,
      certifications: 0,
      links: 0
    },
    missingSections: []
  });

  // Fetch student profile on mount
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await studentService.getProfile();
      if (res.success && res.data) {
        const data = res.data;
        setFormData({
          headline: data.headline || '',
          bio: data.bio || '',
          phone: data.phone || '',
          skills: Array.isArray(data.skills) ? data.skills : [],
          education: Array.isArray(data.education) ? data.education : [],
          projects: Array.isArray(data.projects) ? data.projects : [],
          certifications: Array.isArray(data.certifications) ? data.certifications : [],
          links: {
            github: data.links?.github || data.githubUrl || '',
            linkedin: data.links?.linkedin || data.linkedinUrl || '',
            portfolio: data.links?.portfolio || data.portfolioUrl || ''
          }
        });

        setCompleteness({
          percentage: data.completeness || 0,
          breakdown: data.completenessBreakdown || {
            personal: 0,
            education: 0,
            skills: 0,
            projects: 0,
            certifications: 0,
            links: 0
          },
          missingSections: data.missingSections || []
        });
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError(err.response?.data?.message || 'Failed to load profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Save Profile Handler
  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage('');

      const res = await studentService.updateProfile(formData);
      if (res.success && res.data) {
        setCompleteness({
          percentage: res.data.completeness || 0,
          breakdown: res.data.completenessBreakdown || completeness.breakdown,
          missingSections: res.data.missingSections || []
        });
        setSuccessMessage('Profile updated successfully! Completeness score updated.');
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (err) {
      console.error('Failed to save profile:', err);
      setError(err.response?.data?.message || 'Failed to save changes. Please check input fields.');
    } finally {
      setSaving(false);
    }
  };

  // Skill Tags Management
  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || newSkillInput).trim();
    if (!trimmed) return;
    if (!formData.skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed]
      }));
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Education Array Management
  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: '',
          institution: '',
          startYear: new Date().getFullYear() - 4,
          endYear: new Date().getFullYear(),
          gpa: ''
        }
      ]
    }));
  };

  const handleRemoveEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, idx) => idx !== index)
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  // Projects Array Management
  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: '',
          description: '',
          techStack: [],
          repoUrl: '',
          liveUrl: ''
        }
      ]
    }));
  };

  const handleRemoveProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, idx) => idx !== index)
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.projects];
      if (field === 'techStack' && typeof value === 'string') {
        const stackArr = value.split(',').map((s) => s.trim()).filter(Boolean);
        updated[index] = { ...updated[index], techStack: stackArr };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, projects: updated };
    });
  };

  // Certifications Array Management
  const handleAddCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: '',
          issuingOrg: '',
          date: '',
          credentialUrl: ''
        }
      ]
    }));
  };

  const handleRemoveCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, idx) => idx !== index)
    }));
  };

  const handleCertificationChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.certifications];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, certifications: updated };
    });
  };

  // External Links Change
  const handleLinkChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      links: {
        ...prev.links,
        [key]: value
      }
    }));
  };

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 bg-slate-900/60 rounded-2xl border border-slate-800" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-slate-900/60 rounded-2xl border border-slate-800" />
          <div className="h-64 bg-slate-900/60 rounded-2xl border border-slate-800" />
        </div>
        <div className="h-72 bg-slate-900/60 rounded-2xl border border-slate-800" />
      </div>
    );
  }

  // Completeness Color & Status Label
  const getCompletenessBadge = (percent) => {
    if (percent >= 80) return { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', text: 'All-Star Candidate' };
    if (percent >= 50) return { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', text: 'Intermediate Profile' };
    return { color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', text: 'Action Needed' };
  };

  const badgeInfo = getCompletenessBadge(completeness.percentage);

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* Top Header Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand-500/20 flex-shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {user?.name || 'Student Profile'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified Candidate
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{user?.email}</p>
              <p className="text-xs text-brand-300 font-medium mt-0.5">
                {formData.headline || 'Add a professional headline below'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              icon={Save}
              onClick={handleSaveProfile}
              isLoading={saving}
              className="shadow-md shadow-brand-500/20"
            >
              Save Profile
            </Button>
          </div>
        </div>

        {/* Dynamic Completeness Progress Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span className="text-sm font-semibold text-slate-200">
                Server-Side Profile Completeness
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${badgeInfo.color}`}>
                {badgeInfo.text}
              </span>
            </div>
            <span className="text-lg font-black text-white font-mono">
              {completeness.percentage}%
            </span>
          </div>

          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-400 transition-all duration-700 ease-out"
              style={{ width: `${Math.max(completeness.percentage, 5)}%` }}
            />
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-4">
            <div className={`p-2 rounded-xl text-center border text-xs font-medium ${completeness.breakdown.personal === 15 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900/50 border-slate-800 text-slate-400'}`}>
              Personal ({completeness.breakdown.personal}/15%)
            </div>
            <div className={`p-2 rounded-xl text-center border text-xs font-medium ${completeness.breakdown.education === 20 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900/50 border-slate-800 text-slate-400'}`}>
              Education ({completeness.breakdown.education}/20%)
            </div>
            <div className={`p-2 rounded-xl text-center border text-xs font-medium ${completeness.breakdown.skills >= 20 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900/50 border-slate-800 text-slate-400'}`}>
              Skills ({completeness.breakdown.skills}/20%)
            </div>
            <div className={`p-2 rounded-xl text-center border text-xs font-medium ${completeness.breakdown.projects === 20 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900/50 border-slate-800 text-slate-400'}`}>
              Projects ({completeness.breakdown.projects}/20%)
            </div>
            <div className={`p-2 rounded-xl text-center border text-xs font-medium ${completeness.breakdown.certifications === 10 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900/50 border-slate-800 text-slate-400'}`}>
              Certs ({completeness.breakdown.certifications}/10%)
            </div>
            <div className={`p-2 rounded-xl text-center border text-xs font-medium ${completeness.breakdown.links === 15 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900/50 border-slate-800 text-slate-400'}`}>
              Links ({completeness.breakdown.links}/15%)
            </div>
          </div>

          {/* Missing Recommendations */}
          {completeness.missingSections.length > 0 && (
            <p className="text-xs text-amber-400/90 flex items-center gap-1.5 mt-3">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              Tip to reach 100%: Add details to {completeness.missingSections.join(', ')}.
            </p>
          )}
        </div>
      </div>

      {/* Success & Error Banners */}
      {successMessage && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
          <Button variant="outline" size="sm" onClick={fetchProfile}>
            Retry
          </Button>
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-8">
        {/* Section 1: Basic Information */}
        <Card
          title="1. Basic & Contact Information"
          subtitle="Your professional headline, personal bio, and primary contact details"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <Input
                label="Professional Headline"
                name="headline"
                placeholder="e.g. Full Stack MERN Developer | AI & Cloud Enthusiast"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                helperText="A punchy 1-line summary that recruiters see first."
              />
            </div>

            <div>
              <Input
                label="Phone Number"
                name="phone"
                icon={Phone}
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Email Address
              </label>
              <input
                disabled
                value={user?.email || ''}
                className="mt-1.5 w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-400 text-sm cursor-not-allowed"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Candidate Bio / Summary
                </label>
                <span className="text-xs text-slate-500">
                  {formData.bio.length} / 1000
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={1000}
                placeholder="Describe your background, technical passions, accomplishments, and career aspirations..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl text-slate-100 text-sm placeholder:text-slate-500 p-4 transition-all outline-none resize-none"
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Technical Skills */}
        <Card
          title="2. Technical Skills & Competencies"
          subtitle="Add key programming languages, frameworks, databases, and DevOps tools"
        >
          <div className="space-y-4">
            {/* Tag Input */}
            <div className="flex gap-2.5">
              <div className="flex-1">
                <Input
                  icon={Code2}
                  name="skillInput"
                  placeholder="Type a skill (e.g. Next.js, Docker, MongoDB) and press Enter"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                icon={Plus}
                onClick={() => handleAddSkill()}
              >
                Add Skill
              </Button>
            </div>

            {/* Current Skills Chips */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Active Skills ({formData.skills.length})
                </span>
                {formData.skills.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, skills: [] })}
                    className="text-xs text-rose-400 hover:text-rose-300"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {formData.skills.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
                  No skills added yet. Type a skill above or click from suggested skills below.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/30 shadow-sm transition-all hover:bg-brand-500/25"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="text-brand-400 hover:text-rose-400 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div>
              <span className="text-xs text-slate-400 block mb-2 font-medium">
                Popular suggestions (click to add):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_SKILLS.filter(
                  (s) => !formData.skills.some((exist) => exist.toLowerCase() === s.toLowerCase())
                ).map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => handleAddSkill(skill)}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3 text-slate-500" />
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Section 3: Education History */}
        <Card
          title="3. Educational Background"
          subtitle="Your academic degrees, colleges, graduating years, and CGPA"
          action={
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={handleAddEducation}
            >
              Add Education
            </Button>
          }
        >
          {formData.education.length === 0 ? (
            <EmptyState
              icon={GraduationCap}
              title="No Education Records"
              description="Add your degree, university or college details to establish your academic credentials."
              actionText="Add Education"
              onAction={handleAddEducation}
            />
          ) : (
            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 relative space-y-4 hover:border-slate-700/80 transition-all"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                    <span className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" /> Entry #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEducation(index)}
                      className="text-slate-400 hover:text-rose-400 p-1 rounded-lg transition-colors"
                      title="Remove education"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Degree / Major"
                      required
                      placeholder="e.g. B.Tech in Computer Science"
                      value={edu.degree || ''}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    />
                    <Input
                      label="College / Institution"
                      required
                      placeholder="e.g. GLA University"
                      value={edu.institution || edu.college || ''}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Start Year"
                        type="number"
                        placeholder="2022"
                        value={edu.startYear || ''}
                        onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
                      />
                      <Input
                        label="End Year"
                        type="number"
                        placeholder="2026"
                        value={edu.endYear || edu.passingYear || ''}
                        onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
                      />
                    </div>
                    <Input
                      label="CGPA / GPA (out of 10 or 4)"
                      type="number"
                      step="0.01"
                      placeholder="e.g. 8.85"
                      value={edu.gpa ?? edu.cgpa ?? ''}
                      onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Section 4: Projects */}
        <Card
          title="4. Projects & Technical Builds"
          subtitle="Highlight personal, academic, or open-source software projects"
          action={
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={handleAddProject}
            >
              Add Project
            </Button>
          }
        >
          {formData.projects.length === 0 ? (
            <EmptyState
              icon={FolderGit2}
              title="No Projects Added"
              description="Showcase your technical competence with projects, GitHub repositories, and live demos."
              actionText="Add Project"
              onAction={handleAddProject}
            />
          ) : (
            <div className="space-y-5">
              {formData.projects.map((proj, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4 hover:border-slate-700/80 transition-all"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                    <span className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FolderGit2 className="w-4 h-4" /> Project #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(index)}
                      className="text-slate-400 hover:text-rose-400 p-1 rounded-lg transition-colors"
                      title="Remove project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Project Title"
                      required
                      placeholder="e.g. CareerForge AI Platform"
                      value={proj.title || ''}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                    />
                    <Input
                      label="Tech Stack (comma-separated)"
                      placeholder="React, Node.js, Express, MongoDB, Tailwind"
                      value={Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack || ''}
                      onChange={(e) => handleProjectChange(index, 'techStack', e.target.value)}
                    />
                    <Input
                      label="GitHub Repo URL"
                      placeholder="https://github.com/username/project"
                      icon={Github}
                      value={proj.repoUrl || ''}
                      onChange={(e) => handleProjectChange(index, 'repoUrl', e.target.value)}
                    />
                    <Input
                      label="Live Demo URL"
                      placeholder="https://myproject.vercel.app"
                      icon={ExternalLink}
                      value={proj.liveUrl || ''}
                      onChange={(e) => handleProjectChange(index, 'liveUrl', e.target.value)}
                    />
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                        Description & Achievements
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Key architectural choices, technologies implemented, and real-world results..."
                        value={proj.description || ''}
                        onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                        className="w-full bg-slate-900/80 border border-slate-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl text-slate-100 text-sm placeholder:text-slate-500 p-3 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Section 5: Certifications */}
        <Card
          title="5. Certifications & Credentials"
          subtitle="Industry certifications from AWS, Google, Coursera, Meta, etc."
          action={
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={handleAddCertification}
            >
              Add Certification
            </Button>
          }
        >
          {formData.certifications.length === 0 ? (
            <div className="p-6 rounded-2xl border border-dashed border-slate-800 text-center text-xs text-slate-500 space-y-2">
              <Award className="w-8 h-8 mx-auto text-slate-600" />
              <p>No certifications added. Click "Add Certification" to highlight your credentials.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 relative"
                >
                  <Input
                    label="Certificate Name"
                    placeholder="e.g. AWS Certified Developer"
                    value={cert.name || ''}
                    onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                  />
                  <Input
                    label="Issuing Organization"
                    placeholder="e.g. Amazon Web Services"
                    value={cert.issuingOrg || ''}
                    onChange={(e) => handleCertificationChange(index, 'issuingOrg', e.target.value)}
                  />
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input
                        label="Issue Date"
                        placeholder="e.g. June 2025"
                        value={cert.date || ''}
                        onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(index)}
                      className="p-2.5 rounded-xl border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Remove certification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Section 6: External Profiles & Links */}
        <Card
          title="6. Social & Portfolio Links"
          subtitle="Link your GitHub repositories, LinkedIn network, and custom web portfolio"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="GitHub Profile"
              icon={Github}
              placeholder="https://github.com/username"
              value={formData.links.github}
              onChange={(e) => handleLinkChange('github', e.target.value)}
            />
            <Input
              label="LinkedIn Profile"
              icon={Linkedin}
              placeholder="https://linkedin.com/in/username"
              value={formData.links.linkedin}
              onChange={(e) => handleLinkChange('linkedin', e.target.value)}
            />
            <Input
              label="Portfolio Website"
              icon={Globe}
              placeholder="https://myportfolio.dev"
              value={formData.links.portfolio}
              onChange={(e) => handleLinkChange('portfolio', e.target.value)}
            />
          </div>
        </Card>

        {/* Bottom Sticky Action Bar */}
        <div className="sticky bottom-4 z-20 glass-card p-4 rounded-2xl border border-slate-700/80 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Profile Completeness: <strong className="text-white">{completeness.percentage}%</strong></span>
          </div>

          <Button
            type="submit"
            variant="primary"
            icon={Save}
            isLoading={saving}
            size="lg"
            className="shadow-lg shadow-brand-500/30"
          >
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
