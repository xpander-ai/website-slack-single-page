import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Check, Sparkles, Globe } from 'lucide-react';
import TopBar from '../components/landing/TopBar';
import Footer from '../components/landing/Footer';
import agentsApi from '@/services/agentsApi';

export default function AgentDetail() {
  const { slug } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAgent = async () => {
      try {
        setLoading(true);
        const agentData = await agentsApi.fetchAgent(slug);
        setAgent(agentData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadAgent();
    }
  }, [slug]);

  const handleSlackInstall = () => {
    if (agent?.slackInstallUrl) {
      window.open(agent.slackInstallUrl, '_blank', 'width=600,height=700,scrollbars=yes,resizable=yes');
    } else {
      window.open('https://slack.com/oauth/v2/authorize?client_id=your-client-id&scope=chat:write,app_mentions:read', '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        <div className="pt-20 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
                </div>
                <div className="h-64 bg-gray-200 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        <div className="pt-20 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Agent Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The requested agent could not be found.'}</p>
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/agents">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Directory
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      
      <div className="pt-20 pb-16 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="mb-8"
          >
            <Link 
              to="/agents" 
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#6B4EFF] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to agents
            </Link>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Agent Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Agent Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6B4EFF]/10 to-blue-500/10 flex items-center justify-center border border-[#6B4EFF]/10">
                      {agent.logo ? (
                        <img 
                          src={agent.logo} 
                          alt={`${agent.name} logo`}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<div class="text-xl font-bold text-[#6B4EFF]">${agent.name.charAt(0)}</div>`;
                          }}
                        />
                      ) : (
                        <div className="text-xl font-bold text-[#6B4EFF]">
                          {agent.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        {agent.name}
                      </h1>
                      <p className="text-sm text-gray-500 mt-1">
                        by{' '}
                        {agent.authorLink ? (
                          <a 
                            href={agent.authorLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#6B4EFF] hover:text-[#6B4EFF]/80 font-medium inline-flex items-center gap-1"
                          >
                            {agent.author}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="font-medium text-gray-700">{agent.author}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {agent.shortDescription}
                  </p>

                  {/* CTA Button */}
                  <Button
                    onClick={handleSlackInstall}
                    size="lg"
                    className="gradient-bg hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-150"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                    </svg>
                    Add to Slack
                  </Button>
                </div>

                {/* About */}
                {agent.fullDescription && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="mb-12"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-[#6B4EFF]" />
                      About
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {agent.fullDescription}
                    </p>
                  </motion.div>
                )}

                {/* Key Features */}
                {agent.capabilities && agent.capabilities.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Key Features
                    </h2>
                    <div className="space-y-3">
                      {agent.capabilities.map((capability, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-[#6B4EFF] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{capability}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Right Column - Agent Card */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sticky top-32"
              >
                {/* A2A URL Section */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-3">Agent-to-Agent URL</h3>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Globe className="w-3 h-3 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-400 font-mono text-xs truncate">Coming soon</p>
                      </div>
                      <Badge variant="secondary" className="bg-gray-200 text-gray-500 text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                        Soon
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                {agent.skills && agent.skills.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-3">Agent Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="bg-gradient-to-r from-[#6B4EFF]/10 to-blue-500/10 text-[#6B4EFF] border border-[#6B4EFF]/20 text-xs px-3 py-1.5 font-medium rounded-full"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #6B4EFF 0%, #8B5CF6 100%);
        }
      `}</style>
    </div>
  );
}