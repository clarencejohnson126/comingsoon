# 🔧 Add Resend API Key to Supabase

## Step-by-Step Instructions

### **1. Go to Supabase Dashboard**
1. Open https://app.supabase.com
2. Select your project: `eoahpwciwttfavzpqfnz.supabase.co`

### **2. Navigate to Edge Functions Settings**
1. Click **"Settings"** in the left sidebar
2. Click **"Edge Functions"** 
3. Click **"Environment Variables"** tab

### **3. Add Environment Variables**

Click **"Add Variable"** for each of these:

#### **Variable 1: RESEND_API_KEY**
- **Name**: `RESEND_API_KEY`
- **Value**: `re_Qjhp7tA8_65i3BQcdUMHfNZytVWC7PJPi`
- Click **"Save"**

#### **Variable 2: SUPABASE_URL**
- **Name**: `SUPABASE_URL`
- **Value**: `https://eoahpwciwttfavzpqfnz.supabase.co`
- Click **"Save"**

#### **Variable 3: SUPABASE_SERVICE_ROLE_KEY**
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Get this from **Settings** → **API** → **Service Role Key** (starts with `eyJ...`)
- Click **"Save"**

### **4. Deploy Edge Function**

Open terminal and run:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref eoahpwciwttfavzpqfnz

# Deploy the email function
supabase functions deploy send-emails
```

### **5. Test the Setup**

```bash
# Run the test script
npm run test:email
```

## 🎯 **Quick Visual Guide**

```
Supabase Dashboard → Settings → Edge Functions → Environment Variables

┌─────────────────────────────────────────────┐
│ Environment Variables                       │
├─────────────────────────────────────────────┤
│ Name: RESEND_API_KEY                       │
│ Value: re_Qjhp7tA8_65i3BQcdUMHfNZytVWC7PJPi │
│ [Save]                                      │
├─────────────────────────────────────────────┤
│ Name: SUPABASE_URL                         │
│ Value: https://eoahpwciwttfavzpqfnz.supabase.co │
│ [Save]                                      │
├─────────────────────────────────────────────┤
│ Name: SUPABASE_SERVICE_ROLE_KEY            │
│ Value: eyJ... (your service role key)      │
│ [Save]                                      │
└─────────────────────────────────────────────┘
```

## ✅ **Verification Checklist**

After adding the environment variables:

- [ ] RESEND_API_KEY added with correct value
- [ ] SUPABASE_URL added 
- [ ] SUPABASE_SERVICE_ROLE_KEY added
- [ ] Edge function deployed successfully
- [ ] Test script runs without errors
- [ ] User confirmation emails working
- [ ] Admin notifications working

## 🚨 **Important Notes**

1. **Service Role Key**: Found in Settings → API → Service Role (secret key)
2. **Environment Variables**: Only apply to Edge Functions, not your React app
3. **Local Testing**: Use `.env.local` for local development
4. **Security**: Never commit API keys to version control

## 🔄 **If Something Goes Wrong**

### **Edge Function Not Working**
```bash
# Check function logs
supabase functions serve --debug

# Or check in dashboard
supabase.com → Edge Functions → Logs
```

### **Emails Not Sending**
1. Verify Resend API key is correct
2. Check if domain is verified in Resend
3. Look at Edge Function logs for errors

### **Environment Variables Not Loading**
1. Make sure variables are saved in Supabase dashboard
2. Redeploy the function after adding variables
3. Check variable names are exactly correct (case-sensitive)

## 🎉 **You're Done!**

Once you've added these environment variables and deployed the function, your email workflow will be fully operational! 

Test it by going to your coming soon page and signing up! 🚀