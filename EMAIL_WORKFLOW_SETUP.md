# 📧 Email Workflow Setup for Rebelz AI

## 🚀 Complete Email Workflow

Your email workflow includes:
1. **User signs up** → Email saved to Supabase
2. **Confirmation email** → Sent to user with welcome message
3. **Admin notification** → Sent to `clarencejohnson@hotmail.de`
4. **Email tracking** → All email statuses tracked in database

## 📋 Setup Instructions

### **Step 1: Install Supabase CLI**
```bash
npm install -g supabase
```

### **Step 2: Login and Link Project**
```bash
supabase login
supabase link --project-ref your-project-ref
```

### **Step 3: Deploy Edge Function**
```bash
supabase functions deploy send-emails
```

### **Step 4: Set Up Email Service (Resend)**

1. **Sign up for Resend**: https://resend.com
2. **Verify your domain** (required for sending emails)
3. **Get your API key** from the Resend dashboard
4. **Set environment variables** in Supabase dashboard:

Go to **Settings** → **Edge Functions** → **Environment Variables**:

```env
RESEND_API_KEY=re_xxxxxxxxxx
SUPABASE_URL=https://eoahpwciwttfavzpqfnz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### **Step 5: Update Email Configuration**

In `supabase/functions/send-emails/index.ts`, update:
```typescript
const fromEmail = 'noreply@yourdomain.com' // Change to your verified domain
const adminEmail = 'clarencejohnson@hotmail.de' // Already set correctly
```

### **Step 6: Run Database Schema**

Execute the updated `supabase-schema.sql` in your Supabase SQL Editor.

### **Step 7: Test the Workflow**

1. Start your app: `npm run dev`
2. Go to `http://localhost:5173/`
3. Click "Get Blacklisted" and enter an email
4. Check both inboxes for emails!

## 🎨 **Email Templates**

### **User Confirmation Email**
- 🎯 **Subject**: "🔥 Welcome to Rebelz AI Underground - You're Blacklisted!"
- 🎨 **Design**: Cyberpunk theme with code blocks and orange gradients
- 📝 **Content**: Welcome message, benefits explanation, brand messaging

### **Admin Notification Email**
- 🎯 **Subject**: "🚀 New Rebelz AI Signup: user@example.com"
- 📊 **Content**: Signup details, timestamp, user agent, next steps
- 🔔 **Purpose**: Immediate notification of new signups

## 🔧 **Email Workflow Features**

### **Database Tracking**
```sql
-- New columns in blacklist_signups table:
confirmation_email_sent BOOLEAN
confirmation_email_sent_at TIMESTAMP
admin_notification_sent BOOLEAN  
admin_notification_sent_at TIMESTAMP
email_workflow_status VARCHAR(50)
```

### **Real-time Status Updates**
- ✅ Email workflow status tracked in database
- ✅ Success/failure tracking for both emails
- ✅ Analytics events for email workflow monitoring
- ✅ User feedback based on email delivery status

### **Error Handling**
- 🔄 Graceful fallback if emails fail
- 📝 Detailed error logging
- 🚫 User still gets added to blacklist even if emails fail
- 📊 Email failure tracking for debugging

## 🔐 **Security & Privacy**

- **Domain Verification**: Resend requires domain verification for sending
- **Rate Limiting**: Built into Supabase Edge Functions
- **No Spam**: Single confirmation email per signup
- **Privacy**: Only necessary data stored and tracked

## 📊 **Analytics Tracking**

New analytics events:
```javascript
'email_workflow_triggered' // When email workflow starts
'blacklist_signup' // Enhanced with email status
```

## 🎯 **Production Checklist**

- [ ] Domain verified in Resend
- [ ] Environment variables set in Supabase
- [ ] Edge Function deployed
- [ ] Database schema updated
- [ ] Email templates customized
- [ ] Test emails sent successfully
- [ ] Admin notifications working
- [ ] User confirmations working

## 🚨 **Troubleshooting**

### **Emails Not Sending**
1. Check Resend API key is correct
2. Verify domain is verified in Resend
3. Check Supabase Edge Function logs
4. Ensure CORS is properly configured

### **Admin Not Getting Notifications**
1. Check `clarencejohnson@hotmail.de` email address
2. Check spam folder
3. Verify admin email template
4. Check Edge Function logs

### **Users Not Getting Confirmations**
1. Check user's spam folder
2. Verify domain reputation
3. Test with different email providers
4. Check email template rendering

## 💰 **Cost Considerations**

- **Resend**: 3,000 free emails/month, then $20/month
- **Supabase Edge Functions**: 500K free invocations/month
- **Storage**: Minimal cost for email tracking data

## 🔄 **Email Service Alternatives**

If you prefer a different email service, update the Edge Function:

### **SendGrid**
```typescript
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  headers: { 'Authorization': `Bearer ${SENDGRID_API_KEY}` }
})
```

### **Mailgun**
```typescript
const response = await fetch('https://api.mailgun.net/v3/yourdomain.com/messages', {
  headers: { 'Authorization': `Basic ${btoa('api:' + MAILGUN_API_KEY)}` }
})
```

## 🎉 **You're All Set!**

Your complete email workflow is ready:
1. ✅ User signup with validation
2. ✅ Database storage with tracking
3. ✅ User confirmation email
4. ✅ Admin notification email
5. ✅ Real-time status updates
6. ✅ Error handling and fallbacks

Start collecting those email signups! 🔥