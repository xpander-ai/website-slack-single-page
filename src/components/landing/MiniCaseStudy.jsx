import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

export default function MiniCaseStudy() {
  return (
    <section className="py-12 px-4 lg:px-8 bg-blue-50 border-y border-blue-200">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-900">Case Study</h3>
          </div>
          <p className="text-lg text-blue-800 leading-relaxed">
            A Fortune 500 technology company leveraged xpander.ai to deploy and monitor 30+ agents across multiple frameworks, cutting operational overhead by 38% and accelerating time-to-market for new workflows. The platform's unified dashboard and automated scaling features eliminated manual deployment bottlenecks entirely.
          </p>
        </motion.div>
      </div>
    </section>
  );
}