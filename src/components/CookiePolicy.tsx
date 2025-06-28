import React from 'react';
import MatrixRain from './MatrixRain';
import { Cookie, Settings, BarChart3, Target } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-black/95 backdrop-blur-md border-b border-orange-500/50 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img
              src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/images/clarencejohnson_hotmail_de/ChatGPT%20Image%20Jun%2022,%202025,%2002_06_45%20PM.png"
              alt="Rebelz AI Apparel Logo"
              className="w-20 h-auto"
              style={{filter: 'brightness(1.1) contrast(1.1)'}}
            />
            <h1 className="text-xl font-bold shimmer-orange">Cookie Policy</h1>
          </div>
          <a href="/" className="text-orange-400 hover:text-orange-300 font-mono font-bold transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>

      {/* Content */}
      <section className="relative pt-24 pb-12">
        <MatrixRain intensity="subtle" className="opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30">
            
            <div className="text-center mb-12">
              <Cookie className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 shimmer-orange">
                Cookie Policy
              </h1>
              <p className="text-orange-300 font-mono">
                Last updated: January 2025
              </p>
            </div>

            <div className="space-y-8 text-gray-300">
              
              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">What Are Cookies?</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
                  </p>
                  <p className="font-mono text-sm text-orange-300">
                    We use cookies responsibly and transparently, giving you control over your data.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">Essential Cookies</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    These cookies are necessary for the website to function properly:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Session management and user authentication</li>
                    <li>Security and fraud prevention</li>
                    <li>Form submissions and user preferences</li>
                    <li>Load balancing and performance optimization</li>
                  </ul>
                  <p className="font-mono text-xs text-gray-400 mt-4">
                    These cookies cannot be disabled as they are essential for site functionality.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">Analytics Cookies</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    We use analytics cookies to understand how visitors interact with our website:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Page views and user journey tracking</li>
                    <li>Performance metrics and error reporting</li>
                    <li>Popular content and feature usage</li>
                    <li>A/B testing and optimization insights</li>
                  </ul>
                  <p className="font-mono text-xs text-orange-300 mt-4">
                    This data is anonymized and helps us improve our platform.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">Marketing Cookies</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    These cookies help us deliver relevant content and advertisements:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Personalized product recommendations</li>
                    <li>Social media integration and sharing</li>
                    <li>Email campaign effectiveness tracking</li>
                    <li>Retargeting and conversion optimization</li>
                  </ul>
                  <p className="font-mono text-xs text-gray-400 mt-4">
                    You can opt-out of marketing cookies without affecting site functionality.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Third-Party Cookies</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    We work with trusted partners who may set their own cookies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Google Analytics for website analytics</li>
                    <li>Social media platforms for content sharing</li>
                    <li>Payment processors for secure transactions</li>
                    <li>CDN providers for content delivery</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Managing Your Cookie Preferences</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    You can control cookie usage through:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Browser settings to block or delete cookies</li>
                    <li>Our cookie consent banner (when implemented)</li>
                    <li>Privacy-focused browser extensions</li>
                    <li>Opting out of third-party tracking services</li>
                  </ul>
                  <p className="font-mono text-xs text-orange-300 mt-4">
                    Note: Disabling certain cookies may affect website functionality.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Cookie Retention</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono">
                    Cookie retention periods vary by type:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm mt-4">
                    <li>Session cookies: Deleted when you close your browser</li>
                    <li>Essential cookies: Up to 1 year</li>
                    <li>Analytics cookies: Up to 2 years</li>
                    <li>Marketing cookies: Up to 1 year or until consent is withdrawn</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Contact Us</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono">
                    For questions about our cookie usage, contact us at:
                    <br />
                    <span className="text-orange-400">privacy@rebelz-ai.com</span>
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy; 