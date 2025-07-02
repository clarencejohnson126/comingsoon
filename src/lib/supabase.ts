import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://eoahpwciwttfavzpqfnz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvYWhwd2Npd3R0ZmF2enBxZm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTg2MjUsImV4cCI6MjA2MTY5NDYyNX0.BN32BnMnUjYqgnfTb2mAizITCYKoDDyBPlr1KtLIvTo'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (you can extend these based on your actual schema)
export interface BlacklistSignup {
  id?: string
  email: string
  product_preference?: string
  created_at?: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  confirmation_email_sent?: boolean
  confirmation_email_sent_at?: string
  admin_notification_sent?: boolean
  admin_notification_sent_at?: string
  email_workflow_status?: string
}

export interface AnalyticsEvent {
  id?: string
  event_type: string
  event_data?: any
  created_at?: string
  session_id?: string
  user_id?: string
}

// Supabase helper functions
export const supabaseHelpers = {
  // Add email to blacklist with email workflow
  async addToBlacklist(email: string, metadata?: Partial<BlacklistSignup>) {
    try {
      // First, insert the email into the database
      const { data, error } = await supabase
        .from('blacklist_signups')
        .insert([
          {
            email,
            product_preference: metadata?.product_preference,
            ip_address: metadata?.ip_address,
            user_agent: metadata?.user_agent,
            referrer: metadata?.referrer,
            email_workflow_status: 'pending',
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) {
        console.error('Error adding to blacklist:', error)
        return { success: false, error: error.message }
      }

      // Try to trigger email workflow, but don't fail if it doesn't work
      let emailResult: { 
        success: boolean; 
        emailStatus: { userEmailSent: boolean; adminEmailSent: boolean; errors: any[] }
      } = { 
        success: false, 
        emailStatus: { userEmailSent: false, adminEmailSent: false, errors: [] }
      };
      
      try {
        emailResult = await this.triggerEmailWorkflow(email);
      } catch (emailError) {
        console.log('Email workflow not available yet:', emailError);
        // Continue without email for now
      }
      
      // Update the database with email workflow status
      if (data && data[0]) {
        await supabase
          .from('blacklist_signups')
          .update({
            confirmation_email_sent: emailResult.emailStatus?.userEmailSent || false,
            admin_notification_sent: emailResult.emailStatus?.adminEmailSent || false,
            confirmation_email_sent_at: emailResult.emailStatus?.userEmailSent ? new Date().toISOString() : null,
            admin_notification_sent_at: emailResult.emailStatus?.adminEmailSent ? new Date().toISOString() : null,
            email_workflow_status: emailResult.success ? 'completed' : 'pending'
          })
          .eq('id', data[0].id)
      }

      return { 
        success: true, 
        data, 
        emailWorkflow: emailResult 
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      return { success: false, error: 'Unexpected error occurred' }
    }
  },

  // Trigger email workflow via Supabase Edge Function
  async triggerEmailWorkflow(userEmail: string, userName?: string) {
    try {
      const { data, error } = await supabase.functions.invoke('send-emails', {
        body: {
          userEmail,
          userName
        }
      })

      if (error) {
        console.error('Email workflow error:', error)
        return { 
          success: false, 
          error: error.message,
          emailStatus: { userEmailSent: false, adminEmailSent: false, errors: [error.message] }
        }
      }

      return { 
        success: true, 
        data,
        emailStatus: data?.emailStatus || { userEmailSent: false, adminEmailSent: false, errors: [] }
      }
    } catch (err) {
      console.error('Email workflow unexpected error:', err)
      return { 
        success: false, 
        error: 'Failed to trigger email workflow',
        emailStatus: { userEmailSent: false, adminEmailSent: false, errors: ['Network error'] }
      }
    }
  },

  // Get blacklist count
  async getBlacklistCount() {
    try {
      const { count, error } = await supabase
        .from('blacklist_signups')
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.error('Error getting blacklist count:', error)
        return { success: false, error: error.message, count: 0 }
      }

      return { success: true, count: count || 0 }
    } catch (err) {
      console.error('Unexpected error:', err)
      return { success: false, error: 'Unexpected error occurred', count: 0 }
    }
  },

  // Check if email already exists
  async checkEmailExists(email: string) {
    try {
      const { data, error } = await supabase
        .from('blacklist_signups')
        .select('email')
        .eq('email', email)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Error checking email:', error)
        return { success: false, error: error.message, exists: false }
      }

      return { success: true, exists: !!data }
    } catch (err) {
      console.error('Unexpected error:', err)
      return { success: false, error: 'Unexpected error occurred', exists: false }
    }
  },

  // Track analytics event
  async trackEvent(eventType: string, eventData?: any, metadata?: Partial<AnalyticsEvent>) {
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .insert([
          {
            event_type: eventType,
            event_data: eventData,
            session_id: metadata?.session_id,
            user_id: metadata?.user_id,
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) {
        console.error('Error tracking event:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (err) {
      console.error('Unexpected error:', err)
      return { success: false, error: 'Unexpected error occurred' }
    }
  },

  // Get recent signups for display
  async getRecentSignups(limit: number = 10) {
    try {
      const { data, error } = await supabase
        .from('blacklist_signups')
        .select('email, created_at')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error getting recent signups:', error)
        return { success: false, error: error.message, data: [] }
      }

      return { success: true, data: data || [] }
    } catch (err) {
      console.error('Unexpected error:', err)
      return { success: false, error: 'Unexpected error occurred', data: [] }
    }
  }
}

// Real-time subscription helper
export const subscribeToBlacklistChanges = (callback: (count: number) => void) => {
  const subscription = supabase
    .channel('blacklist_changes')
    .on('postgres_changes', 
      { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'blacklist_signups' 
      }, 
      async () => {
        // Get updated count
        const { count } = await supabaseHelpers.getBlacklistCount()
        callback(count)
      }
    )
    .subscribe()

  return subscription
}

export default supabase