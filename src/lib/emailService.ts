// Email service for sending newsletter confirmation emails via Resend
// This is called from a serverless function to keep API keys secure

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// This function will be called from the Vercel serverless function
export const sendNewsletterConfirmationEmail = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('📧 Attempting to send confirmation email to:', email);
    
    const response = await fetch('/api/send-newsletter-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    console.log('📧 Email API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to send email' }));
      console.error('📧 Email API error response:', errorData);
      const errorMessage = errorData.error || errorData.details || 'Failed to send email';
      return { success: false, error: errorMessage };
    }

    const result = await response.json().catch(() => ({}));
    console.log('📧 Email sent successfully:', result);
    return { success: true };
  } catch (error: any) {
    console.error('📧 Error sending email (network/fetch error):', error);
    return { success: false, error: error.message || 'Failed to send email' };
  }
};

// Email template for newsletter confirmation
export const getNewsletterConfirmationTemplate = (email: string): string => {
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

