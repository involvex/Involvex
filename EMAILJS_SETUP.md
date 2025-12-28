# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to enable real email sending from the contact form in your portfolio.

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from the frontend without needing a backend server. Perfect for static websites and portfolios!

## Setup Instructions

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service

1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the authentication steps to connect your email account
5. **Note down the Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template structure:

```
Subject: New Portfolio Contact from {{from_name}}

Hi Involvex,

You have received a new message from your portfolio contact form:

👤 Contact Details:
   • Name: {{from_name}}
   • Email: {{from_email}}
   • Discord: {{discord_name}}

📝 Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. **Note down the Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Copy your **"Public Key"** (e.g., `user_def456`)

### Step 5: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and replace the placeholder values:
   ```env
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
   VITE_EMAILJS_PUBLIC_KEY=user_def456
   ```

### Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to the contact section of your portfolio
3. Fill out the form and submit
4. Check your email for the test message

## Free Plan Limits

EmailJS free plan includes:
- 200 emails per month
- 50 emails per day
- Unlimited email templates

## Troubleshooting

### Common Issues

1. **"Failed to send message" error**
   - Check that your environment variables are correctly set
   - Verify your email service is properly connected
   - Ensure your template ID is correct

2. **Template variables not working**
   - Make sure your template uses the exact variable names: `{{from_name}}`, `{{from_email}}`, `{{discord_name}}`, `{{message}}`
   - Check that the template is saved and published

3. **Authentication issues**
   - Reconnect your email service in the EmailJS dashboard
   - Check if your email provider requires app-specific passwords

### Debug Mode

To enable debug logging, add this to your `.env` file:
```env
VITE_EMAILJS_DEBUG=true
```

## Alternative Email Services

If you prefer not to use EmailJS, consider these alternatives:

1. **Formspree**: Simple form handling service
2. **Netlify Forms**: If deploying to Netlify
3. **Getform**: Another form backend service
4. **Direct SMTP**: Using nodemailer with a backend

## Security Notes

- Never expose your EmailJS private keys (only public keys are safe for frontend)
- The free plan has rate limiting to prevent abuse
- Consider implementing CAPTCHA for production use
- Monitor your email sending to stay within limits

## Support

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)
- [Vue.js Contact Form Tutorial](https://www.emailjs.com/docs/vuejs-contact-form/)

---

**Note**: This setup enables real email sending from your portfolio. Make sure to test thoroughly and monitor your usage to stay within the free plan limits.