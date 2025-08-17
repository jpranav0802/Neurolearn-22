import React, { useState } from 'react';
import LiquidGlassCard from '../components/LiquidGlassCard';
import LiquidGlassButton from '../components/LiquidGlassButton';
import { useNavigate } from 'react-router-dom';

const CurriculumPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState<number>(1);

  const grades = [
    {
      grade: 1,
      title: "Grade 1 - Foundation Building",
      ageRange: "6-7 years",
      focus: "Basic Skills & Sensory Learning",
      color: "from-blue-400 to-blue-600",
      subjects: [
        {
          name: "Pre-Math Skills",
          icon: "🔢",
          topics: ["Number recognition (1-10)", "Basic counting", "Simple patterns", "Size and shape concepts", "Color identification"],
          adaptations: ["Visual number cards", "Tactile counting objects", "Interactive digital games", "Routine-based learning"]
        },
        {
          name: "Language Foundation",
          icon: "📚",
          topics: ["Letter recognition", "Simple vocabulary", "Picture-word association", "Basic communication", "Listening skills"],
          adaptations: ["Picture exchange systems", "Visual storytelling", "Repetitive reading", "Multi-sensory phonics"]
        },
        {
          name: "Social Skills Basics",
          icon: "👥",
          topics: ["Turn-taking", "Following simple instructions", "Expressing needs", "Greeting others", "Sharing concepts"],
          adaptations: ["Role-play scenarios", "Social stories", "Video modeling", "Structured practice"]
        },
        {
          name: "Sensory Integration",
          icon: "🌈",
          topics: ["Texture exploration", "Sound recognition", "Movement coordination", "Self-regulation", "Environmental awareness"],
          adaptations: ["Sensory bins", "Calm-down strategies", "Movement breaks", "Fidget tools"]
        }
      ]
    },
    {
      grade: 2,
      title: "Grade 2 - Skill Development",
      ageRange: "7-8 years",
      focus: "Building Independence & Confidence",
      color: "from-green-400 to-green-600",
      subjects: [
        {
          name: "Elementary Math",
          icon: "➕",
          topics: ["Addition & subtraction (1-20)", "Time concepts", "Money basics", "Measurement introduction", "Data sorting"],
          adaptations: ["Manipulative tools", "Visual math stories", "Real-world applications", "Step-by-step guides"]
        },
        {
          name: "Reading & Writing",
          icon: "✍️",
          topics: ["Sight words", "Simple sentences", "Handwriting practice", "Story comprehension", "Creative expression"],
          adaptations: ["Assistive technology", "Graphic organizers", "Choice-based writing", "Visual supports"]
        },
        {
          name: "Science Exploration",
          icon: "🔬",
          topics: ["Living vs non-living", "Weather patterns", "Plant growth", "Animal habitats", "Simple experiments"],
          adaptations: ["Hands-on experiments", "Visual observation charts", "Predictable routines", "Special interests integration"]
        },
        {
          name: "Life Skills",
          icon: "🏠",
          topics: ["Personal hygiene", "Classroom routines", "Organization skills", "Safety awareness", "Independence building"],
          adaptations: ["Visual schedules", "Task analysis", "Practice opportunities", "Positive reinforcement"]
        }
      ]
    },
    {
      grade: 3,
      title: "Grade 3 - Expanding Horizons",
      ageRange: "8-9 years",
      focus: "Academic Growth & Social Understanding",
      color: "from-purple-400 to-purple-600",
      subjects: [
        {
          name: "Advanced Math",
          icon: "🧮",
          topics: ["Multiplication basics", "Division introduction", "Fractions concepts", "Geometry shapes", "Problem-solving"],
          adaptations: ["Visual fraction models", "Concrete examples", "Multiple solution paths", "Interest-based problems"]
        },
        {
          name: "Reading Comprehension",
          icon: "📖",
          topics: ["Chapter books", "Main idea identification", "Character analysis", "Inference skills", "Research projects"],
          adaptations: ["Audiobook options", "Discussion guides", "Visual summaries", "Choice in topics"]
        },
        {
          name: "Social Studies",
          icon: "🌍",
          topics: ["Community helpers", "Cultural diversity", "Geography basics", "History introduction", "Citizenship"],
          adaptations: ["Virtual field trips", "Interactive maps", "Cultural celebrations", "Community connections"]
        },
        {
          name: "Creative Arts",
          icon: "🎨",
          topics: ["Art techniques", "Music appreciation", "Drama activities", "Craft projects", "Self-expression"],
          adaptations: ["Sensory-friendly materials", "Flexible participation", "Special interest integration", "Multiple mediums"]
        }
      ]
    },
    {
      grade: 4,
      title: "Grade 4 - Mastery & Application",
      ageRange: "9-10 years",
      focus: "Complex Thinking & Peer Interaction",
      color: "from-orange-400 to-orange-600",
      subjects: [
        {
          name: "Mathematical Reasoning",
          icon: "📊",
          topics: ["Multi-step problems", "Data analysis", "Advanced geometry", "Decimals", "Mathematical thinking"],
          adaptations: ["Graphic organizers", "Real-world contexts", "Technology tools", "Collaborative problem-solving"]
        },
        {
          name: "Language Arts",
          icon: "📝",
          topics: ["Essay writing", "Research skills", "Grammar mastery", "Presentation skills", "Critical thinking"],
          adaptations: ["Writing templates", "Peer review systems", "Multimedia presentations", "Interest-based topics"]
        },
        {
          name: "Scientific Method",
          icon: "⚗️",
          topics: ["Hypothesis formation", "Controlled experiments", "Data collection", "Scientific reporting", "Lab safety"],
          adaptations: ["Structured protocols", "Visual lab guides", "Collaborative experiments", "Technology integration"]
        },
        {
          name: "Social Dynamics",
          icon: "🤝",
          topics: ["Teamwork skills", "Conflict resolution", "Leadership roles", "Community service", "Global awareness"],
          adaptations: ["Structured group work", "Clear role definitions", "Practice scenarios", "Mentorship programs"]
        }
      ]
    },
    {
      grade: 5,
      title: "Grade 5 - Preparation & Leadership",
      ageRange: "10-11 years",
      focus: "Advanced Skills & Future Readiness",
      color: "from-pink-400 to-pink-600",
      subjects: [
        {
          name: "Advanced Mathematics",
          icon: "📐",
          topics: ["Algebra introduction", "Complex problem-solving", "Statistics", "Advanced geometry", "Mathematical modeling"],
          adaptations: ["Multiple representation methods", "Technology tools", "Collaborative learning", "Real-world applications"]
        },
        {
          name: "Literature & Composition",
          icon: "📚",
          topics: ["Literary analysis", "Creative writing", "Research papers", "Public speaking", "Media literacy"],
          adaptations: ["Choice in literature", "Flexible formats", "Peer collaboration", "Technology support"]
        },
        {
          name: "Integrated Science",
          icon: "🌌",
          topics: ["Earth science", "Physical science", "Life science", "Environmental awareness", "STEAM projects"],
          adaptations: ["Project-based learning", "Special interest connections", "Collaborative research", "Multiple assessment types"]
        },
        {
          name: "Leadership & Independence",
          icon: "🎯",
          topics: ["Goal setting", "Self-advocacy", "Mentoring younger students", "Future planning", "Transition skills"],
          adaptations: ["Individualized plans", "Mentor support", "Gradual release", "Strength-based approaches"]
        }
      ]
    }
  ];

  const selectedGradeData = grades.find(g => g.grade === selectedGrade) || grades[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-primary">Curriculum Overview</h1>
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
              Autism-Focused Curriculum
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Our carefully crafted curriculum for grades 1-5 is designed specifically for children on the autism spectrum, 
            combining academic excellence with sensory-friendly learning approaches and social skill development.
          </p>
        </div>

        {/* Grade Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {grades.map((grade) => (
            <LiquidGlassButton
              key={grade.grade}
              variant={selectedGrade === grade.grade ? "primary" : "secondary"}
              size="medium"
              onClick={() => setSelectedGrade(grade.grade)}
              className={`transition-all duration-300 ${selectedGrade === grade.grade ? 'ring-2 ring-brand-primary ring-offset-2' : ''}`}
            >
              Grade {grade.grade}
            </LiquidGlassButton>
          ))}
        </div>

        {/* Selected Grade Overview */}
        <LiquidGlassCard className="mb-12">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${selectedGradeData.color} text-white font-bold text-lg mb-4`}>
                {selectedGradeData.title}
              </div>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👶</span>
                  <span>Age: {selectedGradeData.ageRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <span>Focus: {selectedGradeData.focus}</span>
                </div>
              </div>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {selectedGradeData.subjects.map((subject, index) => (
            <LiquidGlassCard key={index} className="h-full">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-r ${selectedGradeData.color} rounded-full flex items-center justify-center text-2xl`}>
                    {subject.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">{subject.name}</h3>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3">📚 Learning Topics</h4>
                  <ul className="space-y-2">
                    {subject.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-2 text-text-secondary">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-3">🎯 Autism-Specific Adaptations</h4>
                  <ul className="space-y-2">
                    {subject.adaptations.map((adaptation, adaptIndex) => (
                      <li key={adaptIndex} className="flex items-start gap-2 text-text-secondary">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span>{adaptation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* Key Features */}
        <LiquidGlassCard className="mb-12">
          <div className="p-8">
            <h3 className="text-3xl font-bold text-text-primary mb-8 text-center">
              🌟 Our Unique Approach
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h4 className="font-bold text-text-primary mb-2">Neurodiversity-Affirming</h4>
                <p className="text-sm text-text-secondary">Celebrates unique thinking patterns and learning styles</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-bold text-text-primary mb-2">AI-Powered Adaptation</h4>
                <p className="text-sm text-text-secondary">Real-time curriculum adjustment based on individual progress</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-bold text-text-primary mb-2">Multi-Sensory Learning</h4>
                <p className="text-sm text-text-secondary">Engages visual, auditory, and tactile learning preferences</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="font-bold text-text-primary mb-2">Social Skills Integration</h4>
                <p className="text-sm text-text-secondary">Builds communication and interaction skills naturally</p>
              </div>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Call to Action */}
        <div className="text-center">
          <LiquidGlassCard className="inline-block">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-text-primary mb-4">Ready to Start Learning?</h3>
              <p className="text-text-secondary mb-6 max-w-md">
                Discover how our autism-focused curriculum can unlock your child's potential
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LiquidGlassButton 
                  variant="primary" 
                  size="medium"
                  onClick={() => navigate('/contact')}
                >
                  Get Started Today
                </LiquidGlassButton>
                <LiquidGlassButton 
                  variant="secondary" 
                  size="medium"
                  onClick={() => navigate('/pricing')}
                >
                  View Pricing
                </LiquidGlassButton>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;
