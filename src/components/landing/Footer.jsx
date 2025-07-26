import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      className="bg-white border-t border-gray-100 py-8 px-4 lg:px-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-3">
             <img src="/xpander-logo-black.png" alt="xpander.ai logo" className="h-7" />
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="https://xpander.ai/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#6B4EFF] transition-colors duration-200 text-sm font-medium"
              >
                Privacy
              </a>
              <a
                href="https://xpander.ai/terms-of-service/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#6B4EFF] transition-colors duration-200 text-sm font-medium"
              >
                Terms
              </a>
              <a
                href="https://docs.xpander.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#6B4EFF] transition-colors duration-200 text-sm font-medium"
              >
                Documentation
              </a>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="/agents"
                className="text-gray-600 hover:text-[#6B4EFF] transition-colors duration-200 text-sm font-medium"
              >
                Slack Agent Directory
              </a>
              <a
                href="/agents/submit"
                className="text-gray-600 hover:text-[#6B4EFF] transition-colors duration-200 text-sm font-medium"
              >
                Submit Your Agent
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://x.com/xpander_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-600 hover:text-[#6B4EFF] hover:bg-gray-50 transition-all duration-200"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/xpander-ai/xpander.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-600 hover:text-[#6B4EFF] hover:bg-gray-50 transition-all duration-200"
              aria-label="View our GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/xpander-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-600 hover:text-[#6B4EFF] hover:bg-gray-50 transition-all duration-200"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Sitemap for SEO */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500 mb-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Product</h4>
              <ul className="space-y-1">
                <li><a href="/" className="hover:text-[#6B4EFF]">Home</a></li>
                <li><a href="/agents" className="hover:text-[#6B4EFF]">Agent Directory</a></li>
                <li><a href="/agents/submit" className="hover:text-[#6B4EFF]">Submit Agent</a></li>
                <li><a href="https://app.xpander.ai/slack_agents/new" className="hover:text-[#6B4EFF]">Create Agent</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Resources</h4>
              <ul className="space-y-1">
                <li><a href="https://docs.xpander.ai/" className="hover:text-[#6B4EFF]">Documentation</a></li>
                <li><a href="https://xpander.ai/blog" className="hover:text-[#6B4EFF]">Blog</a></li>
                <li><a href="https://github.com/xpander-ai" className="hover:text-[#6B4EFF]">GitHub</a></li>
                <li><a href="https://xpander.ai/pricing" className="hover:text-[#6B4EFF]">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Company</h4>
              <ul className="space-y-1">
                <li><a href="https://xpander.ai/about" className="hover:text-[#6B4EFF]">About</a></li>
                <li><a href="https://xpander.ai/careers" className="hover:text-[#6B4EFF]">Careers</a></li>
                <li><a href="https://xpander.ai/contact" className="hover:text-[#6B4EFF]">Contact</a></li>
                <li><a href="https://status.xpander.ai" className="hover:text-[#6B4EFF]">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Legal</h4>
              <ul className="space-y-1">
                <li><a href="https://xpander.ai/privacy-policy/" className="hover:text-[#6B4EFF]">Privacy Policy</a></li>
                <li><a href="https://xpander.ai/terms-of-service/" className="hover:text-[#6B4EFF]">Terms of Service</a></li>
                <li><a href="https://xpander.ai/security" className="hover:text-[#6B4EFF]">Security</a></li>
                <li><a href="/sitemap.xml" className="hover:text-[#6B4EFF]">Sitemap</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2026 xpander.ai. Build better AI agents faster.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}