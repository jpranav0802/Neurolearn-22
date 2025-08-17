import React, { useState } from 'react';
import LiquidGlassCard from '../components/LiquidGlassCard';
import LiquidGlassButton from '../components/LiquidGlassButton';
import { useNavigate } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Starter",
      description: "Perfect for getting started with personalized learning",
      monthlyPrice: 29,
      yearlyPrice: 290,
      color: "from-blue-400 to-blue-600",
      popular: false,
      features: [
        "Access to Grade-specific curriculum",
        "Basic progress tracking",
        "Sensory-friendly interface",
        "Weekly progress reports",
        "Email support",
        "1 child profile",
        "Basic learning games",
        "Parent dashboard access"
      ],
      limitations: [
        "Limited AI adaptation",
        "Standard response time",
        "Basic customization"
      ]
    },
    {
      name: "Family",
      description: "Comprehensive learning for the whole family",
      monthlyPrice: 59,
      yearlyPrice: 590,
      color: "from-green-400 to-green-600",
      popular: true,
      features: [
        "Everything in Starter",
        "Advanced AI-powered adaptation",
        "Real-time progress analytics",
        "Unlimited learning activities",
        "Priority support (24/7)",
        "Up to 3 child profiles",
        "Advanced customization options",
        "Teacher collaboration tools",
        "Detailed behavioral insights",
        "Custom learning paths",
        "Video therapy sessions",
        "Offline learning modules"
      ],
      limitations: []
    },
    {
      name: "School/Institution",
      description: "Built for schools and educational institutions",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      color: "from-purple-400 to-purple-600",
      popular: false,
      features: [
        "Everything in Family",
        "Unlimited student profiles",
        "Multi-teacher dashboard",
        "Administrative controls",
        "Bulk reporting & analytics",
        "Custom curriculum integration",
        "API access for school systems",
        "Dedicated account manager",
        "On-site training sessions",
        "Custom branding options",
        "Advanced compliance features",
        "Integration with existing LMS"
      ],
      limitations: []
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return monthlyCost - yearlyCost;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-primary">Pricing Plans</h1>
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
              Choose Your Learning Journey
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
            Flexible pricing plans designed to support every family and institution in providing 
            exceptional autism-focused education.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`font-medium ${billingCycle === 'monthly' ? 'text-brand-primary' : 'text-text-secondary'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                billingCycle === 'yearly' ? 'bg-brand-primary' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium ${billingCycle === 'yearly' ? 'text-brand-primary' : 'text-text-secondary'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Save up to 20%! 🎉
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <LiquidGlassCard 
              key={index} 
              className={`relative h-full ${plan.popular ? 'ring-4 ring-brand-primary ring-opacity-50 scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    🌟 Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-block w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center text-3xl mb-4`}>
                    {index === 0 ? '🌱' : index === 1 ? '👨‍👩‍👧‍👦' : '🏫'}
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                  <p className="text-text-secondary mb-6">{plan.description}</p>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-text-primary">
                      ${getPrice(plan)}
                      <span className="text-lg font-normal text-text-secondary">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && getSavings(plan) > 0 && (
                      <div className="text-green-600 font-semibold text-sm mt-2">
                        Save ${getSavings(plan)} per year!
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="font-semibold text-text-primary mb-4">✅ What's Included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-text-secondary text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations (if any) */}
                {plan.limitations.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-semibold text-text-primary mb-4">📝 Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start gap-3">
                          <span className="text-orange-500 mt-1">•</span>
                          <span className="text-text-secondary text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <LiquidGlassButton
                  variant={plan.popular ? "primary" : "secondary"}
                  size="medium"
                  className="w-full"
                  onClick={() => {
                    console.log(`Selected ${plan.name} plan`);
                    alert(`Great choice! The ${plan.name} plan will help unlock your child's potential. Contact us to get started!`);
                  }}
                >
                  {plan.name === 'School/Institution' ? 'Contact Sales' : 'Get Started'}
                </LiquidGlassButton>

                {/* Free Trial Notice */}
                <div className="text-center mt-4">
                  <p className="text-xs text-text-secondary">
                    {plan.name !== 'School/Institution' ? '14-day free trial • No credit card required' : 'Custom onboarding • Dedicated support'}
                  </p>
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* FAQ Section */}
        <LiquidGlassCard className="mb-12">
          <div className="p-8">
            <h3 className="text-3xl font-bold text-text-primary mb-8 text-center">
              💡 Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Is there a free trial?</h4>
                <p className="text-text-secondary text-sm mb-4">
                  Yes! We offer a 14-day free trial for all individual plans. No credit card required to start.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Can I change plans anytime?</h4>
                <p className="text-text-secondary text-sm mb-4">
                  Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">What about data privacy?</h4>
                <p className="text-text-secondary text-sm mb-4">
                  We're COPPA and FERPA compliant. Your child's data is encrypted and never shared with third parties.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Do you offer discounts?</h4>
                <p className="text-text-secondary text-sm mb-4">
                  We offer financial assistance for families in need and special rates for non-profit organizations.
                </p>
              </div>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Money Back Guarantee */}
        <div className="text-center mb-12">
          <LiquidGlassCard className="inline-block">
            <div className="p-8">
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">30-Day Money-Back Guarantee</h3>
              <p className="text-text-secondary max-w-md">
                We're confident NeuroLearn will make a difference in your child's learning journey. 
                If you're not completely satisfied, we'll refund your money, no questions asked.
              </p>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <LiquidGlassCard className="inline-block">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-text-primary mb-4">Ready to Get Started?</h3>
              <p className="text-text-secondary mb-6 max-w-md">
                Join thousands of families who are already seeing amazing results with NeuroLearn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LiquidGlassButton 
                  variant="primary" 
                  size="medium"
                  onClick={() => {
                    console.log('Start free trial clicked');
                    alert('🎉 Great! Your free trial is ready to begin. Contact us to set up your account!');
                  }}
                >
                  Start Free Trial
                </LiquidGlassButton>
                <LiquidGlassButton 
                  variant="secondary" 
                  size="medium"
                  onClick={() => navigate('/contact')}
                >
                  Contact Sales
                </LiquidGlassButton>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
