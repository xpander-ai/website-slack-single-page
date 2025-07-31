import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Globe, ArrowRight, FileCode } from 'lucide-react';

export default function AgentCard({ agent, delay = 0, showDetails = true }) {
  if (!agent) return null;

  const handleSlackInstall = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (agent.slackInstallUrl) {
      window.open(agent.slackInstallUrl, '_blank', 'width=600,height=700,scrollbars=yes,resizable=yes');
    } else {
      // Fallback URL
      window.open('https://slack.com/oauth/v2/authorize?client_id=your-client-id&scope=chat:write,app_mentions:read', '_blank');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2, delay }}
        className="group relative h-full"
      >
        <Link to={`/agents/${agent.slug}`} className="block h-full">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-150 p-6 h-full min-h-[280px] flex flex-col relative overflow-hidden group-hover:border-[#6B4EFF]/20 hover-lift cursor-pointer">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6B4EFF]/10 to-blue-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-all duration-150"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#6B4EFF]/5 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-all duration-150"></div>
        
        <div className="relative z-10 flex flex-col h-full">

          {/* Agent icon, name and description */}
          <div className="mb-4 flex-shrink-0">
            <div className="flex items-start gap-3 mb-3">
              {agent.logo && (
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                  <img 
                    src={agent.logo} 
                    alt={`${agent.name} logo`}
                    className={`w-full h-full ${agent.logo.endsWith('.svg') ? 'object-contain p-1' : 'object-cover'}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-lg font-semibold">' + agent.name.charAt(0) + '</div>';
                    }}
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#6B4EFF] transition-all duration-150">
                  {agent.name}
                </h3>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-all duration-150">
              {agent.shortDescription}
            </p>
          </div>

          {/* Skills */}
          {agent.skills && agent.skills.length > 0 && (
            <div className="mb-4 flex-shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {agent.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="bg-gradient-to-r from-[#6B4EFF]/10 to-blue-500/10 text-[#6B4EFF] border border-[#6B4EFF]/20 text-xs px-2.5 py-1 font-medium rounded-full"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Author info */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-4 flex-shrink-0">
            <span>By</span>
            {agent.authorLink ? (
              <a 
                href={agent.authorLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6B4EFF] hover:underline font-medium flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                {agent.author}
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="font-medium text-gray-900">{agent.author}</span>
            )}
          </div>

          {/* Flexible spacer */}
          <div className="flex-1"></div>

          {/* A2A URL Section - Coming Soon */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl p-3 mb-4 flex-shrink-0 border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-lg flex items-center justify-center">
                <Globe className="w-3 h-3 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-medium text-gray-600">Agent-to-Agent URL</p>
                  <Badge variant="secondary" className="bg-gray-200 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                    Coming Soon
                  </Badge>
                </div>
                <p className="text-gray-400 font-mono text-xs">Coming soon</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSlackInstall(e);
              }}
              className="w-full gradient-bg hover:opacity-90 text-white font-semibold transition-all duration-150 rounded-xl shadow-md hover:shadow-lg"
              size="sm"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
              </svg>
              Add to Slack
            </Button>
            {agent.templateId && (
              <a
                href={`https://app.xpander.ai/slack_agents/new?templateId=${agent.templateId}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-center text-[#6B4EFF] hover:text-[#6B4EFF]/80 font-medium flex items-center justify-center gap-1 py-1 transition-colors"
              >
                <FileCode className="w-3 h-3" />
                Use Template
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
    </motion.div>

    <style jsx>{`
      .hover-lift {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .hover-lift:hover {
        transform: translateY(-8px);
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `}</style>
    </>
  );
} 