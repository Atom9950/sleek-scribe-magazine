import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Email template for newsletter confirmation
const getNewsletterConfirmationTemplate = (email: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #1a1a1a; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Welcome!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Thank you for subscribing to our newsletter!
              </p>
              
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                We're excited to have you join our community. You'll now receive our latest updates, articles, and exclusive content directly in your inbox.
              </p>
              
              <p style="margin: 0 0 30px; color: #666666; font-size: 14px; line-height: 1.6;">
                If you didn't subscribe to this newsletter, you can safely ignore this email.
              </p>
              
              <div style="margin: 30px 0; padding: 20px; background-color: #f9f9f9; border-radius: 4px; border-left: 4px solid #1a1a1a;">
                <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
                  <strong>Subscribed email:</strong><br>
                  <span style="color: #666666;">${email}</span>
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; text-align: center; background-color: #f9f9f9; border-radius: 0 0 8px 8px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px; color: #666666; font-size: 12px;">
                You can unsubscribe at any time by clicking the link in our emails.
              </p>
              <p style="margin: 0; color: #999999; font-size: 11px;">
                © ${new Date().getFullYear()} Sleek Scribe Magazine. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is not configured');
    return response.status(500).json({ 
      error: 'Email service is not configured. Please set RESEND_API_KEY environment variable.' 
    });
  }

  // Get email from request body
  const { email } = request.body;

  // Validate email
  if (!email || typeof email !== 'string') {
    return response.status(400).json({ error: 'Email is required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return response.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Initialize Resend inside the handler to ensure env vars are available
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Get the "from" email from environment variable or use a default
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = email.trim().toLowerCase();
    
    console.log('📧 Attempting to send email from:', fromEmail, 'to:', toEmail);
    
    // Send email using Resend
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: 'Welcome to Our Newsletter! 🎉',
      html: getNewsletterConfirmationTemplate(email.trim()),
    });

    // Resend returns { data, error } structure
    if (result.error) {
      console.error('❌ Resend API error:', JSON.stringify(result.error, null, 2));
      return response.status(500).json({ 
        error: 'Failed to send email',
        details: result.error.message || 'Unknown Resend API error'
      });
    }

    console.log('✅ Email sent successfully! Message ID:', result.data?.id);
    return response.status(200).json({ 
      success: true, 
      messageId: result.data?.id 
    });
  } catch (error: any) {
    console.error('❌ Unexpected error sending email:', error);
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    
    return response.status(500).json({ 
      error: 'Failed to send email',
      details: error?.message || 'Unknown error occurred'
    });
  }
}

