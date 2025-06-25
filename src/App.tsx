import React, { useState, useEffect } from 'react';
import { Users, Zap, Vote, Eye, ArrowRight, Code, Shirt, Crown, Lock, Star, Cpu, Shield, Coffee, Terminal, Mail } from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import CountdownTimer from './components/CountdownTimer';
import StickyBar from './components/StickyBar';
import AvatarCarousel from './components/AvatarCarousel';
import ProductPreview from './components/ProductPreview';
import FeatureSection from './components/FeatureSection';
import TestimonialSection from './components/TestimonialSection';
import FounderNote from './components/FounderNote';
import FAQ from './components/FAQ';
import { supabaseHelpers, subscribeToBlacklistChanges } from './lib/supabase';

function App() {
  const [blacklistCount, setBlacklistCount] = useState(847);
  const [typewriterText, setTypewriterText] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const fullText = "Deploy Yourself. Don't Obey. Join the Movement.";

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

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header Bar with Logo and Slogan - Compact */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-black/95 backdrop-blur-md border-b border-orange-500/50 shadow-lg">
        <div className="flex items-center justify-between px-3 py-1.5">
          {/* Logo on left - Much smaller */}
          <div className="flex items-center flex-shrink-0">
            <img
              src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/images/clarencejohnson_hotmail_de/ChatGPT%20Image%20Jun%2022,%202025,%2002_06_45%20PM.png"
              alt="REBELZ AI Logo"
              className="w-20 h-auto sm:w-24 drop-shadow-xl"
              style={{filter: 'brightness(1.1) contrast(1.1)'}}
            />
          </div>
          
          {/* MAIN SLOGAN - Compact */}
          <div className="flex-1 text-center px-2">
            <h1 className="text-sm sm:text-base md:text-lg font-bold shimmer-orange">
              Outfit your MindStack
            </h1>
            <h2 className="text-xs sm:text-sm font-bold shimmer-orange">
              The only Brand merging Code & Cloth.
            </h2>
          </div>
          
          {/* Menu items on right - Compact */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button className="text-orange-400 hover:text-orange-300 font-mono text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 px-2 py-0.5 rounded border border-transparent hover:border-orange-500/30">
              Waitlist
            </button>
            <button className="text-orange-400 hover:text-orange-300 font-mono text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 px-2 py-0.5 rounded border border-transparent hover:border-orange-500/30">
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Hero Section with Background Image */}
      <section className="relative overflow-hidden" style={{marginTop: '2.5rem', minHeight: 'calc(100vh - 2.5rem)'}}>
        {/* Full Screen Background Image - Positioned below header */}
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
          <img
            src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//ChatGPT%20Image%20Jun%2022,%202025,%2009_57_27%20PM.png"
            alt="Rebelz AI Hero"
            className="w-full h-full object-contain opacity-95 brightness-110"
          />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        </div>

        {/* Overlay Content - Fixed positioned elements that don't move */}
        <div className="relative z-10" style={{minHeight: 'calc(100vh - 2.5rem)'}}>
          
          {/* Monitor Screen - Terminal Output (responsive positioning) */}
          <div style={{
            position: 'absolute',
            top: '48vh',
            left: '33vw',
            width: '16vw',
            zIndex: 20
          }}>
            <div style={{
              position: 'relative',
              top: '1vh',
              left: '1vw',
              color: '#36ff36',
              fontFamily: "'Fira Mono', 'Courier New', monospace",
              fontSize: 'clamp(0.5rem, 0.8vw, 1rem)',
              lineHeight: '1.4',
              letterSpacing: '0.05em'
            }}>
              {typewriterText}
              <span className="animate-pulse" style={{color: '#36ff36'}}>|</span>
            </div>
          </div>

          {/* Top Right - Spotify Player (responsive sizing) */}
          <div style={{
            position: 'fixed',
            top: '8vh',
            right: '2vw',
            width: 'clamp(250px, 18vw, 320px)',
            zIndex: 30
          }}>
            <div className="bg-black/90 backdrop-blur-md rounded-lg p-2 border border-orange-500/30">
              <iframe 
                style={{borderRadius: '12px'}} 
                src="https://open.spotify.com/embed/track/2ufpTLLgG1Q1etucp78w5m?utm_source=generator" 
                width="100%" 
                height="clamp(100px, 8vh, 140px)" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </div>

          {/* Top Right - Countdown Timer (responsive positioning) */}
          <div style={{
            position: 'absolute',
            top: 'clamp(200px, 25vh, 300px)',
            right: '2vw',
            zIndex: 20
          }}>
            <div className="bg-black/80 backdrop-blur-md rounded-lg border border-orange-500/30" style={{
              padding: 'clamp(0.5rem, 1vw, 1rem)'
            }}>
              <div style={{
                transform: 'scale(clamp(0.7, 0.8, 1))',
                transformOrigin: 'center'
              }}>
                <CountdownTimer />
              </div>
            </div>
          </div>

          {/* Bottom Left - Blacklist Button (responsive positioning) */}
          <div style={{
            position: 'fixed',
            bottom: 'clamp(1rem, 4vh, 3rem)',
            left: 'clamp(1rem, 3vw, 2rem)',
            width: 'clamp(280px, 20vw, 400px)',
            zIndex: 20
          }}>
            <div className="bg-black/90 backdrop-blur-md rounded-lg border border-orange-500/30 space-y-4" style={{
              padding: 'clamp(1rem, 2vw, 1.5rem)'
            }}>
              {!showEmailInput ? (
                                  <button 
                    onClick={handleJoinBlacklist}
                    className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 pulse-orange border-2 border-orange-400 hover-glow"
                    style={{
                      padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(1rem, 3vw, 1.5rem)',
                      fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)'
                    }}
                  >
                                      <Lock style={{width: 'clamp(1rem, 1.5vw, 1.5rem)', height: 'clamp(1rem, 1.5vw, 1.5rem)'}} />
                    Get Blacklisted
                    <ArrowRight style={{width: 'clamp(1rem, 1.5vw, 1.5rem)', height: 'clamp(1rem, 1.5vw, 1.5rem)'}} className="group-hover:translate-x-2 transition-transform" />
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

          {/* Bottom Right - First Mover Stats (responsive positioning) */}
          <div style={{
            position: 'fixed',
            bottom: 'clamp(1rem, 4vh, 3rem)',
            right: 'clamp(1rem, 3vw, 2rem)',
            width: 'clamp(250px, 18vw, 320px)',
            zIndex: 20
          }}>
            <div className="bg-black/90 backdrop-blur-md rounded-lg border border-orange-500/50" style={{
              padding: 'clamp(1rem, 2vw, 1.5rem)'
            }}>
              <p className="text-orange-400 font-mono mb-2" style={{fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)'}}>First movers get early access + exclusive drop.</p>
              <p className="text-red-400 font-bold glitch-text mb-3" style={{fontSize: 'clamp(0.8rem, 1.4vw, 1rem)'}}>Miss it, miss out.</p>
              
              <div className="flex items-center gap-2 justify-center">
                <Users style={{width: 'clamp(1rem, 1.5vw, 1.25rem)', height: 'clamp(1rem, 1.5vw, 1.25rem)'}} className="text-orange-500" />
                <span className="font-mono shimmer-orange count-animation" style={{fontSize: 'clamp(1.2rem, 2vw, 1.5rem)'}}>{blacklistCount.toLocaleString()}</span>
              </div>
              <p className="text-orange-300 font-mono text-center mt-1" style={{fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)'}}>joined the Tribe</p>
            </div>
          </div>

        </div>
      </section>

      {/* Matrix Code Intense Section - WITH MATRIX RAIN */}
      <section className="relative py-20 bg-black">
        <MatrixRain intensity="intense" className="opacity-80" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 shimmer-orange">
            REBELZ AI REVOLUTION
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

      {/* Community Proof - WITH MATRIX RAIN */}
      <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <MatrixRain intensity="subtle" className="opacity-40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 shimmer-orange">
            Join the Rebelz AI Underground
          </h2>
          <AvatarCarousel />
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30 hover-glow">
              <Terminal className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4 shimmer-orange">Early-bird Access</h3>
              <p className="text-gray-300 font-mono">Get first dibs on limited Rebelz AI drops before anyone else knows they exist.</p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30 hover-glow">
              <Shirt className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4 shimmer-orange">Exclusive Colorways</h3>
              <p className="text-gray-300 font-mono">Blacklist-only designs that aren't available to the general public.</p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30 hover-glow">
              <Vote className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4 shimmer-orange">Vote on Drops</h3>
              <p className="text-gray-300 font-mono">Help decide the next Rebelz AI designs. Your code, your choice, your influence.</p>
            </div>
          </div>
        </div>
      </section>

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
            Join the Rebelz AI Revolution
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

      <StickyBar onJoinClick={handleJoinBlacklist} />
    </div>
  );
}

export default App;