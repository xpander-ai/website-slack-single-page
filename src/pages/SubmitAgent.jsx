import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FilloutStandardEmbed } from '@fillout/react';
import TopBar from '../components/landing/TopBar';
import Footer from '../components/landing/Footer';

export default function SubmitAgent() {

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      
      <div className="pt-24 pb-20 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center mb-12"
          >
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/agents" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                Back to Directory
              </Link>
            </Button>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Submit Your Slack Agent
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share your AI agent with the xpander.ai community. Help other teams discover and benefit from your innovation.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Prefer GitHub? You can also{' '}
              <a 
                href="https://github.com/yourusername/slack-xpander/blob/main/CONTRIBUTING.md" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6B4EFF] hover:underline"
              >
                submit via Pull Request
              </a>
            </p>
          </motion.div>

          {/* Fillout Form Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-1"
          >
            <FilloutStandardEmbed 
              filloutId="6oDrvGYWVKus"
              dynamicResize
              style={{ width: '100%', minHeight: '800px' }}
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}