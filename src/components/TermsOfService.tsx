import React from 'react';
import MatrixRain from './MatrixRain';
import { FileText, AlertTriangle, Scale, Clock } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
            <h1 className="text-xl font-bold shimmer-orange">Terms of Service</h1>
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
              <FileText className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 shimmer-orange">
                Terms of Service
              </h1>
              <p className="text-orange-300 font-mono">
                Last updated: January 2025
              </p>
            </div>

            <div className="space-y-8 text-gray-300">
              
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">Acceptance of Terms</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    By accessing or using the Rebelz AI platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">Use License & Restrictions</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    Permission is granted to temporarily use Rebelz AI for personal, non-commercial viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for commercial purpose or public display</li>
                    <li>Attempt to reverse engineer any software</li>
                    <li>Remove any copyright or proprietary notations</li>
                    <li>Use automated systems to access or scrape content</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Product Access & Availability</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    Rebelz AI products and services are offered on a limited availability basis:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Blacklist membership does not guarantee product access</li>
                    <li>We reserve the right to limit quantities and refuse service</li>
                    <li>Prices and availability are subject to change without notice</li>
                    <li>All sales are final unless otherwise specified</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">User Conduct</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2 font-mono text-sm">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Submit false or misleading information</li>
                    <li>Interfere with the security or integrity of our systems</li>
                    <li>Engage in any form of harassment or abuse</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Disclaimers & Limitation of Liability</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono mb-4">
                    The materials on Rebelz AI are provided on an 'as is' basis. Rebelz AI makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                  </p>
                  <p className="font-mono text-sm text-orange-300">
                    In no event shall Rebelz AI be liable for any damages arising out of the use or inability to use the materials.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold shimmer-orange">Modifications & Termination</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono">
                    Rebelz AI may revise these terms at any time without notice. By using this platform, you agree to be bound by the current version of these Terms of Service. We reserve the right to terminate access to our services at any time.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold shimmer-orange mb-4">Contact Information</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/20">
                  <p className="font-mono">
                    Questions about these Terms of Service should be sent to:
                    <br />
                    <span className="text-orange-400">thinkbig@rebelz-ai.com</span>
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

export default TermsOfService; 