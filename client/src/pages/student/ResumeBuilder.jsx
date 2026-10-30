/**
 * @file ResumeBuilder.jsx
 * @module ResumeModule
 * @owner Member 1 (Student profile + Resume)
 * @description Interactive split-screen Resume Builder with step-by-step editing form,
 * live real-time preview, template switching (Modern & Classic), profile auto-fill,
 * and high-fidelity PDF export via html2pdf.
 */

import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import {
  FileText,
  Sparkles,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Save,
  Layers,
  GraduationCap,
  Briefcase,
  Code2,
  FolderGit2,
  Award,
  User,
  Star,
  Copy,
  Layout,
  Printer
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { EmptyState } from '../../components/common/EmptyState';
import { ResumeViewer } from '../../components/student/ResumeViewer';
import { useAuth } from '../../hooks/useAuth';
import studentService from '../../services/studentService';
import resumeService from '../../services/resumeService';

const DEFAULT_RESUME_STATE = {
  title: 'Full Stack Engineer Resume',
  templateId: 'modern',
  isDefault: true,
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    headline: '',
    summary: '',
    location: '',
    links: {
      github: '',
      linkedin: '',
      portfolio: ''
    }
  },
  skills: [],
  education: [],
  experience: [],
  projects: [],
  certifications: []
};

export const ResumeBuilder = () => {
  const { user } = useAuth();
  const printRef = useRef(null);

  // App & Resume List State
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [autoFilling, setAutoFilling] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Active Tab in Form Wizard
  const [activeStep, setActiveStep] = useState('personal'); // 'personal' | 'skills' | 'education' | 'experience' | 'projects' | 'certifications'

  // Current Resume Form State
  const [formData, setFormData] = useState({
    ...DEFAULT_RESUME_STATE,
    personalInfo: {
      ...DEFAULT_RESUME_STATE.personalInfo,
      fullName: user?.name || '',
      email: user?.email || ''
    }
  });

  const [newSkillInput, setNewSkillInput] = useState('');

  // Fetch all existing resumes
  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await resumeService.getAll();
      if (res.success && Array.isArray(res.data)) {
        setResumes(res.data);
        if (res.data.length > 0) {
          // Select default or first resume
          const defaultResume = res.data.find((r) => r.isDefault) || res.data[0];
          selectResume(defaultResume);
        } else {
          // No resumes exist yet, auto-populate base info from user
          setFormData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              fullName: user?.name || '',
              email: user?.email || ''
            }
          }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
      setError(err.response?.data?.message || 'Failed to fetch resume documents.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const selectResume = (resume) => {
    setSelectedResumeId(resume._id);
    setFormData({
      title: resume.title || 'My Resume',
      templateId: resume.templateId || 'modern',
      isDefault: Boolean(resume.isDefault),
      personalInfo: {
        fullName: resume.personalInfo?.fullName || user?.name || '',
        email: resume.personalInfo?.email || user?.email || '',
        phone: resume.personalInfo?.phone || '',
        headline: resume.personalInfo?.headline || '',
        summary: resume.personalInfo?.summary || '',
        location: resume.personalInfo?.location || '',
        links: {
          github: resume.personalInfo?.links?.github || '',
          linkedin: resume.personalInfo?.links?.linkedin || '',
          portfolio: resume.personalInfo?.links?.portfolio || ''
        }
      },
      skills: Array.isArray(resume.skills) ? resume.skills : [],
      education: Array.isArray(resume.education) ? resume.education : [],
      experience: Array.isArray(resume.experience) ? resume.experience : [],
      projects: Array.isArray(resume.projects) ? resume.projects : [],
      certifications: Array.isArray(resume.certifications) ? resume.certifications : []
    });
  };

  // Create New Resume
  const handleCreateNewResume = () => {
    setSelectedResumeId(null);
    setFormData({
      ...DEFAULT_RESUME_STATE,
      title: `Resume #${resumes.length + 1}`,
      isDefault: resumes.length === 0,
      personalInfo: {
        ...DEFAULT_RESUME_STATE.personalInfo,
        fullName: user?.name || '',
        email: user?.email || ''
      }
    });
    setSuccessMsg('Created fresh resume blank. Customize and save your changes.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Save / Update Resume
  const handleSaveResume = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMsg('');

      let res;
      if (selectedResumeId) {
        res = await resumeService.update(selectedResumeId, formData);
      } else {
        res = await resumeService.create(formData);
      }

      if (res.success && res.data) {
        setSelectedResumeId(res.data._id);
        setSuccessMsg(`Resume "${res.data.title}" saved successfully!`);
        setTimeout(() => setSuccessMsg(''), 5000);
        // Refresh resume list
        const updatedList = await resumeService.getAll();
        if (updatedList.success) {
          setResumes(updatedList.data);
        }
      }
    } catch (err) {
      console.error('Failed to save resume:', err);
      setError(err.response?.data?.message || 'Failed to save resume. Please review required fields.');
    } finally {
      setSaving(false);
    }
  };

  // Delete Resume
  const handleDeleteResume = async (idToDelete) => {
    if (!idToDelete) return;
    if (!window.confirm('Are you sure you want to delete this resume?')) return;

    try {
      setSaving(true);
      const res = await resumeService.delete(idToDelete);
      if (res.success) {
        setSuccessMsg('Resume deleted successfully.');
        setTimeout(() => setSuccessMsg(''), 4000);
        await fetchResumes();
      }
    } catch (err) {
      console.error('Failed to delete resume:', err);
      setError(err.response?.data?.message || 'Failed to delete resume.');
    } finally {
      setSaving(false);
    }
  };

  // Auto-Fill from Student Profile
  const handleAutoFillFromProfile = async () => {
    try {
      setAutoFilling(true);
      setError(null);
      const res = await studentService.getProfile();
      if (res.success && res.data) {
        const p = res.data;
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            fullName: p.user?.name || prev.personalInfo.fullName || user?.name || '',
            email: p.user?.email || prev.personalInfo.email || user?.email || '',
            headline: p.headline || prev.personalInfo.headline || '',
            phone: p.phone || prev.personalInfo.phone || '',
            summary: p.bio || prev.personalInfo.summary || '',
            links: {
              github: p.links?.github || p.githubUrl || prev.personalInfo.links?.github || '',
              linkedin: p.links?.linkedin || p.linkedinUrl || prev.personalInfo.links?.linkedin || '',
              portfolio: p.links?.portfolio || p.portfolioUrl || prev.personalInfo.links?.portfolio || ''
            }
          },
          skills: p.skills && p.skills.length > 0 ? p.skills : prev.skills,
          education:
            p.education && p.education.length > 0
              ? p.education.map((edu) => ({
                  degree: edu.degree || '',
                  institution: edu.institution || edu.college || '',
                  startYear: edu.startYear || '',
                  endYear: edu.endYear || edu.passingYear || '',
                  gpa: edu.gpa || edu.cgpa || ''
                }))
              : prev.education,
          projects:
            p.projects && p.projects.length > 0
              ? p.projects.map((proj) => ({
                  title: proj.title || '',
                  description: proj.description || '',
                  techStack: Array.isArray(proj.techStack) ? proj.techStack : [],
                  repoUrl: proj.repoUrl || '',
                  liveUrl: proj.liveUrl || ''
                }))
              : prev.projects,
          certifications:
            p.certifications && p.certifications.length > 0
              ? p.certifications.map((c) => ({
                  name: c.name || '',
                  issuingOrg: c.issuingOrg || '',
                  date: c.date || ''
                }))
              : prev.certifications
        }));

        setSuccessMsg('Successfully auto-filled resume with your student profile data!');
        setTimeout(() => setSuccessMsg(''), 5000);
      }
    } catch (err) {
      console.error('Failed to auto-fill from profile:', err);
      setError('Could not auto-fill profile data. Please check connection.');
    } finally {
      setAutoFilling(false);
    }
  };

  // PDF Export using html2pdf.js with high quality settings
  const handleExportPdf = async () => {
    if (!printRef.current) return;
    try {
      setExportingPdf(true);
      const safeTitle = (formData.title || 'Resume')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_');
      const filename = `${safeTitle}_${Date.now()}.pdf`;

      const options = {
        margin: [8, 8, 8, 8],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(options).from(printRef.current).save();
      setSuccessMsg(`PDF exported successfully as ${filename}!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('PDF export failed:', err);
      // Fallback to browser print
      window.print();
    } finally {
      setExportingPdf(false);
    }
  };

  // Skills Tag Handlers
  const handleAddSkill = (skill) => {
    const s = (skill || newSkillInput).trim();
    if (!s) return;
    if (!formData.skills.some((exist) => exist.toLowerCase() === s.toLowerCase())) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, s] }));
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Dynamic Array Helpers
  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: '', institution: '', startYear: '', endYear: '', gpa: '' }
      ]
    }));
  };

  const handleRemoveEducation = (idx) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx)
    }));
  };

  const handleEducationChange = (idx, field, val) => {
    setFormData((prev) => {
      const copy = [...prev.education];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...prev, education: copy };
    });
  };

  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          description: ''
        }
      ]
    }));
  };

  const handleRemoveExperience = (idx) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx)
    }));
  };

  const handleExperienceChange = (idx, field, val) => {
    setFormData((prev) => {
      const copy = [...prev.experience];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...prev, experience: copy };
    });
  };

  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: '', description: '', techStack: [], repoUrl: '', liveUrl: '' }
      ]
    }));
  };

  const handleRemoveProject = (idx) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx)
    }));
  };

  const handleProjectChange = (idx, field, val) => {
    setFormData((prev) => {
      const copy = [...prev.projects];
      if (field === 'techStack' && typeof val === 'string') {
        copy[idx] = { ...copy[idx], techStack: val.split(',').map((s) => s.trim()).filter(Boolean) };
      } else {
        copy[idx] = { ...copy[idx], [field]: val };
      }
      return { ...prev, projects: copy };
    });
  };

  const handleAddCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { name: '', issuingOrg: '', date: '' }
      ]
    }));
  };

  const handleRemoveCertification = (idx) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== idx)
    }));
  };

  const handleCertificationChange = (idx, field, val) => {
    setFormData((prev) => {
      const copy = [...prev.certifications];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...prev, certifications: copy };
    });
  };

  const wizardTabs = [
    { id: 'personal', label: '1. Personal Info', icon: User },
    { id: 'skills', label: '2. Skills', icon: Code2 },
    { id: 'education', label: '3. Education', icon: GraduationCap },
    { id: 'experience', label: '4. Experience', icon: Briefcase },
    { id: 'projects', label: '5. Projects', icon: FolderGit2 },
    { id: 'certifications', label: '6. Certs', icon: Award }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400">Loading Resume Builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Controls Bar */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-800/80 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Resume Selector & Add New */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-400" />
            <span className="text-sm font-bold text-white">Active Resume:</span>
          </div>

          {resumes.length > 0 && (
            <select
              value={selectedResumeId || ''}
              onChange={(e) => {
                const target = resumes.find((r) => r._id === e.target.value);
                if (target) selectResume(target);
              }}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-brand-500"
            >
              {resumes.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.title} {r.isDefault ? '★ (Default)' : ''}
                </option>
              ))}
            </select>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={handleCreateNewResume}
          >
            New Resume
          </Button>

          {selectedResumeId && (
            <button
              type="button"
              onClick={() => handleDeleteResume(selectedResumeId)}
              className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 transition-colors"
            >
              Delete
            </button>
          )}
        </div>

        {/* Right: Quick Action Triggers */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Auto-Fill Button */}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={Sparkles}
            onClick={handleAutoFillFromProfile}
            isLoading={autoFilling}
            className="text-xs border-brand-500/40 text-brand-300 hover:bg-brand-500/10"
            title="Import headline, bio, skills, education, and projects from student profile"
          >
            Auto-Fill from Profile
          </Button>

          {/* PDF Download Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={Download}
            onClick={handleExportPdf}
            isLoading={exportingPdf}
            className="text-xs text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
          >
            Download PDF
          </Button>

          {/* Save Button */}
          <Button
            type="button"
            variant="primary"
            size="sm"
            icon={Save}
            onClick={handleSaveResume}
            isLoading={saving}
            className="shadow-md shadow-brand-500/20 text-xs"
          >
            Save Resume
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ============================================================
            LEFT COLUMN: STEP-BY-STEP FORM WIZARD (col-span-12 lg:col-span-6)
           ============================================================ */}
        <div className="lg:col-span-6 space-y-6">
          {/* Resume Header & Template Settings Card */}
          <Card
            title="Resume Settings & Layout"
            subtitle="Configure document name, ATS template style, and default placement"
          >
            <div className="space-y-4">
              <div>
                <Input
                  label="Resume Title"
                  name="title"
                  placeholder="e.g. Full Stack MERN Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* Template Switcher */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                  Select Resume Template Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, templateId: 'modern' })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      formData.templateId === 'modern'
                        ? 'bg-brand-600/15 border-brand-500 text-white ring-2 ring-brand-500/20 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-brand-300">Modern Tech</span>
                      {formData.templateId === 'modern' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Sleek contemporary layout with indigo highlights and skill pills.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, templateId: 'classic' })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      formData.templateId === 'classic'
                        ? 'bg-brand-600/15 border-brand-500 text-white ring-2 ring-brand-500/20 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-brand-300">Classic Professional</span>
                      {formData.templateId === 'classic' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Traditional corporate / serif style engineered for formal ATS parsers.
                    </p>
                  </button>
                </div>
              </div>

              {/* Default Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Star className={`w-4 h-4 ${formData.isDefault ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-xs font-semibold text-slate-200">Default Resume for Job Applications</span>
                    <p className="text-[11px] text-slate-400">Used as your 1-click apply document.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-600 bg-slate-800 border-slate-700 focus:ring-brand-500 cursor-pointer"
                />
              </div>
            </div>
          </Card>

          {/* Section Wizard Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800">
            {wizardTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeStep === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveStep(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab 1: Personal Info */}
          {activeStep === 'personal' && (
            <Card title="Candidate Information" subtitle="Your contact details and executive summary">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Input
                    label="Full Name"
                    placeholder="Alex Johnson"
                    value={formData.personalInfo.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, fullName: e.target.value }
                      })
                    }
                  />
                  <Input
                    label="Headline / Desired Role"
                    placeholder="Full Stack Software Engineer"
                    value={formData.personalInfo.headline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, headline: e.target.value }
                      })
                    }
                  />
                  <Input
                    label="Email Address"
                    placeholder="alex@university.edu"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, email: e.target.value }
                      })
                    }
                  />
                  <Input
                    label="Phone Number"
                    placeholder="+91 9876543210"
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, phone: e.target.value }
                      })
                    }
                  />
                  <Input
                    label="Location"
                    placeholder="Bengaluru, India"
                    value={formData.personalInfo.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, location: e.target.value }
                      })
                    }
                  />
                  <Input
                    label="GitHub Profile URL"
                    placeholder="https://github.com/alex"
                    value={formData.personalInfo.links?.github || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: {
                          ...formData.personalInfo,
                          links: { ...formData.personalInfo.links, github: e.target.value }
                        }
                      })
                    }
                  />
                  <Input
                    label="LinkedIn Profile URL"
                    placeholder="https://linkedin.com/in/alex"
                    value={formData.personalInfo.links?.linkedin || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: {
                          ...formData.personalInfo,
                          links: { ...formData.personalInfo.links, linkedin: e.target.value }
                        }
                      })
                    }
                  />
                  <Input
                    label="Portfolio Website URL"
                    placeholder="https://alex.dev"
                    value={formData.personalInfo.links?.portfolio || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: {
                          ...formData.personalInfo,
                          links: { ...formData.personalInfo.links, portfolio: e.target.value }
                        }
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1">
                    Executive Summary
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief 2-3 sentence overview of your technical background and value proposition..."
                    value={formData.personalInfo.summary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, summary: e.target.value }
                      })
                    }
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl text-slate-100 text-xs p-3 outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Tab 2: Skills */}
          {activeStep === 'skills' && (
            <Card title="Technical Skills" subtitle="Add tech stack keywords tailored to target job descriptions">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type skill & press Enter (e.g. React, Docker, Node.js)"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-brand-500"
                  />
                  <Button type="button" size="sm" variant="secondary" onClick={() => handleAddSkill()}>
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-brand-500/15 text-brand-300 border border-brand-500/30"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(idx)}
                        className="text-brand-400 hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Tab 3: Education */}
          {activeStep === 'education' && (
            <Card
              title="Education Records"
              subtitle="Colleges, degrees, and academic performance"
              action={
                <Button type="button" size="sm" variant="outline" icon={Plus} onClick={handleAddEducation}>
                  Add Degree
                </Button>
              }
            >
              <div className="space-y-4">
                {formData.education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-brand-400">Education #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEducation(idx)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        label="Degree"
                        placeholder="B.Tech Computer Science"
                        value={edu.degree || ''}
                        onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                      />
                      <Input
                        label="Institution"
                        placeholder="GLA University"
                        value={edu.institution || ''}
                        onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          label="Start Year"
                          type="number"
                          placeholder="2022"
                          value={edu.startYear || ''}
                          onChange={(e) => handleEducationChange(idx, 'startYear', e.target.value)}
                        />
                        <Input
                          label="End Year"
                          type="number"
                          placeholder="2026"
                          value={edu.endYear || ''}
                          onChange={(e) => handleEducationChange(idx, 'endYear', e.target.value)}
                        />
                      </div>
                      <Input
                        label="GPA / CGPA"
                        placeholder="8.8"
                        value={edu.gpa || ''}
                        onChange={(e) => handleEducationChange(idx, 'gpa', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Tab 4: Work Experience */}
          {activeStep === 'experience' && (
            <Card
              title="Work & Internship Experience"
              subtitle="Internships, freelance roles, or full-time experience"
              action={
                <Button type="button" size="sm" variant="outline" icon={Plus} onClick={handleAddExperience}>
                  Add Role
                </Button>
              }
            >
              <div className="space-y-4">
                {formData.experience.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-4 text-center">
                    No work experience added. Freshers can highlight projects or internships.
                  </p>
                ) : (
                  formData.experience.map((exp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                        <span className="text-xs font-bold text-brand-400">Position #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(idx)}
                          className="text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                          label="Role Title"
                          placeholder="Frontend Engineering Intern"
                          value={exp.title || ''}
                          onChange={(e) => handleExperienceChange(idx, 'title', e.target.value)}
                        />
                        <Input
                          label="Company Name"
                          placeholder="Innovate Corp"
                          value={exp.company || ''}
                          onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
                        />
                        <Input
                          label="Start Date"
                          placeholder="Jan 2025"
                          value={exp.startDate || ''}
                          onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)}
                        />
                        <Input
                          label="End Date"
                          placeholder="June 2025"
                          value={exp.endDate || ''}
                          onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)}
                        />
                        <div className="sm:col-span-2">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1">
                            Key Responsibilities & Impact
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Bullet points summarizing technical contributions and business impact..."
                            value={exp.description || ''}
                            onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
                            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl text-slate-100 text-xs p-3 outline-none focus:border-brand-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          )}

          {/* Tab 5: Projects */}
          {activeStep === 'projects' && (
            <Card
              title="Featured Projects"
              subtitle="Software builds, GitHub repos, and live deployments"
              action={
                <Button type="button" size="sm" variant="outline" icon={Plus} onClick={handleAddProject}>
                  Add Project
                </Button>
              }
            >
              <div className="space-y-4">
                {formData.projects.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-brand-400">Project #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(idx)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        label="Project Title"
                        placeholder="CareerForge Platform"
                        value={proj.title || ''}
                        onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                      />
                      <Input
                        label="Tech Stack (comma-separated)"
                        placeholder="React, Node.js, Socket.io"
                        value={Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack || ''}
                        onChange={(e) => handleProjectChange(idx, 'techStack', e.target.value)}
                      />
                      <Input
                        label="Repo URL"
                        placeholder="https://github.com/..."
                        value={proj.repoUrl || ''}
                        onChange={(e) => handleProjectChange(idx, 'repoUrl', e.target.value)}
                      />
                      <Input
                        label="Live URL"
                        placeholder="https://..."
                        value={proj.liveUrl || ''}
                        onChange={(e) => handleProjectChange(idx, 'liveUrl', e.target.value)}
                      />
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Project features, architectural details..."
                          value={proj.description || ''}
                          onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl text-slate-100 text-xs p-3 outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Tab 6: Certifications */}
          {activeStep === 'certifications' && (
            <Card
              title="Certifications & Accreditations"
              subtitle="Industry certified qualifications"
              action={
                <Button type="button" size="sm" variant="outline" icon={Plus} onClick={handleAddCertification}>
                  Add Credential
                </Button>
              }
            >
              <div className="space-y-3">
                {formData.certifications.map((cert, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
                    <Input
                      label="Certificate Name"
                      placeholder="AWS Cloud Practitioner"
                      value={cert.name || ''}
                      onChange={(e) => handleCertificationChange(idx, 'name', e.target.value)}
                    />
                    <Input
                      label="Issuing Organization"
                      placeholder="Amazon Web Services"
                      value={cert.issuingOrg || ''}
                      onChange={(e) => handleCertificationChange(idx, 'issuingOrg', e.target.value)}
                    />
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <Input
                          label="Issue Date"
                          placeholder="2025"
                          value={cert.date || ''}
                          onChange={(e) => handleCertificationChange(idx, 'date', e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCertification(idx)}
                        className="p-2 text-slate-400 hover:text-rose-400 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* ============================================================
            RIGHT COLUMN: REAL-TIME LIVE PREVIEW (col-span-12 lg:col-span-6)
           ============================================================ */}
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-6">
          {/* Live Preview Control Ribbon */}
          <div className="glass-card rounded-2xl p-3 border border-slate-800/80 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Live Preview:
              </span>
              <span className="text-xs font-semibold text-brand-400 capitalize">
                {formData.templateId === 'modern' ? 'Modern Tech' : 'Classic Professional'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, templateId: 'modern' })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  formData.templateId === 'modern'
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                Modern
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, templateId: 'classic' })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  formData.templateId === 'classic'
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                Classic
              </button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={Printer}
                onClick={handleExportPdf}
                isLoading={exportingPdf}
                className="text-xs"
              >
                PDF
              </Button>
            </div>
          </div>

          {/* Scaled / Scrollable Resume Canvas Container */}
          <div className="max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800/90 shadow-2xl bg-slate-900/40 p-2 sm:p-4">
            <ResumeViewer ref={printRef} resumeData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
