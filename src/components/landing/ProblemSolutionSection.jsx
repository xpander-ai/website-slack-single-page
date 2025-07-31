
import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ArrowRight, Database, Brain, Users, FileStack, Gauge, Sparkles, KeyRound } from 'lucide-react';

export default function ProblemSolutionSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const problemSolutions = [
    {
      icon: Sparkles,
      pain: {
        title: "Every message costs LLM tokens",
        description: "Without filtering, your agent processes every message, even 'thanks' and 'ok', burning tokens on noise."
      },
      fix: {
        title: "Smart Engage with small models",
        description: "Pre-screens messages with efficient models. Only invokes your main agent when actually needed. Cuts costs by 80%+."
      }
    },
    {
      icon: KeyRound,
      pain: {
        title: "User auth is a nightmare",
        description: "Building OAuth flows for each user's GitHub/Jira/Google access means weeks of security code and token management."
      },
      fix: {
        title: "Built-in per-user authentication",
        description: "Users connect their accounts once. xpander.ai handles OAuth, token storage, and permission scoping automatically."
      }
    },
    {
      icon: Database,
      pain: {
        title: "Thread session tracking",
        description: "Each event must carry the right thread_ts. Miss once and the bot answers the room. Hello support tickets."
      },
      fix: {
        title: "Stateless Context Delivery",
        description: "Agent receives complete thread history with each message. No fetching, no state management, just pure context."
      }
    },
    {
      icon: Brain,
      pain: {
        title: "Context window overflow",
        description: "Long threads blow past GPT-4's 128k token limit and 5-10× your spend."
      },
      fix: {
        title: "Sliding Context Engine",
        description: "Keeps the last N messages + auto-summary → teams trimmed token usage by ≈58%."
      }
    },
    {
      icon: FileStack,
      pain: {
        title: "Multimodal event sprawl",
        description: "Voice, images, PDFs land as raw JSON; you glue on transcribers, downloaders, unfurlers."
      },
      fix: {
        title: "AI-Ready Attachments",
        description: "Files, audio, and links auto-converted to text. Your agent receives clean, AI-ready content. No parsing needed."
      }
    },
    {
      icon: Gauge,
      pain: {
        title: "429s & runaway tokens",
        description: "conversations.replies is 1 req/min; naïve polling hits rate-limits and torches cash."
      },
      fix: {
        title: "Smart queue + relevance gate",
        description: "xpander.ai batches under limits and wakes the model only on on-topic text. Cuts token burn, ends 429 panics."
      }
    }
  ];
  
  const handleScrollToQuickStart = (e) => {
    e.preventDefault();
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-4 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Why building Slack agents is harder than it should be
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            And how xpander.ai eliminates each roadblock
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {problemSolutions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={rowVariants}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-200 hover:shadow-md transition-all duration-150"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{item.pain.title}</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="flex items-start gap-2 text-red-600 mb-1">
                      <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600">{item.pain.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <div className="flex items-start gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 font-medium">{item.fix.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <p className="text-lg text-gray-600 font-medium">
            Stop building Slack infrastructure. Start building AI value.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
