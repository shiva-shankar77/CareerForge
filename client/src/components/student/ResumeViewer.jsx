/**
 * @file ResumeViewer.jsx
 * @description Interactive resume preview canvas component supporting 2 distinct templates:
 * - 'modern': Contemporary tech-focused layout with sleek styling and pill badges
 * - 'classic': Traditional corporate / academic layout optimized for formal ATS review
 */

import React, { forwardRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  FolderGit2,
  Award
} from 'lucide-react';

export const ResumeViewer = forwardRef(({ resumeData }, ref) => {
  const {
    templateId = 'modern',
    personalInfo = {},
    education = [],
    experience = [],
    skills = [],
    projects = [],
    certifications = []
  } = resumeData || {};

  const {
    fullName = 'Your Full Name',
    email = 'student@example.com',
    phone = '+1 (555) 000-0000',
    headline = 'Full Stack Developer',
    summary = 'Passionate software engineer experienced in building performant, modern web applications.',
    location = 'Bengaluru, India',
    links = {}
  } = personalInfo;

  // ============================================================
  // TEMPLATE 1: MODERN TECH TEMPLATE
  // ============================================================
  if (templateId === 'modern') {
    return (
      <div
        ref={ref}
        id="resume-print-area"
        className="w-full bg-white text-slate-900 shadow-2xl rounded-xl p-8 sm:p-10 font-sans leading-relaxed text-sm min-h-[1050px] transition-all print:shadow-none print:p-6 print:rounded-none"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header */}
        <header className="border-b-2 border-indigo-600 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {fullName || 'Your Full Name'}
              </h1>
              <p className="text-base font-semibold text-indigo-600 mt-1">
                {headline || 'Professional Headline'}
              </p>
            </div>
            {location && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>{location}</span>
              </div>
            )}
          </div>

          {/* Contact & Links Strip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-slate-600">
            {email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {email}
              </span>
            )}
            {phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {phone}
              </span>
            )}
            {links?.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-indigo-600 hover:underline"
              >
                <Github className="w-3.5 h-3.5 text-slate-700" />
                GitHub
              </a>
            )}
            {links?.linkedin && (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-indigo-600 hover:underline"
              >
                <Linkedin className="w-3.5 h-3.5 text-slate-700" />
                LinkedIn
              </a>
            )}
            {links?.portfolio && (
              <a
                href={links.portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-indigo-600 hover:underline"
              >
                <Globe className="w-3.5 h-3.5 text-slate-700" />
                Portfolio
              </a>
            )}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-100 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-700 leading-normal">{summary}</p>
          </section>
        )}

        {/* Technical Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-100 pb-1 mb-2">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-100 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{exp.title}</span>
                    <span className="text-slate-500 font-normal">
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate || 'N/A'}
                    </span>
                  </div>
                  <div className="text-slate-600 italic">
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <p className="mt-1 text-slate-700 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-100 pb-1 mb-3">
              Key Projects
            </h2>
            <div className="space-y-3.5">
              {projects.map((proj, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.title}</span>
                    <div className="flex items-center gap-2 text-[11px]">
                      {proj.repoUrl && (
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:underline flex items-center gap-0.5"
                        >
                          Code <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-600 hover:underline flex items-center gap-0.5"
                        >
                          Live Demo <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.techStack && proj.techStack.length > 0 && (
                    <p className="text-[11px] text-slate-500 font-medium">
                      Technologies: {Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack}
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-slate-700 mt-1 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-100 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-2.5">
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <div className="text-slate-600">{edu.institution || edu.college}</div>
                  </div>
                  <div className="text-right text-slate-500">
                    <div>
                      {edu.startYear ? `${edu.startYear} - ` : ''}
                      {edu.endYear || edu.passingYear || 'N/A'}
                    </div>
                    {(edu.gpa || edu.cgpa) && (
                      <div className="font-semibold text-indigo-700">
                        CGPA: {edu.gpa || edu.cgpa}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-100 pb-1 mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
              {certifications.map((cert, idx) => (
                <li key={idx}>
                  <strong className="text-slate-900">{cert.name}</strong>
                  {cert.issuingOrg ? ` — ${cert.issuingOrg}` : ''}
                  {cert.date ? ` (${cert.date})` : ''}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  // ============================================================
  // TEMPLATE 2: CLASSIC PROFESSIONAL TEMPLATE
  // ============================================================
  return (
    <div
      ref={ref}
      id="resume-print-area"
      className="w-full bg-white text-slate-950 shadow-2xl rounded-xl p-8 sm:p-12 leading-relaxed text-sm min-h-[1050px] transition-all print:shadow-none print:p-6 print:rounded-none"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Centered Classic Header */}
      <header className="text-center border-b-2 border-slate-900 pb-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-normal uppercase text-slate-950">
          {fullName || 'Your Full Name'}
        </h1>
        <p className="text-xs italic text-slate-700 mt-1">
          {headline || 'Professional Headline'}
        </p>

        {/* Single bar of contact details */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-700 font-sans">
          {location && <span>{location}</span>}
          {location && email && <span>•</span>}
          {email && <span>{email}</span>}
          {email && phone && <span>•</span>}
          {phone && <span>{phone}</span>}
          {links?.github && (
            <>
              <span>•</span>
              <a href={links.github} target="_blank" rel="noreferrer" className="text-slate-900 underline">
                GitHub
              </a>
            </>
          )}
          {links?.linkedin && (
            <>
              <span>•</span>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-slate-900 underline">
                LinkedIn
              </a>
            </>
          )}
          {links?.portfolio && (
            <>
              <span>•</span>
              <a href={links.portfolio} target="_blank" rel="noreferrer" className="text-slate-900 underline">
                Portfolio
              </a>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-800 leading-normal">{summary}</p>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-2.5 font-sans">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-950">{edu.institution || edu.college}</div>
                  <div className="italic text-slate-800">{edu.degree}</div>
                </div>
                <div className="text-right text-slate-700 font-sans text-[11px]">
                  <div>
                    {edu.startYear ? `${edu.startYear} - ` : ''}
                    {edu.endYear || edu.passingYear || 'N/A'}
                  </div>
                  {(edu.gpa || edu.cgpa) && <div>CGPA: {edu.gpa || edu.cgpa}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Skills & Competencies
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed font-sans">
            <strong>Core Technologies:</strong> {skills.join(' • ')}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-2.5 font-sans">
            Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-950">{exp.company}</span>
                  <span className="text-slate-700 font-sans text-[11px]">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate || 'N/A'}
                  </span>
                </div>
                <div className="italic text-slate-800">{exp.title}</div>
                {exp.description && (
                  <p className="mt-1 text-slate-800 leading-normal">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-2.5 font-sans">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-950">
                  <span>{proj.title}</span>
                  <div className="font-sans text-[11px] space-x-2">
                    {proj.repoUrl && (
                      <a href={proj.repoUrl} target="_blank" rel="noreferrer" className="underline">
                        Repository
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="underline">
                        Live Link
                      </a>
                    )}
                  </div>
                </div>
                {proj.techStack && proj.techStack.length > 0 && (
                  <p className="text-[11px] italic text-slate-700 font-sans">
                    Tech: {Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack}
                  </p>
                )}
                {proj.description && (
                  <p className="mt-0.5 text-slate-800 leading-normal">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Certifications & Honors
          </h2>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-800">
            {certifications.map((cert, idx) => (
              <li key={idx}>
                <strong>{cert.name}</strong>
                {cert.issuingOrg ? `, ${cert.issuingOrg}` : ''}
                {cert.date ? ` (${cert.date})` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
});

ResumeViewer.displayName = 'ResumeViewer';

export default ResumeViewer;
