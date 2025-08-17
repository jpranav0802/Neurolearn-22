import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import LiquidGlassCard from '../components/LiquidGlassCard';
import LiquidGlassButton from '../components/LiquidGlassButton';
import { useNavigate } from 'react-router-dom';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    childAge: '',
    inquiryType: '',
    message: '',
    preferredContact: 'email'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1) Try EmailJS if env keys are present
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      const templateParams: Record<string, string> = {
        to_email: 'jpranav08@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        child_age: formData.childAge,
        inquiry_type: formData.inquiryType,
        preferred_contact: formData.preferredContact,
        message: formData.message,
      };

      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, templateParams, { publicKey });
        setSubmitStatus('success');
      } else {
        // 2) Fallback: FormSubmit (no signup). First-time usage may require a confirmation from inbox.
        const res = await fetch('https://formsubmit.co/ajax/jpranav08@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `NeuroLearn Inquiry - ${formData.inquiryType || 'General'}`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            organization: formData.organization,
            childAge: formData.childAge,
            preferredContact: formData.preferredContact,
            message: formData.message,
          }),
        });
        if (!res.ok) throw new Error('Email send failed');
        setSubmitStatus('success');
      }

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        childAge: '',
        inquiryType: '',
        message: '',
        preferredContact: 'email'
      });
    } catch (err) {
      console.error('Contact submission failed:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-primary">Contact Us</h1>
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
              Let's Start the Conversation
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            We're here to help you discover how NeuroLearn can support your child's unique learning journey. 
            Reach out to us and let's create something amazing together!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <LiquidGlassCard>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">Send us a Message</h3>
                    <p className="text-text-secondary">We'll respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Organization Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-text-primary mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-sm font-semibold text-text-primary mb-2">
                        School/Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        placeholder="School or organization name"
                      />
                    </div>
                  </div>

                  {/* Child Age and Inquiry Type Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="childAge" className="block text-sm font-semibold text-text-primary mb-2">
                        Child's Age/Grade
                      </label>
                      <select
                        id="childAge"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      >
                        <option value="">Select age/grade</option>
                        <option value="grade1">Grade 1 (6-7 years)</option>
                        <option value="grade2">Grade 2 (7-8 years)</option>
                        <option value="grade3">Grade 3 (8-9 years)</option>
                        <option value="grade4">Grade 4 (9-10 years)</option>
                        <option value="grade5">Grade 5 (10-11 years)</option>
                        <option value="multiple">Multiple children</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-semibold text-text-primary mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        required
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      >
                        <option value="">Select inquiry type</option>
                        <option value="trial">Start Free Trial</option>
                        <option value="demo">Schedule Demo</option>
                        <option value="pricing">Pricing Information</option>
                        <option value="school">School Partnership</option>
                        <option value="support">Technical Support</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-3">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
                        />
                        <span className="ml-2 text-text-secondary">📧 Email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
                        />
                        <span className="ml-2 text-text-secondary">📞 Phone</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="both"
                          checked={formData.preferredContact === 'both'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
                        />
                        <span className="ml-2 text-text-secondary">📱 Either</span>
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm resize-vertical"
                      placeholder="Tell us about your child's learning needs, your questions about NeuroLearn, or how we can help you..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <LiquidGlassButton
                      type="submit"
                      variant="primary"
                      size="large"
                      disabled={isSubmitting}
                      className="w-full md:w-auto min-w-[200px]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <span>🚀</span>
                          Send Message
                        </span>
                      )}
                    </LiquidGlassButton>
                  </div>

                  {/* Submission Status */}
                  {submitStatus === 'success' && (
                    <p className="text-green-700 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                      Thank you! Your message has been sent to <strong>jpranav08@gmail.com</strong>. We will reply within 24 hours.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                      Sorry, we couldn’t send your message right now. Please try again, or email us directly at <strong>jpranav08@gmail.com</strong>.
                    </p>
                  )}
                </form>
              </div>
            </LiquidGlassCard>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <LiquidGlassCard>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">📞 Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-lg">📧</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Email</p>
                      <p className="text-sm text-brand-primary">jpranav08@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-lg">⏰</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Response Time</p>
                      <p className="text-sm text-text-secondary">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-lg">🎯</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Support Hours</p>
                      <p className="text-sm text-text-secondary">24/7 for urgent matters</p>
                    </div>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>

            {/* What to Expect */}
            <LiquidGlassCard>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">✨ What to Expect</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">1.</span>
                    <p className="text-sm text-text-secondary">We'll review your inquiry within 24 hours</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">2.</span>
                    <p className="text-sm text-text-secondary">A team member will reach out personally</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">3.</span>
                    <p className="text-sm text-text-secondary">We'll schedule a demo or trial setup</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">4.</span>
                    <p className="text-sm text-text-secondary">Start your child's learning journey!</p>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>

            {/* Emergency Support */}
            <LiquidGlassCard>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">🚨 Need Immediate Help?</h3>
                <p className="text-sm text-text-secondary mb-4">
                  For urgent technical support or crisis intervention resources, we're here 24/7.
                </p>
                <LiquidGlassButton
                  variant="secondary"
                  size="small"
                  className="w-full"
                  onClick={() => alert('Emergency support will be available soon! For now, please use the contact form or email us directly.')}
                >
                  Emergency Support
                </LiquidGlassButton>
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
