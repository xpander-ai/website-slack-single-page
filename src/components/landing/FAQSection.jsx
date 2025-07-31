
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FAQSection() {
  const [openIndexes, setOpenIndexes] = useState([0]);

  const faqs = [
    {
      question: 'What is Smart Engage and how does it save costs?',
      answer: 'Smart Engage uses a lightweight model to pre-screen all Slack messages, only invoking your main AI agent when needed. This typically reduces LLM costs by 80%+ since most messages don\'t require AI responses. Your agent only processes relevant messages, not every "thanks" or "got it".'
    },
    {
      question: 'How does user authentication work?',
      answer: 'xpander.ai handles OAuth flows for dozens of SaaS platforms like GitHub, Jira, Google Drive, and many more. Users connect their accounts once through Slack, and xpander.ai securely manages tokens and permissions. Your agent can then perform user-specific actions without you writing any auth code.'
    },
    {
      question: 'Can I use my existing AI agents?',
      answer: 'Yes! xpander.ai works with any Python-based AI framework - LangChain, CrewAI, AutoGen, or custom code. You can also use our <a href="/agents" class="text-[#6B4EFF] hover:underline">pre-configured serverless agents</a> (Agno + OpenAI/Bedrock) for instant deployment without writing code. <a href="/agents/submit" class="text-[#6B4EFF] hover:underline">Submit your own agent</a> to our directory.'
    },
    {
      question: 'What\'s included in the xpander Backend Platform?',
      answer: 'The backend provides MCP Tools (200+ pre-configured AI tools), Messages Store for thread tracking, Observability for execution monitoring, Tool Calling Guardrails for safety, CI/CD integration, Version Control, Event Streaming, AI Task Management, and Agentic RAG. All optional but powerful when needed.'
    },
    {
      question: 'How does thread management work?',
      answer: 'xpander.ai maintains conversation context across Slack threads automatically. Your agent receives the full thread history, user mentions, reactions, and file attachments as clean JSON. No need to manage session state or parse Slack\'s complex thread structure.'
    },
    {
      question: 'What about voice notes and images?',
      answer: 'All Slack content is processed automatically. Voice notes are transcribed, images are analyzed with vision models, and documents are parsed. Everything arrives at your agent as structured data, ready to process.'
    },
    {
      question: 'How long does deployment take?',
      answer: 'With serverless agents: under 3 minutes - just click, authorize Slack, and you\'re live. With custom code: about 5 minutes - install CLI, wrap your agent code, and deploy. No infrastructure setup required.'
    },
    {
      question: 'Can I control when my agent responds?',
      answer: 'Yes. Configure triggers through the dashboard: respond only when @mentioned, on specific keywords, or monitor all messages. Set different rules per channel. Smart Engage ensures you only pay for meaningful interactions.'
    },
    {
      question: 'Is it secure for enterprise use?',
      answer: 'Yes. SOC 2 compliant, end-to-end encryption, isolated execution environments, and no message storage. User credentials are scoped and encrypted. Supports on-premise deployment for maximum control.'
    },
    {
      question: 'What makes this different from building Slack bots directly?',
      answer: 'Building native Slack bots requires handling OAuth, webhooks, thread management, rate limits, retries, and infrastructure. xpander.ai provides all this as a service - you just write agent logic. Plus Smart Engage, user auth, and the backend platform aren\'t available in vanilla Slack bots.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndexes(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-24 px-4 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about bringing your AI agents to Slack with xpander.ai
          </p>
        </motion.div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.15 }}
            >
              <button
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-150"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: openIndexes.includes(index) ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {openIndexes.includes(index) ? (
                      <Minus className="w-5 h-5 text-[#6B4EFF]" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400" />
                    )}
                  </motion.div>
                </div>
              </button>
              
              <AnimatePresence>
                {openIndexes.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                  >
                    <div 
                      className="px-6 pb-6 text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
