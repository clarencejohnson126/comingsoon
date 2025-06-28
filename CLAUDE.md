# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript coming-soon landing page for "Rebelz AI Apparel" - a cyberpunk-themed tech apparel brand. The application combines a visually striking UI with real-time email collection powered by Supabase.

## Core Architecture

**Frontend Stack:**
- React 18 with TypeScript
- Vite for development and building
- Tailwind CSS for styling
- Lucide React for icons

**Backend & Database:**
- Supabase for database, real-time subscriptions, and edge functions
- Email workflow via Supabase Edge Functions + Resend service
- Real-time blacklist counter updates

**Key Features:**
- Typewriter animation effect for hero text
- Matrix rain background animations
- Multi-language support (English/German)
- Real-time email signup with duplicate prevention
- Email workflow (user confirmation + admin notifications)
- Analytics event tracking
- Responsive design with mobile-first approach

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Test email workflow (Node.js script)
npm run test:email
```

## Database Architecture

**Primary Tables:**
- `blacklist_signups` - Email collection with metadata and email workflow status
- `analytics_events` - User interaction tracking

**Key Supabase Features:**
- Row Level Security (RLS) policies for anonymous access
- Real-time subscriptions for live counter updates
- Edge Functions for email workflow automation

## Component Structure

**Main Components:**
- `App.tsx` - Main application with hero section and email signup flow
- `CountdownTimer.tsx` - Live countdown to launch
- `MatrixRain.tsx` - Animated background effect
- `ContactForm.tsx` - Modal contact form
- `ProductPreview.tsx` - Product showcase section
- Legal components (`PrivacyPolicy.tsx`, `TermsOfService.tsx`, etc.)

**Utilities:**
- `src/lib/supabase.ts` - Database client and helper functions
- `src/utils/translations.ts` - Multi-language text support

## Email Workflow

The application includes a complete email automation system:

1. User submits email → Saved to database
2. Supabase Edge Function triggers dual emails:
   - User confirmation email (cyberpunk-themed welcome)
   - Admin notification to `clarencejohnson@hotmail.de`
3. Email delivery status tracked in database
4. User feedback based on email workflow success

**Edge Function Location:** `supabase/functions/send-emails/`

## Key Configuration Files

- `supabase-schema.sql` - Database schema and RLS policies
- `EMAIL_WORKFLOW_SETUP.md` - Complete email setup instructions
- `SUPABASE_SETUP.md` - Database configuration guide
- `quick-fix-database.sql` - Database fixes/updates

## Styling Approach

- **Cyberpunk aesthetic:** Orange (#ff6b35) primary color with black backgrounds
- **Typography:** Mono fonts for tech feel, gradient text effects
- **Animations:** Pulse effects, hover transformations, matrix rain
- **Mobile-first:** Responsive design with conditional rendering for mobile/desktop

## Real-time Features

- Live blacklist counter updates via Supabase subscriptions
- WebSocket connection for instant UI updates
- Automatic reconnection handling

## Security Considerations

- Environment variables for API keys (Supabase, Resend)
- RLS policies restrict database access appropriately
- Client-side and server-side email validation
- Anonymous access limited to necessary operations only

## Testing

Use `npm run test:email` to test the complete email workflow without the frontend interface.