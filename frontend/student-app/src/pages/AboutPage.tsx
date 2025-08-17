import React from 'react';
import LiquidGlassCard from '../components/LiquidGlassCard';
import LiquidGlassButton from '../components/LiquidGlassButton';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-primary">About NeuroLearn</h1>
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

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Empowering Every Unique Mind
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We believe every child deserves an education tailored to their unique way of learning, 
            especially those on the autism spectrum who see the world through a different lens.
          </p>
        </div>

        {/* Company Story */}
        <LiquidGlassCard className="mb-12">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-3xl font-bold text-text-primary">Our Story</h3>
            </div>
            <div className="prose prose-lg max-w-none text-text-secondary">
              <p className="mb-6">
                NeuroLearn was born from a simple yet powerful realization: traditional education systems often fail to unlock the incredible potential of children on the autism spectrum. While these remarkable young minds possess unique talents and perspectives, they frequently struggle in conventional learning environments that don't accommodate their specific needs.
              </p>
              <p className="mb-6">
                Our journey began when we witnessed firsthand the challenges faced by neurodiverse students in grades 1-5. We saw brilliant children who could memorize entire encyclopedias but struggled with traditional classroom interactions, creative thinkers who excelled in pattern recognition but found standard curricula overwhelming, and gentle souls who had so much to offer but needed the right environment to flourish.
              </p>
              <p>
                That's when we decided to create something different—a platform that celebrates neurodiversity and transforms the way autism-spectrum children learn, grow, and discover their unique superpowers.
              </p>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Mission, Vision, Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Mission */}
          <LiquidGlassCard className="h-full">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Our Mission</h3>
              <p className="text-text-secondary">
                To create personalized, engaging, and adaptive learning experiences that unlock the potential of every child on the autism spectrum, fostering confidence, independence, and a lifelong love for learning.
              </p>
            </div>
          </LiquidGlassCard>

          {/* Vision */}
          <LiquidGlassCard className="h-full">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔮</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Our Vision</h3>
              <p className="text-text-secondary">
                A world where neurodiversity is celebrated, where every child has access to education that fits their unique mind, and where autism-spectrum learners are recognized for their incredible talents and contributions.
              </p>
            </div>
          </LiquidGlassCard>

          {/* Values */}
          <LiquidGlassCard className="h-full">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Our Values</h3>
              <div className="text-text-secondary text-left">
                <ul className="space-y-2">
                  <li>• <strong>Inclusion:</strong> Every child matters</li>
                  <li>• <strong>Innovation:</strong> Cutting-edge learning tech</li>
                  <li>• <strong>Empathy:</strong> Understanding unique needs</li>
                  <li>• <strong>Excellence:</strong> Quality in everything we do</li>
                </ul>
              </div>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Future Vision */}
        <LiquidGlassCard className="mb-12">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-3xl font-bold text-text-primary">Our Future Vision</h3>
            </div>
            <div className="prose prose-lg max-w-none text-text-secondary">
              <h4 className="text-xl font-semibold text-text-primary mb-4">🏫 Government School Integration</h4>
              <p className="mb-6">
                We envision a future where NeuroLearn becomes an integral part of government school systems across the country. Our platform will be seamlessly integrated into public education infrastructure, ensuring that every child on the autism spectrum—regardless of their family's economic background—has access to world-class, personalized learning.
              </p>
              
              <h4 className="text-xl font-semibold text-text-primary mb-4">🎓 Special Education Schools Partnership</h4>
              <p className="mb-6">
                Beyond mainstream schools, we're committed to partnering with specialized educational institutions. These schools already understand the unique needs of neurodiverse learners, and our technology will amplify their expertise, providing teachers with AI-powered insights and students with adaptive learning paths that evolve in real-time.
              </p>

              <h4 className="text-xl font-semibold text-text-primary mb-4">🌍 Global Impact Goals</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400">
                  <h5 className="font-semibold text-blue-700 mb-2">📊 By 2027</h5>
                  <p className="text-blue-600">Reach 100,000+ students across 1,000 schools, with measurable improvements in learning outcomes and social skills development.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-400">
                  <h5 className="font-semibold text-green-700 mb-2">🎯 By 2030</h5>
                  <p className="text-green-600">Become the leading platform for autism-spectrum education, recognized by education ministries and implemented nationwide.</p>
                </div>
              </div>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-blue-700 mb-2">1000+</div>
            <div className="text-sm text-blue-600 font-medium">Students Impacted</div>
          </div>
          <div className="text-center bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-green-700 mb-2">95%</div>
            <div className="text-sm text-green-600 font-medium">Improvement Rate</div>
          </div>
          <div className="text-center bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-purple-700 mb-2">50+</div>
            <div className="text-sm text-purple-600 font-medium">Partner Schools</div>
          </div>
          <div className="text-center bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-orange-700 mb-2">24/7</div>
            <div className="text-sm text-orange-600 font-medium">Support Available</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <LiquidGlassCard className="inline-block">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-text-primary mb-4">Join Our Mission</h3>
              <p className="text-text-secondary mb-6 max-w-md">
                Ready to be part of the education revolution? Let's create a world where every child can thrive.
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
                  onClick={() => navigate('/team')}
                >
                  Meet Our Team
                </LiquidGlassButton>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
