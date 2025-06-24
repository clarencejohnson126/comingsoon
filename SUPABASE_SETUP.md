# Supabase Setup for Rebelz AI Coming Soon Page

## 🚀 Quick Setup

### 1. **Database Schema Setup**
1. Go to your Supabase dashboard: https://app.supabase.com
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL to create tables and policies

### 2. **Verify Tables Created**
Check that these tables exist in your database:
- `blacklist_signups` - Stores email signups
- `analytics_events` - Tracks user interactions

### 3. **Test the Connection**
1. Start the development server: `npm run dev`
2. Click "Get Blacklisted" button
3. Enter an email and submit
4. Check your Supabase dashboard to see the data

## 🔧 **Features Enabled**

### **Email Collection**
- ✅ Real-time email signup with validation
- ✅ Duplicate email prevention
- ✅ User-friendly success/error messages
- ✅ Loading states and form handling

### **Live Analytics**
- ✅ Page view tracking
- ✅ Button click tracking
- ✅ Signup conversion tracking
- ✅ Real-time blacklist counter updates

### **Real-time Updates**
- ✅ Live counter updates when new signups occur
- ✅ WebSocket connection for instant updates
- ✅ Automatic reconnection handling

## 📊 **Database Tables**

### `blacklist_signups`
```sql
id          UUID (Primary Key)
email       VARCHAR(255) UNIQUE
created_at  TIMESTAMP
ip_address  INET
user_agent  TEXT
referrer    TEXT
```

### `analytics_events` 
```sql
id          UUID (Primary Key)
event_type  VARCHAR(100)
event_data  JSONB
session_id  VARCHAR(255)
user_id     UUID
created_at  TIMESTAMP
```

## 🔐 **Security Features**

- **Row Level Security (RLS)** enabled
- **Email validation** on client and database level
- **Rate limiting** through Supabase
- **Anonymous access** for signups only
- **No sensitive data exposure**

## 📈 **Analytics Events Tracked**

1. **`page_view`** - When user visits the page
2. **`blacklist_button_click`** - When "Get Blacklisted" is clicked  
3. **`blacklist_signup`** - When email signup is completed

## 🎯 **API Functions Available**

```typescript
// Add email to blacklist
supabaseHelpers.addToBlacklist(email, metadata)

// Get current signup count
supabaseHelpers.getBlacklistCount()

// Check if email already exists
supabaseHelpers.checkEmailExists(email)

// Track custom events
supabaseHelpers.trackEvent(eventType, eventData)

// Get recent signups
supabaseHelpers.getRecentSignups(limit)
```

## 🔄 **Real-time Subscription**

```typescript
// Subscribe to live updates
const subscription = subscribeToBlacklistChanges((newCount) => {
  setBlacklistCount(newCount);
});

// Cleanup
subscription.unsubscribe();
```

## 🚨 **Important Security Notes**

1. **Anon Key**: Safe to expose in client-side code
2. **Service Role Key**: Keep secret, don't use in frontend
3. **RLS Policies**: Configured to allow only necessary operations
4. **Email Validation**: Both client and server-side validation

## 🐛 **Troubleshooting**

### Connection Issues
- Verify Supabase URL and anon key are correct
- Check network connectivity
- Ensure RLS policies are properly configured

### No Real-time Updates
- Verify real-time is enabled for `blacklist_signups` table
- Check browser console for WebSocket errors
- Ensure table publication is added to `supabase_realtime`

### Email Not Saving
- Check RLS policies allow INSERT for anon users
- Verify email format validation
- Check Supabase logs for errors

## 📱 **Current Configuration**

- **Supabase URL**: `https://eoahpwciwttfavzpqfnz.supabase.co`
- **Tables**: `blacklist_signups`, `analytics_events`
- **Real-time**: Enabled for live counter updates
- **Auth**: Anonymous access for signups

## 🎉 **Ready to Launch!**

Your coming soon page is now connected to Supabase with:
- ✅ Live email collection
- ✅ Real-time counter updates  
- ✅ Analytics tracking
- ✅ Secure data handling

Check your Supabase dashboard to see signups rolling in! 🔥