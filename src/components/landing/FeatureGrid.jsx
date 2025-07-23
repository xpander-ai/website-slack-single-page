
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Shield, Zap, BarChart3, Eye, Server } from 'lucide-react';

export default function FeatureGrid() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Slack-native deploy',
      description: 'One command transforms any agent into a native Slack participant with full API access.'
    },
    {
      icon: Zap,
      title: 'Smart context',
      description: 'Automatically understands workspace conversations, thread history, and user permissions.'
    },
    {
      icon: Server,
      title: 'VPC/serverless',
      description: 'Deploy anywhere - your infrastructure, your security rules, your compliance requirements.'
    },
    {
      icon: BarChart3,
      title: 'Real-time metrics',
      description: 'Monitor token consumption, response latency, and success rates out of the box.'
    },
    {
      icon: Shield,
      title: 'Enterprise auth',
      description: 'Built-in SSO, role-based permissions, and audit logging for compliance teams.'
    },
    {
      icon: Eye,
      title: 'Audit trail',
      description: 'Complete observability into every agent interaction and decision path.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 px-4 lg:px-8 bg-white lg:snap-start">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover-lift"
              variants={itemVariants}
            >
              <div className="space-y-4">
                <div className="relative w-14 h-14 rounded-2xl bg-[#6B4EFF] bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-[#6B4EFF]" />
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#6B4EFF]/20 transition-all duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#6B4EFF] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
