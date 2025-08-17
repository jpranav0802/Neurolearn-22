import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeuroLearnAssessment, { LearnerProfile, RawAssessmentData } from '../components/NeuroLearnAssessment';

// Simple reaction-time tap test: circle changes color after random delay; user taps asap
const AssessmentTest: React.FC = () => {
  const navigate = useNavigate();
  const onComplete = (profile: LearnerProfile, raw: RawAssessmentData) => {
    try {
      localStorage.setItem('assessment.profile', JSON.stringify(profile));
      localStorage.setItem('assessment.raw', JSON.stringify(raw));
      // optional small reward for completion
      const basePoints = 50;
      const currentTotal = parseInt(localStorage.getItem('rewards.totalPoints') || '0', 10);
      localStorage.setItem('rewards.totalPoints', String(currentTotal + basePoints));
      const activitiesRaw = localStorage.getItem('rewards.activities');
      const activities = activitiesRaw ? JSON.parse(activitiesRaw) : [];
      activities.unshift({ title: 'Cognitive Profile Completed', date: Date.now(), points: basePoints });
      localStorage.setItem('rewards.activities', JSON.stringify(activities.slice(0, 10)));
    } catch {}
    navigate('/assessment/results');
  };

  return (
    <NeuroLearnAssessment onComplete={onComplete} />
  );
};

export default AssessmentTest;


