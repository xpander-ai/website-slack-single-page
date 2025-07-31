import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { featureFlags } from '@/config/featureFlags';

export default function TopBar() {
  const location = useLocation();
  const isOnSubPage = location.pathname !== '/';

  return (
    <motion.header
      className="gradient-bg py-3 px-4 lg:px-8 fixed top-0 w-full z-50 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <div className="flex items-center gap-4 lg:gap-8">
          {isOnSubPage && (
            <a 
              href="/" 
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </a>
          )}
          
          <a href="https://xpander.ai" className="flex items-center space-x-3">
            <img src="/xpander-logo-white.png" alt="xpander.ai logo" className="h-6 lg:h-7" />
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="https://docs.xpander.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/90 text-sm font-medium hover:text-white transition-colors"
            >
              Documentation
            </a>
            <a 
              href="https://xpander.ai/pricing" 
              className="text-white/90 text-sm font-medium hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a 
              href="https://xpander.ai/blog" 
              className="text-white/90 text-sm font-medium hover:text-white transition-colors"
            >
              Blog
            </a>
            <a 
              href="https://xpander.ai/careers" 
              className="text-white/90 text-sm font-medium hover:text-white transition-colors"
            >
              Careers
            </a>
            <a 
              href="/templates" 
              className="text-white/90 text-sm font-medium hover:text-white transition-colors"
            >
              Agent Templates
            </a>
            <a 
              href="/agents" 
              className="text-white/90 text-sm font-medium hover:text-white transition-colors"
            >
              Slack Agent Directory
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href="https://e.xpander.ai/meetings/xpander/book-a-demo-website"
            target="_blank"
            rel="noopener noreferrer" 
            className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-md text-white/90 border border-white/20 hover:bg-white/10 hover:text-white transition-all whitespace-nowrap"
          >
            Schedule a Demo
          </a>
          <a 
            href="https://app.xpander.ai"
            target="_blank"
            rel="noopener noreferrer" 
            className="text-sm font-medium px-4 py-2 rounded-md bg-white text-purple-600 hover:bg-gray-100 transition-colors whitespace-nowrap shadow-md"
          >
            Console Access
          </a>
        </div>
      </div>
    </motion.header>
  );
}