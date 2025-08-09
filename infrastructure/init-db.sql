-- NeuroLearn Database Initialization
-- This script sets up the core database structure for the NeuroLearn platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    encrypted_password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'parent', 'teacher', 'therapist', 'admin')),
    first_name_encrypted TEXT,
    last_name_encrypted TEXT,
    organization_id UUID,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    terms_accepted_at TIMESTAMP,
    privacy_policy_accepted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- Student Profiles (Core neurodiverse student data)
CREATE TABLE student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth_encrypted TEXT, -- COPPA compliance
    primary_learning_style VARCHAR(50) CHECK (primary_learning_style IN ('visual', 'auditory', 'kinesthetic', 'multimodal')),
    secondary_learning_style VARCHAR(50) CHECK (secondary_learning_style IN ('visual', 'auditory', 'kinesthetic', 'multimodal')),
    current_difficulty_level INTEGER CHECK (current_difficulty_level BETWEEN 1 AND 4), -- 1=emerging, 2=developing, 3=proficient, 4=advanced
    attention_span_minutes INTEGER,
    emotional_regulation_level INTEGER CHECK (emotional_regulation_level BETWEEN 1 AND 5),
    processing_speed DECIMAL(3,2), -- Relative to age group
    communication_level VARCHAR(50) CHECK (communication_level IN ('emerging', 'developing', 'proficient', 'advanced')),
    support_needs VARCHAR(50) CHECK (support_needs IN ('minimal', 'moderate', 'substantial', 'extensive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) -- Professional who updated the profile
);

-- Sensory Preferences (Autism-specific customizations)
CREATE TABLE sensory_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    visual_sensitivity VARCHAR(20) CHECK (visual_sensitivity IN ('low', 'typical', 'high')),
    auditory_sensitivity VARCHAR(20) CHECK (auditory_sensitivity IN ('low', 'typical', 'high')),
    tactile_sensitivity VARCHAR(20) CHECK (tactile_sensitivity IN ('low', 'typical', 'high')),
    vestibular_needs VARCHAR(20) CHECK (vestibular_needs IN ('low', 'typical', 'high')),
    proprioceptive_needs VARCHAR(20) CHECK (proprioceptive_needs IN ('low', 'typical', 'high')),
    brightness_preference DECIMAL(3,2) CHECK (brightness_preference BETWEEN 0.1 AND 1.0),
    sound_volume_preference DECIMAL(3,2) CHECK (sound_volume_preference BETWEEN 0.0 AND 1.0),
    reduce_animations BOOLEAN DEFAULT false,
    background_noise_tolerance BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning Content
CREATE TABLE learning_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subject_area VARCHAR(100) NOT NULL,
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 4),
    estimated_duration_minutes INTEGER,
    learning_objectives JSONB, -- Array of learning goals
    content_metadata JSONB, -- Flexible content structure
    accessibility_features JSONB, -- WCAG compliance features
    sensory_considerations JSONB, -- Autism-specific adaptations
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id)
);

-- Learning Sessions (Student interaction tracking)
CREATE TABLE learning_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES learning_lessons(id),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    completion_status VARCHAR(50) CHECK (completion_status IN ('started', 'in_progress', 'completed', 'abandoned')),
    performance_score DECIMAL(4,3) CHECK (performance_score BETWEEN 0 AND 1), -- 0-1 scale
    time_on_task_percentage DECIMAL(4,3) CHECK (time_on_task_percentage BETWEEN 0 AND 1),
    help_requests_count INTEGER DEFAULT 0,
    hint_usage_count INTEGER DEFAULT 0,
    break_requests_count INTEGER DEFAULT 0,
    session_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Emotional State Tracking
CREATE TABLE emotional_states (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES learning_sessions(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stress_level INTEGER CHECK (stress_level BETWEEN 1 AND 5),
    engagement_level INTEGER CHECK (engagement_level BETWEEN 1 AND 5),
    frustration_indicators JSONB, -- Array of frustration signals
    trigger_events JSONB, -- Environmental or content triggers
    intervention_suggested BOOLEAN DEFAULT false,
    intervention_type VARCHAR(100),
    effectiveness_rating INTEGER CHECK (effectiveness_rating BETWEEN 1 AND 5) -- Post-intervention rating
);

-- Learning Interactions (Detailed behavioral data)
CREATE TABLE learning_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES learning_sessions(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interaction_type VARCHAR(50) CHECK (interaction_type IN ('click', 'drag', 'type', 'speak', 'gesture', 'eye_gaze')),
    element_id VARCHAR(255), -- UI element identifier
    is_correct BOOLEAN,
    response_time_ms INTEGER,
    confidence_level DECIMAL(3,2) CHECK (confidence_level BETWEEN 0 AND 1),
    assistance_level VARCHAR(50) CHECK (assistance_level IN ('independent', 'verbal_prompt', 'visual_prompt', 'physical_prompt')),
    interaction_data JSONB -- Flexible data for different interaction types
);

-- AI Adaptations (Real-time learning adjustments)
CREATE TABLE ai_adaptations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES learning_sessions(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    trigger_type VARCHAR(50) CHECK (trigger_type IN ('performance', 'emotional_state', 'time_on_task', 'request_help', 'manual')),
    adaptation_type VARCHAR(50) CHECK (adaptation_type IN ('difficulty', 'presentation_mode', 'scaffolding', 'break', 'reinforcement')),
    before_state JSONB, -- Previous configuration
    after_state JSONB, -- New configuration
    reasoning TEXT, -- AI or human reasoning
    effectiveness_score DECIMAL(3,2), -- 0-1 scale, measured post-adaptation
    applied_by VARCHAR(50) CHECK (applied_by IN ('ai_engine', 'teacher', 'parent', 'student'))
);

-- Progress Tracking
CREATE TABLE student_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES learning_lessons(id),
    subject_area VARCHAR(100),
    skill_category VARCHAR(100),
    mastery_level DECIMAL(4,3) CHECK (mastery_level BETWEEN 0 AND 1), -- 0-1 scale
    attempts_count INTEGER DEFAULT 0,
    successful_completions INTEGER DEFAULT 0,
    average_score DECIMAL(4,3),
    trend_direction VARCHAR(20) CHECK (trend_direction IN ('improving', 'stable', 'declining')),
    last_attempt_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stakeholder Relationships (Parent-child, teacher-student, etc.)
CREATE TABLE stakeholder_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primary_user_id UUID REFERENCES users(id), -- Parent, teacher, therapist
    student_id UUID REFERENCES student_profiles(id),
    relationship_type VARCHAR(50) CHECK (relationship_type IN ('parent', 'guardian', 'teacher', 'therapist', 'support_staff')),
    permissions JSONB, -- What data they can access
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP,
    approved_by UUID REFERENCES users(id)
);

-- Communication & Messaging
CREATE TABLE communications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES users(id),
    recipient_id UUID REFERENCES users(id),
    student_id UUID REFERENCES student_profiles(id), -- Context student
    message_type VARCHAR(50) CHECK (message_type IN ('progress_update', 'concern', 'celebration', 'intervention_plan', 'general')),
    subject VARCHAR(255),
    message_content_encrypted TEXT,
    is_read BOOLEAN DEFAULT false,
    priority VARCHAR(20) CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

-- Audit Log (FERPA/COPPA compliance)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    user_role VARCHAR(50),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    student_id UUID, -- If student data was accessed
    ip_address INET,
    user_agent TEXT,
    session_id VARCHAR(255),
    data_accessed JSONB, -- Fields that were accessed
    data_modified JSONB, -- Before/after values for changes
    compliance_relevant BOOLEAN DEFAULT false,
    retention_period_days INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_student_profiles_user_id ON student_profiles(user_id);
CREATE INDEX idx_learning_sessions_student_id ON learning_sessions(student_id);
CREATE INDEX idx_learning_sessions_lesson_id ON learning_sessions(lesson_id);
CREATE INDEX idx_learning_sessions_started_at ON learning_sessions(started_at);
CREATE INDEX idx_emotional_states_session_id ON emotional_states(session_id);
CREATE INDEX idx_emotional_states_timestamp ON emotional_states(timestamp);
CREATE INDEX idx_learning_interactions_session_id ON learning_interactions(session_id);
CREATE INDEX idx_ai_adaptations_session_id ON ai_adaptations(session_id);
CREATE INDEX idx_student_progress_student_id ON student_progress(student_id);
CREATE INDEX idx_stakeholder_relationships_student_id ON stakeholder_relationships(student_id);
CREATE INDEX idx_communications_recipient_id ON communications(recipient_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_student_id ON audit_logs(student_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Triggers for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sensory_preferences_updated_at BEFORE UPDATE ON sensory_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_lessons_updated_at BEFORE UPDATE ON learning_lessons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_progress_updated_at BEFORE UPDATE ON student_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Data retention policies for COPPA compliance
-- Educational records: 7 years (FERPA requirement)
-- Behavioral data: 90 days maximum without explicit consent
-- Audit logs: 3 years minimum for compliance

COMMENT ON DATABASE neurolearn IS 'NeuroLearn - AI-powered educational platform for neurodiverse students';
COMMENT ON TABLE users IS 'Core user accounts with encrypted PII';
COMMENT ON TABLE student_profiles IS 'Detailed learning profiles for neurodiverse students';
COMMENT ON TABLE sensory_preferences IS 'Autism-specific sensory customization settings';
COMMENT ON TABLE learning_sessions IS 'Individual learning session tracking and analytics';
COMMENT ON TABLE emotional_states IS 'Real-time emotional state monitoring for intervention';
COMMENT ON TABLE ai_adaptations IS 'AI-driven learning adaptations with explainability';
COMMENT ON TABLE audit_logs IS 'Comprehensive audit trail for FERPA/COPPA compliance';
