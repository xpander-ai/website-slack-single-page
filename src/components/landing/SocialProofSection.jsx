
import React from 'react';
import { motion } from 'framer-motion';

// Simple text-based logos as components
const Logo = ({ name }) => {
  const styles = "h-8 flex items-center justify-center text-gray-500 font-bold text-2xl";
  switch (name.toLowerCase()) {
    case 'google':
      return <div className={styles} style={{ fontFamily: 'Product Sans, sans-serif' }}><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span></div>;
    case 'nvidia':
      return <div className={`${styles} font-sans tracking-tighter`}>NVIDIA</div>;
    case 'intel':
      return <div className={`${styles} font-serif italic`}>intel</div>;
    case 'checkpoint':
       return <div className={`${styles} font-sans text-xl`}>Check Point</div>;
    case 'amazon':
      return <div className={`${styles} font-sans`}>amazon</div>;
    case 'qualcomm':
      return <div className={`${styles} font-sans text-xl`}>QUALCOMM</div>;
    case 'workday':
       return <div className={`${styles} font-sans text-xl`}>workday.</div>;
    case 'wix':
      return <div className={`${styles} font-serif`}>Wix</div>;
    default:
      return <div className={styles}>{name}</div>;
  }
};


export default function SocialProofSection() {
  const companies = ['Google', 'Nvidia', 'Intel', 'Checkpoint', 'Amazon', 'Qualcomm', 'Workday', 'Wix'];

  return (
    <section id="social-proof" className="py-12 px-4 lg:px-8 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
        >
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
            Trusted by engineers at world-class companies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {companies.map(company => (
              <div key={company} className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-150">
                  <Logo name={company} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
