/**
 * @file seed.js
 * @description Database Seeder script for CareerForge.
 * Initializes the database with test accounts for viva presentation and local testing:
 * - 1 Admin
 * - 2 Recruiters (1 verified, 1 unverified)
 * - 3 Students with complete profiles
 * - 5 Realistic Job Postings
 * 
 * Usage: npm run seed
 */

import mongoose from 'mongoose';
import { env } from '../config/env.js';
import {
  User,
  StudentProfile,
  RecruiterProfile,
  Job
} from '../models/index.js';

const seedDatabase = async () => {
  try {
    console.log('🌱 [Seeder]: Connecting to MongoDB...');
    await mongoose.connect(env.MONGO_URI);
    console.log(`✅ [Seeder]: Connected to ${mongoose.connection.name}`);

    // Clean existing seed data
    console.log('🧹 [Seeder]: Cleaning existing collections...');
    await User.deleteMany({});
    await StudentProfile.deleteMany({});
    await RecruiterProfile.deleteMany({});
    await Job.deleteMany({});
    console.log('✨ [Seeder]: Collections cleaned.');

    // 1. Create Admin User
    console.log('👤 [Seeder]: Creating Admin User...');
    const admin = await User.create({
      name: 'System Administrator',
      email: 'admin@careerforge.dev',
      password: 'Admin@123',
      role: 'admin',
      isVerified: true,
      isBlocked: false
    });

    // 2. Create Recruiters & Profiles
    console.log('💼 [Seeder]: Creating Recruiter Users...');
    const recruiter1 = await User.create({
      name: 'Sarah Connor',
      email: 'recruiter1@techcorp.com',
      password: 'Recruiter@123',
      role: 'recruiter',
      isVerified: true, // Verified by admin
      isBlocked: false
    });

    await RecruiterProfile.create({
      user: recruiter1._id,
      company: {
        name: 'TechCorp Solutions',
        website: 'https://techcorp.example.com',
        location: 'Bengaluru, India',
        description: 'Global enterprise cloud consulting and web development powerhouse.',
        industry: 'Software & Cloud Solutions'
      },
      designation: 'Senior Talent Acquisition Lead',
      isVerified: true
    });

    const recruiter2 = await User.create({
      name: 'David Miller',
      email: 'recruiter2@innovate.io',
      password: 'Recruiter@123',
      role: 'recruiter',
      isVerified: false, // Pending verification (useful for Member 5 testing)
      isBlocked: false
    });

    await RecruiterProfile.create({
      user: recruiter2._id,
      company: {
        name: 'Innovate AI Labs',
        website: 'https://innovate.example.io',
        location: 'Hyderabad, India',
        description: 'Next-gen Artificial Intelligence startup building generative models.',
        industry: 'Artificial Intelligence'
      },
      designation: 'Co-Founder & CTO',
      isVerified: false
    });

    // 3. Create Students & Profiles
    console.log('🎓 [Seeder]: Creating Student Users...');
    const student1 = await User.create({
      name: 'Aarav Sharma',
      email: 'student1@uni.edu',
      password: 'Student@123',
      role: 'student',
      isVerified: true,
      isBlocked: false
    });

    await StudentProfile.create({
      user: student1._id,
      headline: 'Full Stack MERN Developer | B.Tech CSE 2026',
      bio: 'Enthusiastic web engineer building scalable React and Node.js solutions.',
      phone: '+91 9876543210',
      skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Git'],
      education: [
        {
          degree: 'B.Tech in Computer Science & Engineering',
          college: 'GLA University',
          cgpa: 8.85,
          passingYear: 2026
        }
      ],
      githubUrl: 'https://github.com/aarav-sharma-dev',
      linkedinUrl: 'https://linkedin.com/in/aarav-sharma-dev'
    });

    const student2 = await User.create({
      name: 'Priya Patel',
      email: 'student2@uni.edu',
      password: 'Student@123',
      role: 'student',
      isVerified: true,
      isBlocked: false
    });

    await StudentProfile.create({
      user: student2._id,
      headline: 'AI/ML Enthusiast & Data Science Researcher',
      bio: 'Focused on deep learning, computer vision, and applied NLP pipelines.',
      phone: '+91 9876543211',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'FastAPI', 'Pandas'],
      education: [
        {
          degree: 'B.Tech in Computer Science (AI Specialization)',
          college: 'GLA University',
          cgpa: 9.15,
          passingYear: 2026
        }
      ],
      githubUrl: 'https://github.com/priya-patel-ai',
      linkedinUrl: 'https://linkedin.com/in/priya-patel-ai'
    });

    const student3 = await User.create({
      name: 'Rohan Gupta',
      email: 'student3@uni.edu',
      password: 'Student@123',
      role: 'student',
      isVerified: true,
      isBlocked: false
    });

    await StudentProfile.create({
      user: student3._id,
      headline: 'Backend Engineer & Cloud Systems Enthusiast',
      bio: 'Loves high-throughput distributed systems, databases, and microservices.',
      phone: '+91 9876543212',
      skills: ['Java', 'Spring Boot', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
      education: [
        {
          degree: 'B.Tech in Information Technology',
          college: 'GLA University',
          cgpa: 8.6,
          passingYear: 2026
        }
      ],
      githubUrl: 'https://github.com/rohan-gupta-cloud',
      linkedinUrl: 'https://linkedin.com/in/rohan-gupta-cloud'
    });

    // 4. Create 5 Sample Jobs
    console.log('📌 [Seeder]: Creating 5 Sample Job Postings...');
    await Job.create([
      {
        title: 'Junior Full Stack Developer (MERN)',
        description:
          'We are seeking a talented Junior Full Stack Developer to build modern web applications using React, Node.js, and MongoDB. You will work on real-world client dashboards and high-scale APIs.',
        company: {
          name: 'TechCorp Solutions',
          website: 'https://techcorp.example.com'
        },
        recruiter: recruiter1._id,
        location: 'Bengaluru / Hybrid',
        jobType: 'Full-time',
        salaryRange: { min: 700000, max: 1100000, currency: 'INR' },
        requirements: [
          'Proficiency with React hooks and modern JavaScript (ES6+)',
          'Experience building RESTful APIs in Node.js and Express',
          'Good knowledge of MongoDB schemas and aggregation pipelines',
          'Understanding of Git version control'
        ],
        skillsRequired: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
        experienceLevel: 'Fresher (0-1 year)',
        vacancies: 3,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: 'Active'
      },
      {
        title: 'Frontend React Engineer',
        description:
          'Join our core UX engineering group to craft pixel-perfect, responsive user interfaces with Tailwind CSS and React. Focus on high performance, accessibility, and smooth micro-interactions.',
        company: {
          name: 'TechCorp Solutions',
          website: 'https://techcorp.example.com'
        },
        recruiter: recruiter1._id,
        location: 'Remote',
        jobType: 'Full-time',
        salaryRange: { min: 650000, max: 950000, currency: 'INR' },
        requirements: [
          'Expertise in CSS3, Tailwind CSS, and responsive layouts',
          'Strong command of state management and React Router',
          'Eye for UI aesthetic and component reusability'
        ],
        skillsRequired: ['React', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
        experienceLevel: 'Fresher (0-2 years)',
        vacancies: 2,
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        status: 'Active'
      },
      {
        title: 'Backend Specialist (Node.js & MongoDB)',
        description:
          'Design resilient microservices, integrate third-party payment gateways, and optimize MongoDB query performance for high-traffic student applications.',
        company: {
          name: 'TechCorp Solutions',
          website: 'https://techcorp.example.com'
        },
        recruiter: recruiter1._id,
        location: 'Bengaluru, India',
        jobType: 'Full-time',
        salaryRange: { min: 800000, max: 1200000, currency: 'INR' },
        requirements: [
          'Solid understanding of asynchronous Node.js architecture',
          'Experience with JWT authentication and RBAC authorization',
          'Ability to write clean, maintainable modular code'
        ],
        skillsRequired: ['Node.js', 'Express', 'MongoDB', 'REST API', 'JWT'],
        experienceLevel: '1-2 years / Final Year Student',
        vacancies: 2,
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        status: 'Active'
      },
      {
        title: 'AI / Machine Learning Engineering Intern',
        description:
          'Innovate AI Labs is hiring enthusiastic ML interns to fine-tune Large Language Models, build prompt evaluation pipelines, and deploy FastAPI inference endpoints.',
        company: {
          name: 'Innovate AI Labs',
          website: 'https://innovate.example.io'
        },
        recruiter: recruiter2._id,
        location: 'Hyderabad / Hybrid',
        jobType: 'Internship',
        salaryRange: { min: 300000, max: 480000, currency: 'INR' },
        requirements: [
          'Good foundation in Python and data manipulation libraries',
          'Knowledge of PyTorch, TensorFlow, or Scikit-learn',
          'Familiarity with Google Gemini or OpenAI APIs is a big plus'
        ],
        skillsRequired: ['Python', 'Machine Learning', 'FastAPI', 'Gemini API'],
        experienceLevel: 'Student / Intern',
        vacancies: 4,
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        status: 'Active'
      },
      {
        title: 'Cloud DevOps Associate',
        description:
          'Build automated CI/CD deployment pipelines, manage containerized Docker applications, and monitor AWS server infrastructure.',
        company: {
          name: 'Innovate AI Labs',
          website: 'https://innovate.example.io'
        },
        recruiter: recruiter2._id,
        location: 'Remote',
        jobType: 'Full-time',
        salaryRange: { min: 750000, max: 1050000, currency: 'INR' },
        requirements: [
          'Hands-on knowledge of Docker containers and Docker Compose',
          'Basic scripting skills (Bash / Python / PowerShell)',
          'Understanding of GitHub Actions and cloud deployment concepts'
        ],
        skillsRequired: ['Docker', 'AWS', 'Linux', 'CI/CD', 'Git'],
        experienceLevel: 'Fresher (0-1 year)',
        vacancies: 1,
        deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        status: 'Active'
      }
    ]);

    console.log('===========================================================');
    console.log('🎉 [Seeder]: Database successfully seeded!');
    console.log('===========================================================');
    console.log('🔑 TEST ACCOUNTS:');
    console.log('  Admin:       admin@careerforge.dev    / Admin@123');
    console.log('  Recruiter 1: recruiter1@techcorp.com  / Recruiter@123 (Verified)');
    console.log('  Recruiter 2: recruiter2@innovate.io   / Recruiter@123 (Unverified)');
    console.log('  Student 1:   student1@uni.edu         / Student@123');
    console.log('  Student 2:   student2@uni.edu         / Student@123');
    console.log('  Student 3:   student3@uni.edu         / Student@123');
    console.log('===========================================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seeder Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
