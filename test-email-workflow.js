// Test Email Workflow - Run with: node test-email-workflow.js
// This script tests the email workflow without the UI

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eoahpwciwttfavzpqfnz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvYWhwd2Npd3R0ZmF2enBxZm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTg2MjUsImV4cCI6MjA2MTY5NDYyNX0.BN32BnMnUjYqgnfTb2mAizITCYKoDDyBPlr1KtLIvTo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testEmailWorkflow() {
  console.log('🚀 Testing Rebelz AI Email Workflow...\n');
  
  const testEmail = `test+${Date.now()}@example.com`;
  console.log(`📧 Testing with email: ${testEmail}`);
  
  try {
    // Test 1: Basic database insertion
    console.log('\n1️⃣ Testing database insertion...');
    const { data: insertData, error: insertError } = await supabase
      .from('blacklist_signups')
      .insert([
        {
          email: testEmail,
          ip_address: '127.0.0.1',
          user_agent: 'Test-Script/1.0',
          referrer: 'test-script',
          email_workflow_status: 'pending'
        }
      ])
      .select();
    
    if (insertError) {
      console.error('❌ Database insertion failed:', insertError);
      return;
    }
    
    console.log('✅ Database insertion successful');
    const userId = insertData[0].id;
    
    // Test 2: Email workflow trigger
    console.log('\n2️⃣ Testing email workflow...');
    const { data: emailData, error: emailError } = await supabase.functions.invoke('send-emails', {
      body: {
        userEmail: testEmail,
        userName: 'Test User'
      }
    });
    
    if (emailError) {
      console.error('❌ Email workflow failed:', emailError);
    } else {
      console.log('✅ Email workflow triggered successfully');
      console.log('📊 Email status:', emailData);
    }
    
    // Test 3: Update email status in database
    console.log('\n3️⃣ Updating email status in database...');
    const { error: updateError } = await supabase
      .from('blacklist_signups')
      .update({
        confirmation_email_sent: emailData?.emailStatus?.userEmailSent || false,
        admin_notification_sent: emailData?.emailStatus?.adminEmailSent || false,
        confirmation_email_sent_at: emailData?.emailStatus?.userEmailSent ? new Date().toISOString() : null,
        admin_notification_sent_at: emailData?.emailStatus?.adminEmailSent ? new Date().toISOString() : null,
        email_workflow_status: emailData?.success ? 'completed' : 'failed'
      })
      .eq('id', userId);
    
    if (updateError) {
      console.error('❌ Database update failed:', updateError);
    } else {
      console.log('✅ Database updated successfully');
    }
    
    // Test 4: Verify final state
    console.log('\n4️⃣ Verifying final state...');
    const { data: finalData, error: finalError } = await supabase
      .from('blacklist_signups')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (finalError) {
      console.error('❌ Final verification failed:', finalError);
    } else {
      console.log('✅ Final state verified');
      console.log('📋 Final record:', finalData);
    }
    
    // Test 5: Get blacklist count
    console.log('\n5️⃣ Testing blacklist count...');
    const { count, error: countError } = await supabase
      .from('blacklist_signups')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('❌ Count query failed:', countError);
    } else {
      console.log(`✅ Total blacklist signups: ${count}`);
    }
    
    console.log('\n🎉 Email workflow test completed!');
    console.log('\n📝 Test Summary:');
    console.log(`   • Test email: ${testEmail}`);
    console.log(`   • User ID: ${userId}`);
    console.log(`   • Email workflow: ${emailData?.success ? '✅ Success' : '❌ Failed'}`);
    console.log(`   • User email sent: ${emailData?.emailStatus?.userEmailSent ? '✅' : '❌'}`);
    console.log(`   • Admin email sent: ${emailData?.emailStatus?.adminEmailSent ? '✅' : '❌'}`);
    console.log(`   • Total signups: ${count}`);
    
    if (emailData?.success && emailData?.emailStatus?.userEmailSent && emailData?.emailStatus?.adminEmailSent) {
      console.log('\n🔥 All systems go! Email workflow is working perfectly!');
    } else {
      console.log('\n⚠️ Some issues detected. Check the setup guide.');
    }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

// Run the test
testEmailWorkflow();