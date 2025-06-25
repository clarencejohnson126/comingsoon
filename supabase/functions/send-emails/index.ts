import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  userEmail: string;
  userName?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userEmail, userName }: EmailRequest = await req.json()

    // Validate email
    if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Initialize Supabase client (for potential database operations)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Email service configuration - using Resend (recommended)
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found')
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Prepare emails
    const adminEmail = 'clarencejohnson@hotmail.de'
    const fromEmail = 'noreply@rebelz-ai.com' // Change this to your verified domain
    
    // User confirmation email template
    const userEmailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Rebelz AI Underground</title>
          <style>
            body { 
              font-family: 'Courier New', monospace; 
              background: #000; 
              color: #fff; 
              margin: 0; 
              padding: 20px; 
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: linear-gradient(135deg, #1a1a1a, #2d2d2d); 
              border: 2px solid #ff7f50; 
              border-radius: 12px; 
              padding: 30px; 
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
            }
            .logo { 
              font-size: 32px; 
              font-weight: bold; 
              background: linear-gradient(135deg, #ff4500, #ff7f50); 
              -webkit-background-clip: text; 
              -webkit-text-fill-color: transparent; 
              background-clip: text; 
            }
            .content { 
              line-height: 1.6; 
              font-size: 16px; 
            }
            .code-block { 
              background: #111; 
              border: 1px solid #ff7f50; 
              border-radius: 8px; 
              padding: 15px; 
              margin: 20px 0; 
              font-family: 'Courier New', monospace; 
              color: #ff7f50; 
            }
            .footer { 
              margin-top: 30px; 
              padding-top: 20px; 
              border-top: 1px solid #333; 
              text-align: center; 
              color: #888; 
              font-size: 14px; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">REBELZ AI</div>
              <p style="color: #ff7f50; margin: 10px 0;">Welcome to the Underground</p>
            </div>
            
            <div class="content">
              <h2 style="color: #ff7f50;">You're In. Welcome to the Rebellion.</h2>
              
              <p>Yo ${userName || 'Rebel'},</p>
              
              <p>You just joined the <strong>Rebelz AI Underground</strong> - the most exclusive community where code meets streetwear.</p>
              
              <div class="code-block">
function welcomeToRebelz() {<br>
&nbsp;&nbsp;if (conformity.detected()) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;rebelz.ai.activate();<br>
&nbsp;&nbsp;&nbsp;&nbsp;mindset.upgrade();<br>
&nbsp;&nbsp;&nbsp;&nbsp;return independence;<br>
&nbsp;&nbsp;}<br>
}
              </div>
              
              <p><strong>What happens next?</strong></p>
              <ul style="color: #ff7f50;">
                <li>🔥 <strong>First dibs</strong> on limited drops before anyone else</li>
                <li>🎯 <strong>Exclusive colorways</strong> not available to the public</li>
                <li>🗳️ <strong>Vote on designs</strong> - your code, your choice</li>
                <li>⚡ <strong>Early access</strong> to new tech-inspired collections</li>
              </ul>
              
              <p>Keep your eyes on your inbox. When we drop, you'll be the first to know.</p>
              
              <p style="color: #ff7f50; font-weight: bold;">Deploy Yourself. Don't Obey. Join the Movement.</p>
              
              <p>Welcome to the future of fashion,<br>
              <strong>The Rebelz AI Team</strong></p>
            </div>
            
            <div class="footer">
              <p>This email was sent to ${userEmail}</p>
              <p>Rebelz AI - Where Code Meets Cloth</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Admin notification email template
    const adminEmailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Rebelz AI Blacklist Signup</title>
          <style>
            body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #ff4500, #ff7f50); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .stats { background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .email { background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 4px; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🚀 New Blacklist Signup!</h2>
              <p>Someone just joined the Rebelz AI Underground</p>
            </div>
            
            <div class="stats">
              <h3>📊 Signup Details</h3>
              <div class="email"><strong>Email:</strong> ${userEmail}</div>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>User Agent:</strong> ${req.headers.get('user-agent') || 'Unknown'}</p>
            </div>
            
            <div class="stats">
              <h3>🎯 Next Steps</h3>
              <ul>
                <li>User has been added to the blacklist</li>
                <li>Confirmation email sent to user</li>
                <li>Ready for future drop notifications</li>
              </ul>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              This notification was automatically generated by the Rebelz AI coming soon page.
            </p>
          </div>
        </body>
      </html>
    `

    // Send both emails using Resend
    const emailPromises = [
      // User confirmation email
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [userEmail],
          subject: '🔥 Welcome to Rebelz AI Underground - You\'re Blacklisted!',
          html: userEmailTemplate,
        }),
      }),
      
      // Admin notification email
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [adminEmail],
          subject: `🚀 New Rebelz AI Signup: ${userEmail}`,
          html: adminEmailTemplate,
        }),
      })
    ]

    const emailResults = await Promise.allSettled(emailPromises)
    
    // Check results
    const userEmailResult = emailResults[0]
    const adminEmailResult = emailResults[1]
    
    let emailStatus = {
      userEmailSent: false,
      adminEmailSent: false,
      errors: [] as string[]
    }

    if (userEmailResult.status === 'fulfilled' && userEmailResult.value.ok) {
      emailStatus.userEmailSent = true
    } else {
      emailStatus.errors.push('Failed to send user confirmation email')
      console.error('User email error:', userEmailResult)
    }

    if (adminEmailResult.status === 'fulfilled' && adminEmailResult.value.ok) {
      emailStatus.adminEmailSent = true
    } else {
      emailStatus.errors.push('Failed to send admin notification email')
      console.error('Admin email error:', adminEmailResult)
    }

    // Log the event in Supabase
    await supabaseClient
      .from('analytics_events')
      .insert([
        {
          event_type: 'email_workflow_triggered',
          event_data: {
            user_email: userEmail,
            user_email_sent: emailStatus.userEmailSent,
            admin_email_sent: emailStatus.adminEmailSent,
            errors: emailStatus.errors,
            timestamp: new Date().toISOString()
          }
        }
      ])

    return new Response(
      JSON.stringify({
        success: true,
        emailStatus,
        message: emailStatus.errors.length === 0 
          ? 'Both emails sent successfully' 
          : 'Emails sent with some errors'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

/* To deploy this function:
1. Install Supabase CLI: npm install -g supabase
2. Login: supabase login
3. Link project: supabase link --project-ref your-project-ref
4. Deploy: supabase functions deploy send-emails
5. Set environment variables in Supabase dashboard:
   - RESEND_API_KEY
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
*/