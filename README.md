# NeuroLearn - AI-Powered Educational Platform for Neurodiverse Students

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-00C7B7?style=for-the-badge&logo=vercel)](https://student-e5djh0yy6-jpranav0802s-projects.vercel.app)

NeuroLearn is a comprehensive educational technology platform specifically designed for children with autism spectrum disorders. Built with accessibility-first principles, the platform provides personalized learning experiences through AI-driven adaptation while maintaining strict compliance with educational privacy regulations (COPPA/FERPA).

## 🌐 Live Demo

**Student App**: [https://student-e5djh0yy6-jpranav0802s-projects.vercel.app](https://student-e5djh0yy6-jpranav0802s-projects.vercel.app)

Experience the NeuroLearn platform firsthand with our live demo. The student app showcases our accessibility-first design and sensory-friendly interface.

## 🎯 Mission

To create an inclusive, accessible, and adaptive learning environment that empowers neurodiverse students to reach their full potential through personalized AI-powered education.

## 🏗️ Architecture Overview

NeuroLearn is built as a modern microservices architecture with the following components:

### Frontend Applications
- **Student App** (`frontend/student-app/`) - Main learning interface with sensory-friendly design
- **Parent Dashboard** (`frontend/parent-dashboard/`) - Progress monitoring and communication portal
- **Educator Portal** (`frontend/educator-portal/`) - Classroom management and intervention tools
- **Shared Components** (`frontend/shared/`) - Reusable UI components and utilities

### Backend Services
- **Auth Service** (`backend/auth-service/`) - Multi-role authentication with COPPA compliance
- **Learning Engine** (`backend/learning-engine/`) - Core educational logic and progression
- **Content Service** (`backend/content-service/`) - Learning material management
- **Analytics Service** (`backend/analytics-service/`) - Progress tracking and reporting

### AI Services
- **Adaptation Engine** (`ai-services/adaptation-engine/`) - Real-time learning personalization
- **Behavior Analysis** (`ai-services/behavior-analysis/`) - Pattern recognition and intervention triggers
- **Content Generation** (`ai-services/content-generation/`) - AI-powered learning material creation

### Infrastructure
- Docker containerization for all services
- PostgreSQL for primary data storage
- Redis for real-time adaptation state
- CI/CD pipeline for safe deployments

## 🔧 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for accessibility-first styling
- **Framer Motion** for sensory-appropriate animations
- **React Query** for state management
- **Storybook** for component development

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** with Prisma ORM
- **Redis** for caching and real-time data
- **JWT** with role-based access control

### AI/ML
- **Python 3.9+** with FastAPI
- **TensorFlow/PyTorch** for ML models
- **scikit-learn** for educational analytics
- **SHAP** for explainable AI

### Infrastructure
- **Docker** and Docker Compose
- **GitHub Actions** for CI/CD
- **Monitoring** with comprehensive logging
- **SSL/TLS** encryption throughout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker and Docker Compose
- PostgreSQL 14+
- Redis 6+

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd neurolearn

# Install dependencies for all services
npm run install:all

# Set up environment variables
cp .env.example .env

# Start development environment
docker-compose up -d

# Run database migrations
npm run db:migrate

# Start all services in development mode
npm run dev
```

## 🎨 Design Principles

### Accessibility First
- **WCAG 2.1 AA** minimum compliance, **AAA** preferred
- Keyboard navigation support
- Screen reader compatibility
- High contrast visual design
- Sensory customization options

### Privacy by Design
- **COPPA compliance** for users under 13
- **FERPA compliance** for educational records
- End-to-end encryption for sensitive data
- Granular consent management
- Comprehensive audit logging

### Neurodiverse-Friendly
- Sensory preference customization
- Emotional state monitoring
- Multi-modal learning support
- Predictable, calm interface design
- Clear navigation and feedback

### AI Transparency
- Explainable AI decisions
- Human oversight capabilities
- Bias detection and prevention
- Student agency in learning process

## 📊 Key Features

### For Students
- 🎯 Personalized learning paths
- 🎨 Multi-modal content delivery
- 😌 Emotional state support
- 🎮 Interactive, engaging activities
- 🔧 Sensory customization options

### For Parents
- 📈 Real-time progress monitoring
- 💬 Direct communication with educators
- 📱 Mobile-friendly dashboard
- 📋 Detailed progress reports
- ⚙️ Child's learning preferences management

### For Educators
- 👥 Classroom management tools
- 📊 Detailed student analytics
- 🎯 Intervention planning
- 📝 Progress documentation
- 🤝 Parent communication portal

### For Therapists
- 🧠 Behavioral pattern analysis
- 📈 Therapeutic goal tracking
- 📋 Intervention recommendations
- 📊 Comprehensive assessment tools

## 🔒 Security & Compliance

- **Data Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Authentication**: Multi-factor authentication for sensitive roles
- **Authorization**: Role-based access control with fine-grained permissions
- **Audit Logging**: Complete traceability of all data access
- **Privacy Controls**: Granular consent management and data portability
- **Compliance**: Regular security audits and penetration testing

## 🧪 Testing Strategy

- **Unit Tests**: Jest and pytest for comprehensive coverage
- **Integration Tests**: API and service integration validation
- **Accessibility Tests**: Automated WCAG compliance testing
- **Performance Tests**: Load testing for concurrent users
- **User Acceptance Tests**: Testing with neurodiverse students and families

## 📈 Development Roadmap

- **Phase 1**: Foundation & Infrastructure (Weeks 1-4)
- **Phase 2**: Core Learning Platform (Weeks 5-12)
- **Phase 3**: AI Adaptation Engine (Weeks 13-20)
- **Phase 4**: Multi-Stakeholder Communication (Weeks 21-28)
- **Phase 5**: Advanced Features & AI Enhancement (Weeks 29-36)
- **Phase 6**: Testing & Quality Assurance (Weeks 37-44)
- **Phase 7**: User Acceptance & Deployment (Weeks 45-52)

## 🤝 Contributing

We welcome contributions from developers, educators, therapists, and the autism community. Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and development process.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

For support, email support@neurolearn.edu or join our community discussions.

---

**Building a more inclusive future for neurodiverse learners, one student at a time.** 🌟
