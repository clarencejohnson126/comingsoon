import React, { useState } from 'react';
import { X, Mail, User, MessageSquare, Send } from 'lucide-react';
import MatrixRain from './MatrixRain';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulate form submission (replace with actual submission logic)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitMessage('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-black/95 backdrop-blur-md rounded-2xl border border-orange-500/30 w-full max-w-lg max-h-[90vh] overflow-hidden">
        <MatrixRain intensity="subtle" className="opacity-10" />
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-orange-500/30">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold shimmer-orange">Contact Rebelz AI</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-orange-400 transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="relative z-10 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-orange-400 font-mono text-sm mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-orange-500/50 rounded-lg text-white placeholder-orange-300/70 font-mono focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Your name..."
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-orange-400 font-mono text-sm mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-orange-500/50 rounded-lg text-white placeholder-orange-300/70 font-mono focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="your.email@domain.com"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label className="block text-orange-400 font-mono text-sm mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-orange-500/50 rounded-lg text-white placeholder-orange-300/70 font-mono focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="What's on your mind?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-orange-400 font-mono text-sm mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black/50 border border-orange-500/50 rounded-lg text-white placeholder-orange-300/70 font-mono focus:border-orange-500 focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your project, questions, or collaboration ideas..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-bold text-white hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Success/Error Message */}
          {submitMessage && (
            <div className="mt-4 p-4 bg-black/50 border border-orange-500/30 rounded-lg">
              <p className="text-orange-400 font-mono text-sm text-center">
                {submitMessage}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 font-mono text-xs">
              We typically respond within 24 hours
            </p>
            <p className="text-orange-300 font-mono text-xs mt-1">
              💻 Built by rebelz, for rebelz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm; 