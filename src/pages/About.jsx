import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Zap, 
  Users, 
  Lock, 
  Lightbulb, 
  Award, 
  Calendar, 
  ArrowRight,
  Linkedin,
  Twitter,
  Mail,
  ChevronRight
} from 'lucide-react';


// Smooth scroll utility
const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    bio: 'Document management expert with 10+ years in enterprise solutions',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=60',
    linkedin: '#'
  },
  {
    name: 'Sarah Chen',
    role: 'CTO',
    bio: 'Tech visionary specializing in cloud infrastructure',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=60',
    linkedin: '#'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Product',
    bio: 'Passionate about creating intuitive user experiences',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60',
    linkedin: '#'
  },
  {
    name: 'Priya Patel',
    role: 'Lead Developer',
    bio: 'Full-stack developer with a focus on security',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=60',
    linkedin: '#'
  }
];

const milestones = [
  { year: '2022', title: 'Company Founded', description: 'Launched with a vision to revolutionize document management' },
  { year: '2023', title: 'First 100 Customers', description: 'Onboarded our first 100 paying customers' },
  { year: '2023', title: 'Cloud Integrations', description: 'Added support for Google Drive, Dropbox, and OneDrive' },
  { year: '2024', title: 'ISO 27001 Certified', description: 'Achieved ISO 27001 certification for information security' },
  { year: '2024', title: '10,000+ Users', description: 'Grew to serve over 10,000 active users' }
];

const values = [
  {
    icon: <Shield className="w-8 h-8 text-indigo-600" />,
    title: 'Security First',
    description: 'Enterprise-grade security with end-to-end encryption and compliance certifications.'
  },
  {
    icon: <Zap className="w-8 h-8 text-indigo-600" />,
    title: 'User-Centric Design',
    description: 'Intuitive interfaces designed for maximum productivity and ease of use.'
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-indigo-600" />,
    title: 'Innovation',
    description: 'Constantly evolving with AI-powered features and automation.'
  },
  {
    icon: <Users className="w-8 h-8 text-indigo-600" />,
    title: 'Trust & Transparency',
    description: 'We believe in open communication and building trust with our users.'
  }
];

const pressLogos = [
  { name: 'TechCrunch', logo: 'TechCrunch' },
  { name: 'Forbes', logo: 'Forbes' },
  { name: 'The Verge', logo: 'The Verge' },
  { name: 'Wired', logo: 'Wired' }
];

const About = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-700 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-indigo-900/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Transforming the Way Businesses Manage Documents
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
              Our mission is to simplify document management with secure, intelligent, and scalable solutions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
              <button
  onClick={() => scrollTo('team')}
  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10 cursor-pointer"
>
  Contact Us
</button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Story</h2>
              <p className="mt-6 text-lg text-gray-500">
                Founded in 2022, our Document Management System was born out of a simple idea: document management should be secure, simple, and accessible to businesses of all sizes.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Today, we serve thousands of businesses worldwide, helping them reduce paper clutter, enhance security, and collaborate seamlessly in a digital-first world.
              </p>
              <div className="mt-8">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    to="/features"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                  >
                    Learn more about our features
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                className="w-full rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                src="https://images.unsplash.com/photo-1522071820081-009c2f1c8f2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team collaborating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Core Values</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              These principles guide everything we do at Vault
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{value.title}</h3>
                <p className="mt-2 text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team"  className="py-16 bg-white sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Leadership Team</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              The brilliant minds behind our success
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                <img 
                  className="w-full h-64 object-cover" 
                  src={member.image} 
                  alt={member.name} 
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                  <p className="mt-1 text-indigo-600">{member.role}</p>
                  <p className="mt-2 text-gray-500 text-sm">{member.bio}</p>
                  <div className="mt-4">
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-600"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* CTA Section */}
      <section className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to go paperless?
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Join thousands of businesses that trust Vault for their document management needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;