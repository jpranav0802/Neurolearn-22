# Contributing to NeuroLearn

Thank you for your interest in contributing to NeuroLearn! This project aims to create an inclusive, accessible educational platform for neurodiverse students, particularly those on the autism spectrum.

## 🎯 Project Mission

NeuroLearn is building a more inclusive future for neurodiverse learners through AI-powered personalization, accessibility-first design, and comprehensive stakeholder support.

## 🏗️ Development Principles

### 1. Accessibility First
- **WCAG 2.1 AA minimum, AAA preferred** compliance
- Keyboard navigation support for all features
- Screen reader compatibility
- High contrast visual design
- Sensory customization options

### 2. Privacy by Design
- **COPPA compliance** for users under 13
- **FERPA compliance** for educational records
- End-to-end encryption for all PII
- Comprehensive audit logging
- Granular consent management

### 3. Neurodiverse-Friendly Development
- Clear, predictable code patterns
- Comprehensive documentation
- Sensory-friendly development environment
- Inclusive language and terminology

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Docker and Docker Compose
- PostgreSQL 14+
- Redis 6+

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/neurolearn.git
cd neurolearn

# Copy environment variables
cp env.example .env

# Install dependencies
npm run install:all

# Start development environment
docker-compose up -d

# Run database migrations
npm run db:migrate

# Start all services
npm run dev
```

## 📋 Contribution Guidelines

### Code Standards

#### TypeScript/JavaScript
```typescript
// ✅ Good - Clear, accessible code
interface StudentLearningProfile {
  readonly id: string;
  readonly studentId: string;
  learningStyles: {
    primary: 'visual' | 'auditory' | 'kinesthetic' | 'multimodal';
    effectiveness: Record<string, number>;
  };
}

// ❌ Bad - Unclear abbreviations
interface SLP {
  id: string;
  sid: string;
  ls: any;
}
```

#### Accessibility Requirements
```tsx
// ✅ Good - Full accessibility
<button 
  aria-label="Start math lesson about shapes"
  aria-describedby="lesson-description"
  onClick={startLesson}
>
  Start Lesson
</button>

// ❌ Bad - No accessibility
<div onClick={startLesson}>Start</div>
```

#### Privacy & Security
```typescript
// ✅ Good - Encrypted PII
const encryptedName = encryptPII(student.firstName);
await auditLog({
  action: 'student_data_access',
  userId: req.user.id,
  // ... full audit trail
});

// ❌ Bad - Plain text PII
const name = student.firstName; // Never store unencrypted
// No audit logging
```

### Testing Requirements

All contributions must include:

1. **Unit Tests**: Minimum 80% coverage
2. **Accessibility Tests**: Automated WCAG compliance testing
3. **Integration Tests**: API and service integration
4. **Security Tests**: PII handling and audit logging
5. **Educational Tests**: Learning flow validation

```typescript
// Example accessibility test
describe('LessonCard Accessibility', () => {
  it('meets WCAG 2.1 AA standards', async () => {
    const { container } = render(<LessonCard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Commit Message Format

Use conventional commits with educational context:

```
type(scope): description

Examples:
feat(student-app): add sensory customization controls
fix(auth): resolve COPPA parental consent validation
docs(api): update educational data privacy guidelines
test(accessibility): add keyboard navigation tests
security(encryption): enhance PII protection
compliance(ferpa): implement audit log retention
```

### Pull Request Process

1. **Fork the repository** and create a feature branch
2. **Follow coding standards** and accessibility guidelines
3. **Add comprehensive tests** including accessibility tests
4. **Update documentation** if needed
5. **Ensure CI passes** all checks
6. **Request review** from maintainers

#### PR Template
```markdown
## Description
Brief description of changes and educational impact

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature requiring API changes)
- [ ] Documentation update
- [ ] Accessibility improvement
- [ ] Security/privacy enhancement

## Accessibility Checklist
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified
- [ ] WCAG 2.1 AA compliance validated
- [ ] Color contrast meets requirements
- [ ] Focus indicators are clear

## Educational Impact
- [ ] Benefits neurodiverse learners
- [ ] Maintains COPPA/FERPA compliance
- [ ] Supports multi-stakeholder needs
- [ ] Includes proper audit logging

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Accessibility tests included
- [ ] Manual testing completed

## Security Review
- [ ] No PII exposed in logs
- [ ] Proper encryption implemented
- [ ] Audit logging included
- [ ] Access controls validated
```

## 🎨 UI/UX Contributions

### Design Principles
- **Sensory-friendly**: Avoid overstimulation
- **Predictable**: Consistent navigation and patterns
- **Customizable**: User-controlled preferences
- **Clear**: High contrast, legible fonts
- **Calming**: Thoughtful color choices and animations

### Accessibility Requirements
- Minimum 4.5:1 color contrast ratio
- Keyboard navigation for all interactions
- Screen reader compatible
- Reduced motion options
- Clear focus indicators

## 🔒 Security & Privacy

### Required Practices
- **Never commit secrets** or API keys
- **Encrypt all PII** before database storage
- **Log all data access** for compliance
- **Validate all inputs** to prevent injection
- **Use secure headers** and HTTPS

### Compliance Requirements
- All educational data access must be audited
- Parental consent required for users under 13
- Data retention policies must be enforced
- Privacy-by-design principles followed

## 🤝 Community Guidelines

### Inclusive Environment
- Use inclusive, person-first language
- Respect neurodiverse perspectives
- Welcome all skill levels and backgrounds
- Provide constructive, helpful feedback

### Communication
- **Issues**: Use clear, descriptive titles
- **Discussions**: Stay focused on educational goals
- **Code Reviews**: Be respectful and constructive
- **Documentation**: Use accessible language

## 📚 Educational Focus Areas

We especially welcome contributions in:
- **Autism-specific learning adaptations**
- **Multi-modal content delivery**
- **Emotional regulation support**
- **Sensory processing accommodations**
- **Communication and social skills**
- **Executive function supports**

## ❓ Questions or Help?

- **Documentation**: Check `/docs` directory
- **Issues**: Search existing issues first
- **Discussions**: Use GitHub Discussions for questions
- **Security**: Email security@neurolearn.edu for vulnerabilities

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Together, we're building a more inclusive future for neurodiverse learners.** 🌟
