import nodemailer from 'nodemailer';
import { logger } from './logger';

// Email transporter configuration
const createTransporter = () => {
    if (process.env.NODE_ENV === 'production') {
        // Production email configuration
        return nodemailer.createTransporter({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    } else {
        // Development: Use Ethereal Email for testing
        return nodemailer.createTransporter({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'ethereal.user@ethereal.email',
                pass: 'ethereal.pass'
            }
        });
    }
};

const transporter = createTransporter();

// Verify email configuration on startup
transporter.verify((error, success) => {
    if (error) {
        logger.error('Email configuration error', { error });
    } else {
        logger.info('Email server is ready to send messages');
    }
});

/**
 * Send email verification message to new users
 */
export async function sendVerificationEmail(
    email: string,
    verificationToken: string,
    firstName: string
): Promise<void> {
    try {
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

        const mailOptions = {
            from: process.env.FROM_EMAIL || 'NeuroLearn <noreply@neurolearn.edu>',
            to: email,
            subject: 'Welcome to NeuroLearn - Please Verify Your Email',
            html: generateVerificationEmailHTML(firstName, verificationUrl),
            text: generateVerificationEmailText(firstName, verificationUrl)
        };

        const info = await transporter.sendMail(mailOptions);

        logger.info('Verification email sent', {
            messageId: info.messageId,
            email,
            firstName
        });

        // Log preview URL for development
        if (process.env.NODE_ENV !== 'production') {
            logger.info('Email preview URL', {
                url: nodemailer.getTestMessageUrl(info)
            });
        }

    } catch (error) {
        logger.error('Failed to send verification email', {
            error,
            email,
            firstName
        });
        throw new Error('Failed to send verification email');
    }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
    email: string,
    resetToken: string,
    firstName: string
): Promise<void> {
    try {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: process.env.FROM_EMAIL || 'NeuroLearn <noreply@neurolearn.edu>',
            to: email,
            subject: 'NeuroLearn Password Reset Request',
            html: generatePasswordResetEmailHTML(firstName, resetUrl),
            text: generatePasswordResetEmailText(firstName, resetUrl)
        };

        const info = await transporter.sendMail(mailOptions);

        logger.info('Password reset email sent', {
            messageId: info.messageId,
            email,
            firstName
        });

    } catch (error) {
        logger.error('Failed to send password reset email', {
            error,
            email,
            firstName
        });
        throw new Error('Failed to send password reset email');
    }
}

/**
 * Send parental consent email for COPPA compliance
 */
export async function sendParentalConsentEmail(
    parentEmail: string,
    consentToken: string,
    childFirstName: string
): Promise<void> {
    try {
        const consentUrl = `${process.env.FRONTEND_URL}/parental-consent?token=${consentToken}`;

        const mailOptions = {
            from: process.env.FROM_EMAIL || 'NeuroLearn <noreply@neurolearn.edu>',
            to: parentEmail,
            subject: `Parental Consent Required for ${childFirstName}'s NeuroLearn Account`,
            html: generateParentalConsentEmailHTML(childFirstName, consentUrl),
            text: generateParentalConsentEmailText(childFirstName, consentUrl)
        };

        const info = await transporter.sendMail(mailOptions);

        logger.info('Parental consent email sent', {
            messageId: info.messageId,
            parentEmail,
            childFirstName
        });

    } catch (error) {
        logger.error('Failed to send parental consent email', {
            error,
            parentEmail,
            childFirstName
        });
        throw new Error('Failed to send parental consent email');
    }
}

/**
 * Generate HTML template for email verification
 */
function generateVerificationEmailHTML(firstName: string, verificationUrl: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to NeuroLearn</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #F4B942, #A8B5A0); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #F4B942; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 14px; }
            .accessibility-note { background: #e8f4f8; padding: 15px; border-left: 4px solid #F4B942; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🌟 Welcome to NeuroLearn!</h1>
                <p>Your journey to personalized learning begins here</p>
            </div>
            <div class="content">
                <h2>Hi ${firstName}!</h2>
                <p>Thank you for joining NeuroLearn, the AI-powered educational platform designed specifically for neurodiverse learners.</p>
                
                <p>To complete your registration and start your learning journey, please verify your email address by clicking the button below:</p>
                
                <div style="text-align: center;">
                    <a href="${verificationUrl}" class="button">Verify Email Address</a>
                </div>
                
                <div class="accessibility-note">
                    <strong>🎯 Accessibility First:</strong> NeuroLearn is designed with accessibility and sensory-friendly features from the ground up. You'll be able to customize your learning environment to match your preferences once you're signed in.
                </div>
                
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px;">${verificationUrl}</p>
                
                <p>This verification link will expire in 24 hours for your security.</p>
                
                <p>Welcome to the NeuroLearn family!</p>
                <p><strong>The NeuroLearn Team</strong></p>
            </div>
            <div class="footer">
                <p>This email was sent to ${firstName} because you registered for a NeuroLearn account.</p>
                <p>NeuroLearn - Building a more inclusive future for neurodiverse learners</p>
                <p>© 2024 NeuroLearn. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * Generate plain text template for email verification
 */
function generateVerificationEmailText(firstName: string, verificationUrl: string): string {
    return `
Welcome to NeuroLearn!

Hi ${firstName}!

Thank you for joining NeuroLearn, the AI-powered educational platform designed specifically for neurodiverse learners.

To complete your registration and start your learning journey, please verify your email address by visiting:

${verificationUrl}

This verification link will expire in 24 hours for your security.

NeuroLearn is designed with accessibility and sensory-friendly features from the ground up. You'll be able to customize your learning environment to match your preferences once you're signed in.

Welcome to the NeuroLearn family!

The NeuroLearn Team

---
This email was sent because you registered for a NeuroLearn account.
NeuroLearn - Building a more inclusive future for neurodiverse learners
© 2024 NeuroLearn. All rights reserved.
  `;
}

/**
 * Generate HTML template for password reset
 */
function generatePasswordResetEmailHTML(firstName: string, resetUrl: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NeuroLearn Password Reset</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #D73502; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #D73502; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .security-note { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔐 Password Reset Request</h1>
            </div>
            <div class="content">
                <h2>Hi ${firstName},</h2>
                <p>We received a request to reset your NeuroLearn password. If you made this request, click the button below to create a new password:</p>
                
                <div style="text-align: center;">
                    <a href="${resetUrl}" class="button">Reset Password</a>
                </div>
                
                <div class="security-note">
                    <strong>🛡️ Security Notice:</strong> This link will expire in 1 hour for your protection. If you didn't request this reset, please ignore this email and your password will remain unchanged.
                </div>
                
                <p>If the button doesn't work, copy and paste this link:</p>
                <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px;">${resetUrl}</p>
                
                <p>For your security, this link can only be used once and will expire in 1 hour.</p>
                
                <p>Best regards,<br><strong>The NeuroLearn Security Team</strong></p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * Generate plain text template for password reset
 */
function generatePasswordResetEmailText(firstName: string, resetUrl: string): string {
    return `
Password Reset Request

Hi ${firstName},

We received a request to reset your NeuroLearn password. If you made this request, visit the following link to create a new password:

${resetUrl}

This link will expire in 1 hour for your protection. If you didn't request this reset, please ignore this email and your password will remain unchanged.

For your security, this link can only be used once.

Best regards,
The NeuroLearn Security Team
  `;
}

/**
 * Generate HTML template for parental consent
 */
function generateParentalConsentEmailHTML(childFirstName: string, consentUrl: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Parental Consent Required - NeuroLearn</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #A8B5A0; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #A8B5A0; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .coppa-notice { background: #e8f4f8; padding: 20px; border-left: 4px solid #A8B5A0; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>👨‍👩‍👧‍👦 Parental Consent Required</h1>
                <p>COPPA Compliance Notice</p>
            </div>
            <div class="content">
                <h2>Dear Parent/Guardian,</h2>
                <p>${childFirstName} has requested to create an account on NeuroLearn, our educational platform designed for neurodiverse learners.</p>
                
                <div class="coppa-notice">
                    <strong>📋 COPPA Compliance:</strong> Because ${childFirstName} is under 13 years old, federal law requires us to obtain verifiable parental consent before collecting, using, or disclosing personal information from your child.
                </div>
                
                <p>NeuroLearn is committed to:</p>
                <ul>
                    <li>🔒 Protecting your child's privacy and personal information</li>
                    <li>🎓 Providing safe, educational content appropriate for neurodiverse learners</li>
                    <li>👁️ Giving you full visibility into your child's learning progress</li>
                    <li>🛡️ Never sharing your child's information with third parties</li>
                </ul>
                
                <p>To provide consent and activate ${childFirstName}'s account, please click the button below:</p>
                
                <div style="text-align: center;">
                    <a href="${consentUrl}" class="button">Review & Provide Consent</a>
                </div>
                
                <p>This will take you to a secure page where you can:</p>
                <ul>
                    <li>Review our privacy policy and data practices</li>
                    <li>Set privacy preferences for your child</li>
                    <li>Provide verifiable parental consent</li>
                    <li>Configure communication preferences</li>
                </ul>
                
                <p>If you have any questions about NeuroLearn or this consent process, please contact us at <a href="mailto:privacy@neurolearn.edu">privacy@neurolearn.edu</a>.</p>
                
                <p>Thank you for considering NeuroLearn for ${childFirstName}'s educational journey.</p>
                
                <p>Sincerely,<br><strong>The NeuroLearn Team</strong></p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * Generate plain text template for parental consent
 */
function generateParentalConsentEmailText(childFirstName: string, consentUrl: string): string {
    return `
Parental Consent Required - COPPA Compliance Notice

Dear Parent/Guardian,

${childFirstName} has requested to create an account on NeuroLearn, our educational platform designed for neurodiverse learners.

Because ${childFirstName} is under 13 years old, federal law requires us to obtain verifiable parental consent before collecting, using, or disclosing personal information from your child.

NeuroLearn is committed to:
- Protecting your child's privacy and personal information
- Providing safe, educational content appropriate for neurodiverse learners
- Giving you full visibility into your child's learning progress
- Never sharing your child's information with third parties

To provide consent and activate ${childFirstName}'s account, please visit:

${consentUrl}

This will take you to a secure page where you can review our privacy policy, set privacy preferences, and provide verifiable parental consent.

If you have any questions, please contact us at privacy@neurolearn.edu.

Thank you for considering NeuroLearn for ${childFirstName}'s educational journey.

Sincerely,
The NeuroLearn Team
  `;
}

export { transporter };
