
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Eye, Plus, Shield, Lock, Server } from 'lucide-react';

export default function DeveloperFeaturesSection() {
  const developerFeatures = [
    {
      icon: Code,
      title: 'Framework-Agnostic Runtime',
      description: 'Run agents built with any framework or model. No lock-in, full flexibility.',
    },
    {
      icon: Eye,
      title: 'Visual Agent Workbench',
      description: 'Design, debug, and iterate agents visually with tool graphs, test payloads, and interactive debugging.',
    },
    {
      icon: Plus,
      title: 'Built-in & Custom Agents Tools',
      description: 'Use prebuilt tools or generate your own from API specs for rapid agent function expansion.',
    },
    {
      icon: Shield,
      title: 'Memory & Thread Management',
      description: 'Persistent memory and thread management out-of-the-box. No extra infra needed.',
    }
  ];

  const deploymentFeatures = [
    {
      icon: Shield,
      title: 'Auto-scaling Infrastructure',
      description: 'Handles traffic spikes automatically without manual intervention.'
    },
    {
      icon: Code,
      title: 'CI/CD Integration',
      description: 'Deploy from GitHub, GitLab, or any CI system with webhooks.'
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Track performance, errors, and usage with built-in dashboards.'
    },
    {
      icon: Plus,
      title: 'Version Control',
      description: 'Roll back to previous versions instantly when needed.'
    }
  ];

  const complianceBadges = [
    {
      name: 'SOC 2 Type II Compliant',
      icon: Shield,
      link: 'https://trust.xpander.ai'
    },
    {
      name: 'GDPR Ready',
      icon: Lock,
      link: 'https://trust.xpander.ai'
    },
    {
      name: 'Self-Hosted Option',
      icon: Server,
      link: 'https://e.xpander.ai/meetings/xpander/book-a-demo-website?uuid=a81662d4-29eb-4ae1-8431-44bb36a8cd0a'
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

  const FeatureGrid = ({ title, features }) => (
    <div className="space-y-8">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-8 h-8 bg-[#6B4EFF] rounded-lg flex items-center justify-center">
          <Code className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift"
            variants={itemVariants}
          >
            <div className="space-y-4">
              <div className="relative w-12 h-12 rounded-xl bg-[#6B4EFF] bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-[#6B4EFF]" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#6B4EFF] transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className="py-24 px-4 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Adding backend to your Agents doesn't end with Slack!
          </h2>
          <p className="text-xl text-gray-600">
            Release new versions confidently with xpander.ai agent platform
          </p>
        </motion.div>

        <div className="space-y-16">
          <FeatureGrid title="Developer Features" features={developerFeatures} />
          <FeatureGrid title="Deployment Features" features={deploymentFeatures} />
        </div>
        
        <div className="mt-24 max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wider">
                Enterprise-Grade Security & Reliability
              </h2>
            </motion.div>

            <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
              {complianceBadges.map((badge, index) => (
                <motion.a
                  key={index}
                  href={badge.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <badge.icon className="w-5 h-5 text-gray-500 group-hover:text-[#6B4EFF] transition-colors" />
                  <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                    {badge.name}
                  </span>
                </motion.a>
              ))}
            </div>
            
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a 
                href="https://app.xpander.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 text-lg">
                  Login to xpander.ai Platform
                </button>
              </a>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
