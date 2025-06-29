import React, { useState, useEffect } from 'react';
import { Users, Zap, Eye, ArrowRight, Code, Crown, Lock, Star, Cpu, Shield, Coffee, Mail, X } from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import CountdownTimer from './components/CountdownTimer';
import ContactForm from './components/ContactForm';
import CurtainReveal from './components/CurtainReveal';

import ProductPreview from './components/ProductPreview';
import FeatureSection from './components/FeatureSection';
import TestimonialSection from './components/TestimonialSection';
import FounderNote from './components/FounderNote';
import FAQ from './components/FAQ';
import LanguageToggle from './components/LanguageToggle';
import { supabaseHelpers, subscribeToBlacklistChanges } from './lib/supabase';
import { Language, useTranslation } from './utils/translations';

function App() {
  const [blacklistCount, setBlacklistCount] = useState(847);
  const [typewriterText, setTypewriterText] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [showContactForm, setShowContactForm] = useState(false);
  const [curtainRevealed, setCurtainRevealed] = useState(false);
  
  const t = useTranslation(currentLanguage);
  const fullText = t.hero.typewriterText;

  // Typewriter effect with continuous loop
  useEffect(() => {
    let index = 0;
    let timer: NodeJS.Timeout;
    let restartTimer: NodeJS.Timeout;

    const startTyping = () => {
      index = 0;
      setTypewriterText('');
      
      timer = setInterval(() => {
        if (index < fullText.length) {
          setTypewriterText(fullText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          // Wait 3 seconds then restart
          restartTimer = setTimeout(() => {
            startTyping();
          }, 3000);
        }
      }, 100);
    };

    startTyping();

    return () => {
      clearInterval(timer);
      clearTimeout(restartTimer);
    };
  }, []);

  // Load real blacklist count from Supabase
  useEffect(() => {
    const loadBlacklistCount = async () => {
      const { success, count } = await supabaseHelpers.getBlacklistCount();
      if (success) {
        setBlacklistCount(count);
      }
    };

    loadBlacklistCount();

    // Set up real-time subscription for live updates
    const subscription = subscribeToBlacklistChanges((newCount) => {
      setBlacklistCount(newCount);
    });

    // Track page view
    supabaseHelpers.trackEvent('page_view', { 
      page: 'coming_soon',
      timestamp: new Date().toISOString()
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleBlacklistClick = () => {
    setShowEmailPopup(true);
    supabaseHelpers.trackEvent('blacklist_header_click', { 
      timestamp: new Date().toISOString()
    });
  };

  const handleJoinBlacklist = () => {
    setShowEmailInput(true);
    supabaseHelpers.trackEvent('blacklist_button_click', { 
      timestamp: new Date().toISOString()
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMessage('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      // Check if email already exists
      const { exists } = await supabaseHelpers.checkEmailExists(email);
      if (exists) {
        setMessage('You\'re already on the list! 🚀');
        setIsLoading(false);
        return;
      }

      // Add to blacklist with email workflow
      const result = await supabaseHelpers.addToBlacklist(email, {
        user_agent: navigator.userAgent,
        referrer: document.referrer
      });

      if (result.success) {
        // Check email workflow status
        const emailWorkflow = result.emailWorkflow;
        const userEmailSent = emailWorkflow?.emailStatus?.userEmailSent;
        const adminEmailSent = emailWorkflow?.emailStatus?.adminEmailSent;
        
        let successMessage = 'Welcome to the Rebelz AI Underground! 🔥';
        
        if (userEmailSent && adminEmailSent) {
          successMessage += '\n📧 Check your email for confirmation!';
        } else if (userEmailSent) {
          successMessage += '\n📧 Check your email for confirmation!';
        } else {
          successMessage += '\n⚠️ You\'re on the list, but email confirmation may be delayed.';
        }
        
        setMessage(successMessage);
        setEmail('');
        setShowEmailInput(false);
        
        // Track successful signup with email workflow status
        supabaseHelpers.trackEvent('blacklist_signup', { 
          email_domain: email.split('@')[1],
          email_workflow_success: emailWorkflow?.success || false,
          user_email_sent: userEmailSent || false,
          admin_email_sent: adminEmailSent || false,
          timestamp: new Date().toISOString()
        });

        // Auto-close popup after successful signup
        setTimeout(() => {
          setShowEmailPopup(false);
          setMessage('');
        }, 3000);
      } else {
        setMessage(result.error || 'Something went wrong. Try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      console.error('Signup error:', error);
    }

    setIsLoading(false);
  };

  const handleCloseMessage = () => {
    setMessage('');
  };

  const handleContactClick = () => {
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  const handleCurtainRevealComplete = () => {
    setCurtainRevealed(true);
  };

  const handleCurtainGetBlacklisted = () => {
    setShowEmailPopup(true);
    supabaseHelpers.trackEvent('curtain_blacklist_click', { 
      timestamp: new Date().toISOString()
    });
  };

  // Hero images for curtain reveal - responsive
  const heroImage = "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test/ChatGPT%20Image%20Jun%2022,%202025,%2009_57_27%20PM.png";
  const mobileHeroImage = "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test/image%20(2).jpeg";

  return (
    <>
      {/* Persistent Spotify Player - Never unmounts - Mobile & Desktop */}
      <div 
        className={`fixed transition-all duration-500 ${
          curtainRevealed 
            ? 'bottom-4 right-4 z-[90]' // Main app position - lower z-index
            : 'bottom-32 sm:bottom-4 right-4 z-[10000]' // Curtain position - much higher on mobile, normal on desktop
        }`}
      >
        <div className="bg-black/90 backdrop-blur-md rounded-2xl p-2 shadow-lg">
          <div className="mb-1 text-center">
            <h3 className="text-orange-400 font-mono text-[10px] sm:text-xs font-bold">
              Late Night Stack Player
            </h3>
          </div>
          <iframe 
            style={{borderRadius: '12px'}} 
            src="https://open.spotify.com/embed/playlist/4XZgevu0u1PLNVlKfnbI2i?utm_source=generator&theme=0&view=compact&autoplay=0&loop=1" 
            width="300" 
            height="90" 
            className="sm:hidden"
            frameBorder="0" 
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
          {/* Desktop version with list view */}
          <iframe 
            style={{borderRadius: '12px'}} 
            src="https://open.spotify.com/embed/playlist/4XZgevu0u1PLNVlKfnbI2i?utm_source=generator&theme=0&view=list&autoplay=0&loop=1" 
            width="240" 
            height="180" 
            className="hidden sm:block"
            frameBorder="0" 
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </div>
      </div>

      <CurtainReveal
        heroImage={heroImage}
        mobileHeroImage={mobileHeroImage}
        onRevealComplete={handleCurtainRevealComplete}
        onGetBlacklisted={handleCurtainGetBlacklisted}
      >
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header Bar - Restored with Mobile Optimization */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-black/95 backdrop-blur-md border-b border-orange-500/50 shadow-lg">
        <div className="flex items-center justify-between px-2 sm:px-4 py-2">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <span className="text-sm sm:text-lg md:text-xl font-bold shimmer-orange">
              <span className="hidden sm:inline">Rebelz AI Apparel</span>
              <span className="sm:hidden">Rebelz AI</span>
            </span>
          </div>
          
          {/* Main Slogan - Desktop only, properly spaced */}
          <div className="hidden md:flex flex-1 flex-col items-center px-4">
            <h1 className="text-lg lg:text-xl xl:text-2xl font-bold shimmer-orange mb-1">
              {t.header.slogan1}
            </h1>
            <h2 className="text-sm lg:text-base font-bold shimmer-orange">
              {t.header.slogan2}
            </h2>
          </div>
          
          {/* Menu items */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <LanguageToggle 
              currentLanguage={currentLanguage} 
              onLanguageChange={setCurrentLanguage} 
            />
            <button 
              onClick={handleBlacklistClick}
              className="hidden sm:inline-block text-orange-400 hover:text-orange-300 font-mono text-xs md:text-sm font-bold transition-all duration-300 hover:scale-105 px-2 py-1 rounded border border-orange-500/30 hover:border-orange-500"
            >
              {t.header.waitlist}
            </button>
            <button 
              onClick={handleContactClick}
              className="text-orange-400 hover:text-orange-300 font-mono text-xs md:text-sm font-bold transition-all duration-300 hover:scale-105 px-2 py-1 rounded border border-orange-500/30 hover:border-orange-500"
            >
              <span className="hidden sm:inline">{t.header.contact}</span>
              <span className="sm:hidden">Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* Email Popup Modal */}
      {showEmailPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowEmailPopup(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-black/95 backdrop-blur-md rounded-2xl p-6 border border-orange-500/50 shadow-2xl max-w-md w-full">
            {/* Close Button */}
            <button
              onClick={() => setShowEmailPopup(false)}
              className="absolute top-4 right-4 text-orange-400 hover:text-orange-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <Lock className="w-8 h-8 text-orange-500 mr-3" />
                <h2 className="text-2xl font-bold shimmer-orange">Join the Blacklist</h2>
              </div>
              <p className="text-orange-300 font-mono text-sm">
                Get exclusive early access to Rebelz AI drops
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.hero.emailPlaceholder}
                  className="w-full px-4 py-3 bg-black/50 border border-orange-500/50 rounded-lg text-white placeholder-orange-300/70 font-mono text-base focus:border-orange-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-bold text-base hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 border border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Joining...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    {t.hero.joinButton}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Success/Error Message */}
            {message && (
              <div className="mt-4 p-4 bg-black/50 rounded-lg border border-orange-500/30">
                <p className="text-orange-400 font-mono text-sm whitespace-pre-line">
                  {message}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-orange-300/70 text-xs font-mono">
                No spam. Just exclusive drops and early access.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Countdown Timer - Desktop: top-right fixed */}
      <div className="hidden md:block fixed top-14 sm:top-20 right-1 sm:right-4 z-[90]">
        <CountdownTimer />
      </div>

      {/* Desktop Hero Section */}
      <section className="hidden md:block relative overflow-hidden min-h-screen pt-16 sm:pt-20">
        {/* Desktop Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <picture>
            <source 
              media="(min-width: 768px)" 
              srcSet="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//ChatGPT%20Image%20Jun%2022,%202025,%2009_57_27%20PM.png"
            />
            <img
              src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//ChatGPT%20Image%20Jun%2022,%202025,%2009_57_27%20PM.png"
              alt="Rebelz AI Hero"
              className="w-full h-full object-cover opacity-95 brightness-110"
            />
          </picture>
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
        </div>

        {/* Desktop Content Overlay */}
        <div className="relative z-10 h-full">
          {/* Coming Soon Page Title - Upper Middle */}
          <div className="absolute top-8 sm:top-12 left-1/2 transform -translate-x-1/2 z-30">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold shimmer-orange font-mono text-center tracking-wide">
              &lt; Coming Soon Page /&gt;
            </h3>
          </div>

          {/* CTA Section */}
          {/* Desktop: Bottom left */}
          <div className="hidden md:block absolute bottom-8 left-8 w-96 z-30">
            <div className="bg-black/90 backdrop-blur-md rounded-lg p-6 border border-orange-500/30 space-y-4">
              {!showEmailInput ? (
                <button 
                  onClick={handleJoinBlacklist}
                  className="group w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 pulse-orange border-2 border-orange-400 hover-glow"
                >
                  <Lock className="w-6 h-6" />
                  Get Blacklisted
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="w-full px-4 py-3 bg-black/50 border border-orange-500/50 rounded-lg text-white placeholder-orange-300/70 font-mono text-base focus:border-orange-500 focus:outline-none"
                    disabled={isLoading}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-bold text-base hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border border-orange-400 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Joining...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          Join
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailInput(false)}
                      className="px-4 py-3 text-orange-400 hover:text-orange-300 font-mono text-sm rounded border border-orange-500/30 hover:border-orange-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Success/Error Message */}
              {message && (
                <div className="bg-black/90 backdrop-blur-md rounded-lg p-4 border border-orange-500/50 relative">
                  <p className="text-orange-400 font-mono text-base">{message}</p>
                  <button
                    onClick={handleCloseMessage}
                    className="absolute top-2 right-2 text-orange-500 hover:text-orange-300 text-lg"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Hero Section */}
      <section className="md:hidden min-h-screen bg-black flex flex-col pt-16">
        {/* Mobile: Coming Soon Page Title */}
        <div className="text-center py-4">
          <h3 className="text-lg font-bold shimmer-orange font-mono tracking-wide">
            &lt; Coming Soon Page /&gt;
          </h3>
        </div>

        {/* Mobile: Title and Slogans */}
        <div className="text-center px-4 mb-4">
          <h1 className="text-xl font-bold shimmer-orange mb-2 leading-tight">
            Rep your TechStack
          </h1>
          <p className="text-orange-300 text-sm leading-relaxed mb-4">
            Merch for Coders with AI & Guts
          </p>
        </div>

        {/* Mobile: Countdown Timer */}
        <div className="flex justify-center mb-6">
          <CountdownTimer />
        </div>

        {/* Mobile: Full Width Portrait Image */}
        <div className="w-full h-[60vh] relative mb-4">
          <picture>
            <source 
              media="(max-width: 767px)" 
              srcSet="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//image%20(2).jpeg"
            />
            <img
              src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//image%20(2).jpeg"
              alt="Rebelz AI Hero Mobile"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>

        {/* Mobile: CTA Button */}
        <div className="p-4">
          <div className="bg-black/95 backdrop-blur-md rounded-xl p-4 border border-orange-500/30 space-y-4 shadow-2xl">
            {!showEmailInput ? (
              <button 
                onClick={handleJoinBlacklist}
                className="group w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-bold text-base hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 pulse-orange border-2 border-orange-400 hover-glow"
              >
                <Lock className="w-5 h-5" />
                Get Blacklisted
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  className="w-full px-3 py-2 bg-black/50 border border-orange-500/50 rounded-lg text-white placeholder-orange-300/70 font-mono text-sm focus:border-orange-500 focus:outline-none"
                  disabled={isLoading}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-bold text-sm hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border border-orange-400 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Joining...
                      </>
                    ) : (
                      <>
                        <Mail className="w-3 h-3" />
                        Join
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmailInput(false)}
                    className="px-3 py-2 text-orange-400 hover:text-orange-300 font-mono text-xs rounded border border-orange-500/30 hover:border-orange-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Success/Error Message */}
            {message && (
              <div className="bg-black/90 backdrop-blur-md rounded-lg p-3 border border-orange-500/50 relative">
                <p className="text-orange-400 font-mono text-sm">{message}</p>
                <button
                  onClick={handleCloseMessage}
                  className="absolute top-2 right-2 text-orange-500 hover:text-orange-300 text-lg"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Matrix Code Intense Section - WITH MATRIX RAIN */}
      <section className="relative py-20 bg-black">
        <MatrixRain intensity="intense" className="opacity-80" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 shimmer-orange">
            {t.matrix.title.toUpperCase()}
          </h2>
          <div className="bg-black/90 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30">
            <pre className="text-orange-400 font-mono text-lg leading-relaxed">
{`function deployYourself() {
  if (conformity.detected()) {
    rebelz.ai.activate();
    mindset.upgrade();
  }
  return independence;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Product Preview Section - WITH MATRIX RAIN */}
      <ProductPreview onReserve={handleBlacklistClick} />

      {/* Features Section - WITH MATRIX RAIN */}
      <FeatureSection />

      {/* Testimonials - WITH MATRIX RAIN */}
      <TestimonialSection />

      {/* Limited Spots Warning - WITH MATRIX RAIN */}
      <section className="relative py-16 bg-red-900/20 border-y border-red-500/50">
        <MatrixRain intensity="intense" className="opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Shield className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl md:text-5xl font-bold text-orange-400 shimmer-orange">
              ROLL CALL: FIRST MOVER ADVANTAGERS
            </h2>
            <Shield className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-xl font-mono text-orange-300 mb-4">
            Our First Collection: <span className="text-orange-500 font-bold text-2xl">100 Shirts</span> + <span className="text-orange-500 font-bold text-2xl">50 Hoodies</span>
          </p>
          <p className="text-orange-400 font-mono mb-2">
            🚀 <strong>First Come, First Serve</strong> - Get ready to rep your stack!
          </p>
          <p className="text-orange-300 font-mono text-base">
            Join the blacklist now to secure your spot.
          </p>
        </div>
      </section>

      {/* Founder's Note - WITH MATRIX RAIN */}
      <FounderNote />

      {/* FAQ Section - WITH MATRIX RAIN */}
      <FAQ />

      {/* Final CTA Section - WITH MATRIX RAIN */}
      <section className="relative py-20 bg-black">
        <MatrixRain intensity="intense" className="opacity-60" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 shimmer-orange">
            Ready to Deploy?
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 shimmer-orange">
            Join Us & Rep your Stack
          </h3>
          <p className="text-xl mb-8 text-orange-300 font-mono">
            No spam, no sellout. Just drop alerts.
          </p>
          <button 
            onClick={handleBlacklistClick}
            className="group px-16 py-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl font-bold text-2xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-110 transition-all duration-300 flex items-center gap-4 mx-auto pulse-orange border-4 border-orange-400"
          >
            <Code className="w-8 h-8" />
            Execute: Join Rebelz AI Blacklist
            <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
          </button>
        </div>
      </section>



      {/* Footer - Restored Original Design */}
      <footer className="bg-black border-t border-orange-500/30 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <div>
                <p className="text-orange-500 font-bold text-lg shimmer-orange">Rebelz AI Apparel</p>
                <p className="text-gray-400 text-sm font-mono">Rep your TechStack</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors font-mono">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors font-mono">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-orange-400 transition-colors font-mono">
                Cookie Policy
              </a>
              <a href="/disclaimer" className="text-gray-400 hover:text-orange-400 transition-colors font-mono">
                Disclaimer
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm font-mono">
                © 2025 Rebelz AI Apparel. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs font-mono mt-1">
                Built with 💻 and ☕ by rebelz
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={showContactForm} 
        onClose={handleCloseContactForm} 
      />
      </div>
    </CurtainReveal>
    </>
  );
}

export default App;