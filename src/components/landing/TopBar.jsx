import React from 'react';
import { motion } from 'framer-motion';

export default function TopBar() {
  return (
    <motion.header
      className="gradient-bg py-3 px-4 lg:px-8 fixed top-0 w-full z-50 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <div className="flex items-center gap-4 lg:gap-6">
          <a href="https://xpander.ai" className="flex items-center space-x-3">
            <img src="/xpander-logo-white.png" alt="xpander.ai logo" className="h-6 lg:h-7" />
          </a>
          
          <nav className="hidden sm:flex items-center gap-4 lg:gap-6">
            <a 
              href="https://docs.xpander.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Documentation
            </a>
            <a 
              href="/agents" 
              className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Slack Agents
            </a>
            <a 
              href="https://xpander.ai/pricing" 
              className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Pricing
            </a>
            <a 
              href="https://xpander.ai/blog" 
              className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Blog
            </a>
            <a 
              href="https://xpander.ai/careers" 
              className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Careers
            </a>
          </nav>
        </div>

        <a 
          href="https://app.xpander.ai/slack_agents/new?templateId=072bb326-d45b-4995-a8e0-458e1e4b6d20"
          target="_blank"
          rel="noopener noreferrer" 
          className="text-sm font-medium px-3 py-2 lg:px-4 lg:py-2 rounded-md bg-white text-purple-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
        >
          Create Agent
        </a>
      </div>
    </motion.header>
  );
}