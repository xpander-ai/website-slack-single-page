
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export default function FinalCTABanner() {

  const handleSlackEnableClick = () => {
     window.open('https://app.xpander.ai/slack_agents/new?templateId=072bb326-d45b-4995-a8e0-458e1e4b6d20', '_blank'); 
  };

  const handleDemoClick = () => {
    window.open('https://e.xpander.ai/meetings/xpander/book-a-demo', '_blank');
  };

  return (
    <section className="py-24 px-4 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Gradient line separator */}
        <div className="w-full h-px mb-24 bg-gradient-to-r from-transparent via-[#6B4EFF]/40 to-transparent"></div>

        <motion.div
          className="relative overflow-hidden rounded-3xl gradient-bg p-12 lg:p-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
        >

          <div className="relative space-y-8">
            <motion.h2
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              Take one coffee break. Ship a Slack-native agent without leaving xpander.ai.
            </motion.h2>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.2 }}
            >
              <Button
                size="lg"
                onClick={handleSlackEnableClick}
                className="bg-white text-[#6B4EFF] hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl hover-lift border-2 border-white"
              >
                Create Slack Agent →
              </Button>
              <Button
                size="lg"
                onClick={handleDemoClick}
                variant="outline"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#6B4EFF] px-8 py-4 text-lg font-semibold rounded-xl hover-lift"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book a demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
