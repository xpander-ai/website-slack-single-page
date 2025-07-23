import React from 'react';
import { motion } from 'framer-motion';

export default function PlatformBanner() {
  return (
    <section className="py-16 px-4 lg:px-8 bg-gradient-to-r from-[#6B4EFF] to-[#8B5CF6]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Everything else (versions, rollbacks, prompt history) stays exactly where it is: inside xpander.ai.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}