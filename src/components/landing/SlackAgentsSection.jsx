import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import HomeAgentCard from '@/components/ui/HomeAgentCard';
import agentsApi from '@/services/agentsApi';

export default function SlackAgentsSection() {
  const [topAgents, setTopAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTopAgents = async () => {
      try {
        setLoading(true);
        const agents = await agentsApi.getAllAgents();
        // Get specific featured agents
        const featuredIds = ['browserbase', 'cursor', 'perplexity', 'qdrant'];
        const featuredAgents = agents.filter(agent => featuredIds.includes(agent.id));
        // Sort them in the order we want
        const sortedFeatured = featuredIds
          .map(id => featuredAgents.find(agent => agent.id === id))
          .filter(agent => agent !== undefined)
          .slice(0, 3); // Show only 3 agents
        setTopAgents(sortedFeatured);
      } catch (err) {
        setError(err.message);
        console.error('Error loading top agents:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTopAgents();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <section className="py-24 px-4 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse text-center">
            <div className="h-12 bg-white/60 rounded-2xl w-[600px] mx-auto mb-6"></div>
            <div className="h-6 bg-white/40 rounded-xl w-[400px] mx-auto mb-16"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-white/60 rounded-3xl shadow-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || topAgents.length === 0) {
    return null; // Don't show section if there's an error or no agents
  }

  return (
    <section className="py-24 px-4 lg:px-8 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200/50 mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">Featured Agents</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Slack-native Agents –{' '}
            <span className="gradient-text">Ready to Install</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-3 leading-relaxed">
            Browse and add Slack-native AI agents to your workspace.
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            <span style={{ whiteSpace: 'nowrap' }}>
              Powered by{' '}
              <a href="https://github.com/xpander-ai/xpander-ai" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-600 hover:text-[#6B4EFF] transition-colors">
                <img src="/xpander-logo-purple.png" alt="" className="inline" style={{ height: '0.85em', width: 'auto', marginRight: '0.15em', verticalAlign: '-0.1em' }} />xpander.ai
              </a>
              {' '}agent backend platform
            </span>
          </p>
        </motion.div>

        {/* Top Agents Grid - Enhanced Design */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {topAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              variants={itemVariants}
              className="group"
            >
              <HomeAgentCard 
                agent={agent} 
                delay={index * 0.1}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Explore Directory Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            to="/agents" 
            className="inline-flex items-center gap-2 text-base text-[#6B4EFF] hover:text-[#6B4EFF]/80 font-medium transition-colors duration-200"
          >
            Explore all agents
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #6B4EFF 0%, #8B5CF6 100%);
        }
        .gradient-text {
          background: linear-gradient(135deg, #6B4EFF 0%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hover-lift {
          transition: transform 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
} 