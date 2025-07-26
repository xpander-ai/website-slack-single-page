import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export default function FeatureComparisonTable() {
  const features = [
    {
      category: 'Deployment',
      items: [
        { name: 'Slack-native deploy', basic: true, pro: true, enterprise: true },
        { name: 'VPC/serverless options', basic: false, pro: true, enterprise: true },
        { name: 'Auto-scaling infrastructure', basic: false, pro: true, enterprise: true },
        { name: 'CI/CD integration', basic: false, pro: true, enterprise: true },
      ]
    },
    {
      category: 'Features',
      items: [
        { name: 'Smart context understanding', basic: true, pro: true, enterprise: true },
        { name: 'Real-time metrics', basic: false, pro: true, enterprise: true },
        { name: 'Framework-agnostic runtime', basic: true, pro: true, enterprise: true },
        { name: 'Visual agent workbench', basic: false, pro: true, enterprise: true },
        { name: 'Built-in & custom tools', basic: true, pro: true, enterprise: true },
        { name: 'Memory & thread management', basic: false, pro: true, enterprise: true },
      ]
    },
    {
      category: 'Security & Compliance',
      items: [
        { name: 'Enterprise auth (SSO)', basic: false, pro: false, enterprise: true },
        { name: 'Audit trail', basic: false, pro: true, enterprise: true },
        { name: 'SOC 2 Type II compliance', basic: false, pro: false, enterprise: true },
        { name: 'GDPR ready', basic: false, pro: true, enterprise: true },
        { name: 'Self-hosted option', basic: false, pro: false, enterprise: true },
      ]
    },
    {
      category: 'Support',
      items: [
        { name: 'Community support', basic: true, pro: true, enterprise: true },
        { name: 'Email support', basic: false, pro: true, enterprise: true },
        { name: 'Priority support', basic: false, pro: false, enterprise: true },
        { name: 'Dedicated success manager', basic: false, pro: false, enterprise: true },
      ]
    }
  ];

  const plans = [
    { name: 'Basic', key: 'basic' },
    { name: 'Pro', key: 'pro' },
    { name: 'Enterprise', key: 'enterprise' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const FeatureIcon = ({ included }) => (
    <div className="flex justify-center">
      {included ? (
        <Check className="w-5 h-5 text-green-600" />
      ) : (
        <X className="w-5 h-5 text-gray-300" />
      )}
    </div>
  );

  return (
    <section className="py-24 px-4 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose the Right Plan for Your Team
          </h2>
          <p className="text-xl text-gray-600">
            Compare features across all xpander.ai plans
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-1/2 py-6 px-8 text-left font-bold text-gray-900">
                  Features
                </TableHead>
                {plans.map((plan) => (
                  <TableHead key={plan.key} className="text-center py-6 px-4 font-bold text-gray-900">
                    {plan.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((category, categoryIndex) => (
                <React.Fragment key={category.category}>
                  <motion.tr
                    className="bg-gray-50/50"
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ delay: categoryIndex * 0.1 }}
                  >
                    <TableCell colSpan={4} className="py-4 px-8">
                      <h3 className="font-bold text-lg text-[#6B4EFF]">
                        {category.category}
                      </h3>
                    </TableCell>
                  </motion.tr>
                  {category.items.map((item, itemIndex) => (
                    <motion.tr
                      key={item.name}
                      className="hover:bg-gray-50/50 transition-colors duration-200"
                      variants={rowVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                    >
                      <TableCell className="py-4 px-8 font-medium text-gray-900">
                        {item.name}
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <FeatureIcon included={item.basic} />
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <FeatureIcon included={item.pro} />
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <FeatureIcon included={item.enterprise} />
                      </TableCell>
                    </motion.tr>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-6">
            Ready to get started with xpander.ai?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://app.xpander.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="bg-[#6B4EFF] hover:bg-[#5A3FE6] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Start Free Trial
              </button>
            </a>
            <a 
              href="https://e.xpander.ai/meetings/xpander/book-a-demo-website?uuid=a81662d4-29eb-4ae1-8431-44bb36a8cd0a" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="bg-white hover:bg-gray-50 text-[#6B4EFF] font-semibold px-8 py-3 rounded-lg border-2 border-[#6B4EFF] transition-colors duration-200">
                Book a Demo
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}