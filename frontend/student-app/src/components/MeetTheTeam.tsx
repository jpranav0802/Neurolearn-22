import React from 'react';
import LiquidGlassCard from './LiquidGlassCard';
import LiquidGlassButton from './LiquidGlassButton';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialization: string;
  avatar: string;
  bio: string;
  experience: string;
  favoriteColor: string;
  fun_fact: string;
}

const MeetTheTeam: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Lead Educational Psychologist",
      specialization: "Autism Spectrum Learning",
      avatar: "👩‍⚕️",
      bio: "15+ years helping children with autism discover their unique learning paths through innovative technology.",
      experience: "PhD in Developmental Psychology, MIT",
      favoriteColor: "Soft Blue - calming and focus-enhancing",
      fun_fact: "Speaks 4 languages and loves creating sensory-friendly learning spaces!"
    },
    {
      id: 2,
      name: "Alex Thompson",
      role: "AI Learning Engineer",
      specialization: "Adaptive Technology",
      avatar: "👨‍💻",
      bio: "Passionate about creating AI that understands and adapts to every child's unique learning style.",
      experience: "MS Computer Science, Stanford",
      favoriteColor: "Gentle Green - represents growth and harmony",
      fun_fact: "Built their first learning game at age 12 for their younger brother with autism!"
    },
    {
      id: 3,
      name: "Maya Rodriguez",
      role: "Special Education Therapist",
      specialization: "Social Skills & Communication",
      avatar: "👩‍🏫",
      bio: "Dedicated to empowering children with autism to communicate confidently and build meaningful connections.",
      experience: "MA Special Education, Harvard",
      favoriteColor: "Warm Orange - energizing yet comfortable",
      fun_fact: "Uses music therapy and has composed over 50 learning songs!"
    },
    {
      id: 4,
      name: "Dr. Jamie Kim",
      role: "Behavioral Analyst",
      specialization: "Learning Pattern Recognition",
      avatar: "👨‍🔬",
      bio: "Expert in understanding behavioral patterns and creating personalized intervention strategies.",
      experience: "PhD Behavioral Analysis, UCLA",
      favoriteColor: "Soft Purple - promotes creativity and calm",
      fun_fact: "Has worked with over 1,000 families and loves gardening with their students!"
    },
    {
      id: 5,
      name: "Riley Park",
      role: "UI/UX Designer",
      specialization: "Accessibility & Sensory Design",
      avatar: "👩‍🎨",
      bio: "Creates beautiful, autism-friendly interfaces that reduce sensory overload while maximizing engagement.",
      experience: "BA Design, RISD + Autism Design Certification",
      favoriteColor: "Muted Teal - peaceful and inclusive",
      fun_fact: "Designs all interfaces while consulting with neurodiverse users every step!"
    },
    {
      id: 6,
      name: "Sam Johnson",
      role: "Parent Advocate & Coach",
      specialization: "Family Support Systems",
      avatar: "👨‍👩‍👧‍👦",
      bio: "Parent of two children on the spectrum, dedicated to supporting other families on their journey.",
      experience: "15 years personal experience + Family Coaching Certification",
      favoriteColor: "Sunshine Yellow - brings joy and optimism",
      fun_fact: "Organizes monthly family meetups and has a therapy dog named Pixel!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-text-primary mb-4">
            Meet Our Amazing Team! 🌟
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We're a passionate group of educators, therapists, technologists, and advocates 
            dedicated to creating the best learning experience for children on the autism spectrum.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 px-6 py-3 rounded-full">
            <span className="text-2xl">💝</span>
            <span className="font-semibold text-brand-primary">Designed with Love & Understanding</span>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <LiquidGlassCard 
              key={member.id}
              className="glass-float hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-3 animate-pulse">{member.avatar}</div>
                <h3 className="text-xl font-bold text-text-primary mb-1">{member.name}</h3>
                <p className="text-brand-primary font-semibold text-sm mb-2">{member.role}</p>
                <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {member.specialization}
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <p className="text-text-secondary leading-relaxed">{member.bio}</p>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-text-primary mb-1">🎓 Experience:</p>
                  <p className="text-text-secondary text-xs">{member.experience}</p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg">
                  <p className="font-semibold text-text-primary mb-1">🎨 Favorite Color:</p>
                  <p className="text-text-secondary text-xs">{member.favoriteColor}</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
                  <p className="font-semibold text-text-primary mb-1">✨ Fun Fact:</p>
                  <p className="text-text-secondary text-xs">{member.fun_fact}</p>
                </div>
              </div>

              <div className="mt-4">
                <LiquidGlassButton 
                  variant="secondary" 
                  size="small" 
                  className="w-full"
                  onClick={() => console.log(`Learning more about ${member.name}`)}
                >
                  💬 Connect with {member.name.split(' ')[0]}
                </LiquidGlassButton>
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <LiquidGlassCard className="max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Want to Connect with Our Team?
              </h2>
              <p className="text-text-secondary mb-6">
                We'd love to hear from you! Whether you're a parent, educator, or someone 
                passionate about supporting neurodiverse learners, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LiquidGlassButton 
                  variant="primary" 
                  size="medium"
                  onClick={() => console.log('Opening contact form')}
                >
                  📧 Get in Touch
                </LiquidGlassButton>
                <LiquidGlassButton 
                  variant="secondary" 
                  size="medium"
                  onClick={() => console.log('Scheduling consultation')}
                >
                  📅 Schedule a Consultation
                </LiquidGlassButton>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;
