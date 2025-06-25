import React from 'react';
import MatrixRain from './MatrixRain';
import { Shield, Eye, Database, Users } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
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
            <h1 className="text-xl font-bold shimmer-orange">Privacy Policy</h1>
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
              <Shield className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 shimmer-orange">
                Privacy Policy
              </h1>
              <p className="text-orange-300 font-mono">
                Last updated: January 2025
              </p>
            </div>

            <div className="space-y-8 text-gray-300">
              
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">Information We Collect</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    When you join our blacklist or interact with our platform, we may collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Email address for blacklist notifications</li>
                    <li>Basic usage analytics and interaction data</li>
                    <li>Browser information and device type</li>
                    <li>IP address for security and analytics purposes</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">How We Use Your Data</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    Your data is used exclusively for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Sending you early access notifications and drop alerts</li>
                    <li>Improving our platform and user experience</li>
                    <li>Preventing fraud and maintaining security</li>
                    <li>Analyzing user engagement and platform performance</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">Data Sharing & Protection</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    We are committed to protecting your privacy:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>We never sell your personal data to third parties</li>
                    <li>Data is encrypted and stored securely using industry standards</li>
                    <li>Access is limited to essential personnel only</li>
                    <li>We comply with GDPR, CCPA, and other applicable privacy laws</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Your Rights</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Request access to your personal data</li>
                    <li>Request correction or deletion of your data</li>
                    <li>Opt-out of communications at any time</li>
                    <li>Data portability and transparent processing</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Contact Us</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono">
                    For privacy-related questions or requests, contact us at:
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

export default PrivacyPolicy; 