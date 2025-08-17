import React, { useState } from 'react';
import LiquidGlassButton from './LiquidGlassButton';
import LiquidGlassCard from './LiquidGlassCard';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
    const { login, register } = useAuth();
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        role: 'parent' as 'student' | 'parent' | 'teacher' | 'therapist'
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        // Signup specific validations
        if (mode === 'signup') {
            if (!formData.firstName) {
                newErrors.firstName = 'First name is required';
            }
            if (!formData.lastName) {
                newErrors.lastName = 'Last name is required';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            if (mode === 'login') {
                await login(formData.email, formData.password);
            } else {
                await register({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    role: formData.role,
                });
            }

            // Reset form and close modal on success
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                role: 'parent',
            });
            onClose();
        } catch (error) {
            setErrors({ submit: error instanceof Error ? error.message : 'Authentication failed' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-md mx-4">
                <LiquidGlassCard className="relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-text-primary mb-2">
                                {mode === 'login' ? 'Welcome Back' : 'Join NeuroLearn'}
                            </h2>
                            <p className="text-text-secondary">
                                {mode === 'login'
                                    ? 'Sign in to continue your learning journey'
                                    : 'Create an account to start personalized learning'
                                }
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* First Name & Last Name (Signup only) */}
                            {mode === 'signup' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white/80"
                                            placeholder="Enter your first name"
                                        />
                                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white/80"
                                            placeholder="Enter your last name"
                                        />
                                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Role Selection (Signup only) */}
                            {mode === 'signup' && (
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-text-primary mb-1">
                                        I am a...
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white/80"
                                    >
                                        <option value="parent">Parent/Guardian</option>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="therapist">Therapist</option>
                                    </select>
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white/80"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white/80"
                                    placeholder="Enter your password"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            {/* Confirm Password (Signup only) */}
                            {mode === 'signup' && (
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white/80"
                                        placeholder="Confirm your password"
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                </div>
                            )}

                            {/* Submit Error */}
                            {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}

                            {/* Submit Button */}
                            <LiquidGlassButton
                                type="submit"
                                variant="primary"
                                size="medium"
                                className="w-full mt-6"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                            </LiquidGlassButton>
                        </form>

                        {/* Mode Switch */}
                        <div className="mt-6 text-center">
                            <p className="text-text-secondary">
                                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    type="button"
                                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                    className="text-brand-primary font-semibold hover:underline focus:underline focus:outline-none"
                                >
                                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>
                    </div>
                </LiquidGlassCard>
            </div>
        </div>
    );
};

export default AuthModal;
