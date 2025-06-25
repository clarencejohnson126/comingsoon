import React from 'react';
import MatrixRain from './MatrixRain';
import { AlertCircle, TrendingUp, Globe, Zap } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-black/95 backdrop-blur-md border-b border-orange-500/50 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img
              src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/images/clarencejohnson_hotmail_de/ChatGPT%20Image%20Jun%2022,%202025,%2002_06_45%20PM.png"
              alt="REBELZ AI Logo"
              className="w-20 h-auto"
              style={{filter: 'brightness(1.1) contrast(1.1)'}}
            />
            <h1 className="text-xl font-bold shimmer-orange">Disclaimer</h1>
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
              <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 shimmer-orange">
                Disclaimer
              </h1>
              <p className="text-orange-300 font-mono">
                Last updated: January 2025
              </p>
            </div>

            <div className="space-y-8 text-gray-300">
              
              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">General Information</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, Rebelz AI excludes all representations, warranties, conditions and terms whether express or implied, statutory or otherwise.
                  </p>
                  <p className="font-mono text-sm text-orange-300">
                    This disclaimer governs your use of our website and all content, products, and services provided.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">Product & Service Availability</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    Product releases, features, and services mentioned on this website:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Are subject to change without notice</li>
                    <li>May not be available in all markets or regions</li>
                    <li>Could be delayed or cancelled due to technical limitations</li>
                    <li>Pricing and specifications may vary from what is displayed</li>
                  </ul>
                  <p className="font-mono text-xs text-orange-300 mt-4">
                    Joining our blacklist does not guarantee product access or availability.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">Technology & AI Disclaimers</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    Our AI-powered and tech-focused products come with inherent limitations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>AI algorithms may produce unexpected or inaccurate results</li>
                    <li>Technology features are experimental and may not work as expected</li>
                    <li>Smart features require internet connectivity and compatible devices</li>
                    <li>Performance may vary based on user environment and usage</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Limitation of Liability</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    To the maximum extent permitted by applicable law, Rebelz AI shall not be liable for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Any direct, indirect, incidental, or consequential damages</li>
                    <li>Loss of profits, data, or business opportunities</li>
                    <li>Damages arising from use or inability to use our products</li>
                    <li>Third-party content, services, or linked websites</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">External Links & Content</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    Our website may contain links to external sites and third-party content:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>We are not responsible for external website content or policies</li>
                    <li>Third-party services operate under their own terms and conditions</li>
                    <li>Links do not constitute endorsement of external content</li>
                    <li>External sites may have different privacy and security practices</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Intellectual Property</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    All content, trademarks, and intellectual property on this website:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Are owned by Rebelz AI or licensed to us</li>
                    <li>Are protected by copyright and trademark laws</li>
                    <li>May not be used without express written permission</li>
                    <li>Include proprietary algorithms and design elements</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Geographic Limitations</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono">
                    Our products and services may not be available in all countries or regions. Access to certain features may be restricted based on local laws, regulations, or technical limitations. We reserve the right to restrict access from any jurisdiction.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Changes to This Disclaimer</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono">
                    We reserve the right to modify this disclaimer at any time. Your continued use of our website after changes constitutes acceptance of the updated disclaimer. We recommend reviewing this page periodically for updates.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Contact Information</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono">
                    For questions about this disclaimer, please contact:
                    <br />
                    <span className="text-orange-400">legal@rebelzai.com</span>
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

export default Disclaimer; 