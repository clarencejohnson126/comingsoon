import React, { useState, useEffect } from 'react';
import { Users, Zap, Eye, ArrowRight, Code, Crown, Lock, Star, Cpu, Shield, Coffee, Mail } from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import CountdownTimer from './components/CountdownTimer';
import ContactForm from './components/ContactForm';

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
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [showContactForm, setShowContactForm] = useState(false);
  
  const t = useTranslation(currentLanguage);
  const fullText = t.hero.typewriterText;

  // Responsive scaling for overlay elements
  useEffect(() => {
    const updateScale = () => {
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight - 40 // Account for header height
      };
      
      // Base design dimensions (what elements were designed for)
      const baseWidth = 1920;
      const baseHeight = 1080;
      
      // Calculate scale factor based on viewport size
      const scaleX = viewport.width / baseWidth;
      const scaleY = viewport.height / baseHeight;
      
      // Use the smaller scale factor to maintain aspect ratio
      // Add bounds to prevent elements from being too small or too large
      const scaleFactor = Math.max(0.4, Math.min(1.2, Math.min(scaleX, scaleY)));
      
      // Set CSS custom property for scaling
      document.documentElement.style.setProperty('--scale-factor', scaleFactor.toString());
    };

    // Update on mount and resize
    updateScale();
    window.addEventListener('resize', updateScale);
    
    return () => window.removeEventListener('resize', updateScale);
  }, []);

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

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header Bar with Logo and Slogan - Compact */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-black/95 backdrop-blur-md border-b border-orange-500/50 shadow-lg">
        <div className="flex items-center justify-between px-3 py-1.5">
          {/* Logo on left - Text only */}
          <div className="flex items-center flex-shrink-0">
            <span className="text-lg sm:text-xl font-bold shimmer-orange">
              REBELZ AI
            </span>
          </div>
          
          {/* MAIN SLOGAN - Compact */}
          <div className="flex-1 text-center px-2">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold shimmer-orange">
              {t.header.slogan1}
            </h1>
            <h2 className="text-xs sm:text-sm font-bold shimmer-orange">
              {t.header.slogan2}
            </h2>
          </div>
          
          {/* Menu items on right - Compact */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <LanguageToggle 
              currentLanguage={currentLanguage} 
              onLanguageChange={setCurrentLanguage} 
            />
            <button className="text-orange-400 hover:text-orange-300 font-mono text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 px-2 py-0.5 rounded border border-transparent hover:border-orange-500/30">
              {t.header.waitlist}
            </button>
            <button 
              onClick={handleContactClick}
              className="text-orange-400 hover:text-orange-300 font-mono text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 px-2 py-0.5 rounded border border-transparent hover:border-orange-500/30"
            >
              {t.header.contact}
            </button>
          </div>
        </div>
      </div>

      {/* Countdown Timer - Under header bar, upper middle right */}
      <div className="fixed top-16 right-4 z-[90]">
        <CountdownTimer />
      </div>

      {/* Full Screen Hero Section with Background Image */}
      <section className="relative overflow-hidden" style={{marginTop: '2.5rem', minHeight: 'calc(100vh - 2.5rem)'}}>
        {/* Full Screen Background Image Container */}
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
          <img
            src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//ChatGPT%20Image%20Jun%2022,%202025,%2009_57_27%20PM.png"
            alt="Rebelz AI Hero"
            className="w-full h-full object-cover opacity-95 brightness-110"
          />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
          
          {/* Monitor Screen - Terminal Output (positioned relative to image) */}
          <div className="absolute" style={{
            top: '58%',
            left: '41%',
            width: '12%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}>
            <div style={{
              color: '#36ff36',
              fontFamily: "'Fira Mono', 'Courier New', monospace",
              fontSize: '0.7rem',
              lineHeight: '1.2',
              letterSpacing: '0.05em'
            }}>
              {typewriterText}
              <span className="animate-pulse" style={{color: '#36ff36'}}>|</span>
            </div>
          </div>
        </div>

        {/* Responsive Overlay Container - Scales all elements together */}
        <div className="absolute inset-0 w-full h-full" style={{
          transform: 'scale(var(--scale-factor, 1))',
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-out'
        }}>



          {/* Bottom Left - Blacklist Button */}
          <div className="absolute" style={{
            bottom: '8%',
            left: '2%',
            width: '400px',
            zIndex: 20
          }}>
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
      <ProductPreview />

      {/* Features Section - WITH MATRIX RAIN */}
      <FeatureSection />



      {/* Testimonials - WITH MATRIX RAIN */}
      <TestimonialSection />

      {/* Limited Spots Warning - WITH MATRIX RAIN */}
      <section className="relative py-16 bg-red-900/20 border-y border-red-500/50">
        <MatrixRain intensity="intense" className="opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Shield className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl md:text-5xl font-bold text-red-400 shimmer-orange">
              REBELZ AI - RESTRICTED ACCESS
            </h2>
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-xl font-mono text-red-300 mb-4">
            Only <span className="text-red-500 font-bold text-3xl">150</span> Blacklist spots for the first Rebelz AI drop.
          </p>
          <p className="text-orange-400 font-mono">
            Once they're gone, you're locked out until the next cycle.
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
            onClick={handleJoinBlacklist}
            className="group px-16 py-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl font-bold text-2xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-110 transition-all duration-300 flex items-center gap-4 mx-auto pulse-orange border-4 border-orange-400"
          >
            <Code className="w-8 h-8" />
            Execute: Join Rebelz AI Blacklist
            <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
          </button>
        </div>
      </section>

      {/* Fixed Spotify Player - Bottom Right */}
      <div className="fixed bottom-4 right-4 z-[90] hidden lg:block">
        <div className="bg-black/90 backdrop-blur-md rounded-2xl p-3 border border-orange-500/30 shadow-2xl">
          <div className="mb-2 text-center">
            <h3 className="text-orange-400 font-mono text-xs font-bold">
              Late Night Stack Player
            </h3>
          </div>
          <iframe 
            style={{borderRadius: '8px'}} 
            src="https://open.spotify.com/embed/track/2ufpTLLgG1Q1etucp78w5m?utm_source=generator" 
            width="240" 
            height="152" 
            frameBorder="0" 
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-orange-500/30 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <img
                src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/images/clarencejohnson_hotmail_de/ChatGPT%20Image%20Jun%2022,%202025,%2002_06_45%20PM.png"
                alt="REBELZ AI Logo"
                className="w-16 h-auto"
                style={{filter: 'brightness(1.1) contrast(1.1)'}}
              />
              <div>
                <p className="text-orange-500 font-bold text-lg shimmer-orange">REBELZ AI</p>
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
                © 2025 Rebelz AI. All rights reserved.
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
  );
}

export default App;