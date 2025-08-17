import React from 'react';
import LiquidGlassCard from '../components/LiquidGlassCard';
import LiquidGlassButton from '../components/LiquidGlassButton';
import { useNavigate } from 'react-router-dom';

const TeamPage: React.FC = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Pranav Jain",
      role: "Co-Founder & CEO",
      specialization: "Product Strategy & Vision",
      bio: "Passionate about creating inclusive technology solutions that make a real difference in children's lives. Leads the strategic vision and product development at NeuroLearn with a focus on autism-friendly design principles.",
      emoji: "🚀",
      color: "from-blue-500 to-purple-600",
      skills: ["Product Strategy", "Leadership", "Technology Innovation", "Autism Advocacy"]
    },
    {
      name: "Nivedita Saboo",
      role: "Co-Founder & CTO",
      specialization: "AI & Machine Learning",
      bio: "Expert in AI-powered educational technologies with a deep understanding of personalized learning algorithms. Architect of our adaptive learning engine that responds to each child's unique needs and learning patterns.",
      emoji: "🧠",
      color: "from-green-500 to-teal-600",
      skills: ["Machine Learning", "Educational AI", "System Architecture", "Data Science"]
    },
    {
      name: "Bhavika Mittal",
      role: "Co-Founder & Head of Education",
      specialization: "Special Education & Curriculum Design",
      bio: "Dedicated special education expert with extensive experience in autism spectrum learning approaches. Designs our comprehensive curriculum that celebrates neurodiversity and promotes inclusive learning experiences.",
      emoji: "🎓",
      color: "from-orange-500 to-pink-600",
      skills: ["Special Education", "Curriculum Design", "Autism Therapy", "Learning Psychology"]
    },
    {
      name: "Kavya Mehta",
      role: "Co-Founder & Head of Research",
      specialization: "Behavioral Analysis & UX Research",
      bio: "Research specialist focused on understanding autism spectrum behaviors and translating insights into user-friendly design. Ensures our platform is not just functional but truly empowering for every child who uses it.",
      emoji: "🔬",
      color: "from-purple-500 to-blue-600",
      skills: ["Behavioral Research", "UX Design", "Data Analysis", "Child Psychology"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-primary">Meet Our Team</h1>
            <LiquidGlassButton 
              variant="secondary" 
              size="small"
              onClick={() => navigate('/')}
            >
              ← Back to Home
            </LiquidGlassButton>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              The Minds Behind NeuroLearn
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Our diverse team of four passionate co-founders brings together expertise in technology, education, 
            research, and autism advocacy to create meaningful learning experiences for every child.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <LiquidGlassCard key={index} className="h-full group hover:scale-105 transition-all duration-300">
              <div className="p-8">
                {/* Profile Header */}
                <div className="text-center mb-6">
                  {/* Placeholder for Photo */}
                  <div className={`w-32 h-32 mx-auto mb-4 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center text-6xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    {member.emoji}
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{member.name}</h3>
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${member.color} text-white text-sm font-semibold mb-2`}>
                    {member.role}
                  </div>
                  <p className="text-text-secondary font-medium">{member.specialization}</p>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3">🌟 About</h4>
                  <p className="text-text-secondary leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3">🎯 Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Photo Placeholder Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">📸</div>
                  <p className="text-sm text-yellow-700 font-medium">
                    Professional photo coming soon!
                  </p>
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* Team Values */}
        <LiquidGlassCard className="mb-12">
          <div className="p-8">
            <h3 className="text-3xl font-bold text-text-primary mb-8 text-center">
              🤝 What Drives Us Together
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h4 className="text-xl font-bold text-text-primary mb-3">Passionate Purpose</h4>
                <p className="text-text-secondary">
                  We're united by our mission to create a world where every child on the autism spectrum can thrive and reach their full potential through personalized education.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔬</span>
                </div>
                <h4 className="text-xl font-bold text-text-primary mb-3">Research-Driven</h4>
                <p className="text-text-secondary">
                  Our approach is grounded in the latest research in autism education, neurodiversity, and learning sciences to ensure evidence-based solutions.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h4 className="text-xl font-bold text-text-primary mb-3">Global Impact</h4>
                <p className="text-text-secondary">
                  We envision a future where our platform transforms education systems worldwide, making inclusive learning accessible to every family.
                </p>
              </div>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Team Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-blue-700 mb-2">4</div>
            <div className="text-sm text-blue-600 font-medium">Co-Founders</div>
          </div>
          <div className="text-center bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-green-700 mb-2">15+</div>
            <div className="text-sm text-green-600 font-medium">Years Combined Experience</div>
          </div>
          <div className="text-center bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-purple-700 mb-2">100%</div>
            <div className="text-sm text-purple-600 font-medium">Committed to Inclusion</div>
          </div>
          <div className="text-center bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-orange-700 mb-2">24/7</div>
            <div className="text-sm text-orange-600 font-medium">Dedication</div>
          </div>
        </div>

        {/* Join Our Mission */}
        <div className="text-center">
          <LiquidGlassCard className="inline-block">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Want to Join Our Mission?
              </h3>
              <p className="text-text-secondary mb-6 max-w-md">
                We're always looking for passionate individuals who share our vision of inclusive education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LiquidGlassButton 
                  variant="primary" 
                  size="medium"
                  onClick={() => navigate('/contact')}
                >
                  Get in Touch
                </LiquidGlassButton>
                <LiquidGlassButton 
                  variant="secondary" 
                  size="medium"
                  onClick={() => navigate('/about')}
                >
                  Learn More About Us
                </LiquidGlassButton>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
