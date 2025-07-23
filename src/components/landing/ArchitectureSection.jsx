import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot, Server, Database, Eye, Wrench, ArrowRight, GitBranch, Zap, Brain, Workflow, Shield, Clock, FileSearch } from 'lucide-react';

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-full ml-2 w-64">
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-4"></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default function ArchitectureSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            A seamless architecture that connects your Slack workspace to your AI agents, with intelligent message routing and optional enterprise features
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            {/* Main grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              
              {/* Slack Agent - spans 3 columns */}
              <div className="lg:col-span-3 flex">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200 flex-1 h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Slack Agent</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Receives messages and threads from your workspace</p>
                  <div className="space-y-2">
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-700">Smart Invocation</p>
                      <p className="text-xs text-gray-500 mt-1">Invoke agents only when needed</p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-700">User-Authenticated Actions</p>
                      <p className="text-xs text-gray-500 mt-1">Connect GitHub, Jira, GDrive with user permissions</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Arrow - 1 column */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <p className="text-xs text-gray-500 mt-2 font-medium">Message</p>
                  <p className="text-xs text-gray-500">Transformation</p>
                </div>
              </div>

              {/* Agent Runtime + Managed Runtime container - spans 3 columns */}
              <div className="lg:col-span-3 flex">
                <div className="flex-1 flex">
                  {/* Agent Runtime */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200 flex-1 h-full flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Agent Runtime</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Your choice of AI framework</p>
                    <div className="space-y-3 flex-1">
                      <div className="bg-white/70 rounded-lg p-3 border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-medium text-gray-700">Serverless Runtime</p>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Available</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">Preconfigured AI connectivity & managed agent loop</p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-gray-400">
                            <img src="/logos/agno.png" alt="" className="inline opacity-70" style={{ height: '0.75em', width: 'auto', marginRight: '0.1em', verticalAlign: '-0.1em' }} />Agno Runtime
                          </span>
                          <span className="text-[10px] text-gray-400">•</span>
                          <span className="text-[10px] text-gray-400">OpenAI Models</span>
                        </div>
                      </div>
                      <div className="bg-white/70 rounded-lg p-3 border border-gray-200 opacity-60">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-medium text-gray-700">Custom Agent</p>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span className="text-xs text-amber-600 font-medium">Coming Soon</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Bring your own agent code with full control</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Arrow - 1 column */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>

              {/* xpander.ai Backend Platform - spans 4 columns */}
              <div className="lg:col-span-4 flex">
                <div className="relative flex-1 flex">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200 border-dashed flex flex-col flex-1"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                        <Server className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900" style={{ whiteSpace: 'nowrap' }}>
                        <img src="/xpander-logo-purple.png" alt="" className="inline" style={{ height: '0.85em', width: 'auto', marginRight: '0.15em', verticalAlign: '-0.1em' }} />xpander.ai Backend Platform
                      </h3>
                    </div>
                    
                    {/* Services in a 2-column grid */}
                    <div className="grid grid-cols-2 gap-2.5 flex-1">
                      <Tooltip content="Library of 200+ preconfigured AI tools and MCP Generator for custom tool creation">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <Wrench className="w-4 h-4 text-purple-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">MCP Tools</p>
                          </div>
                        </motion.div>
                      </Tooltip>
                      
                      <Tooltip content="Stores threads and message objects per agent for comprehensive logging, monitoring, troubleshooting, and seamless context switching between user threads">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <Database className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">Messages Store</p>
                          </div>
                        </motion.div>
                      </Tooltip>
                      
                      <Tooltip content="Monitor agent execution at both the execution level and thread level for complete visibility into agent behavior">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">Observability</p>
                          </div>
                        </motion.div>
                      </Tooltip>
                      
                      <Tooltip content="Stream additional events to agents from Agent-to-Agent (A2A) communications, MCP, and REST API integrations">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">Event Streaming</p>
                          </div>
                        </motion.div>
                      </Tooltip>
                      
                      <Tooltip content="Intelligent task orchestration and management for AI workloads with built-in scheduling and prioritization">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <Brain className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">AI Task Mgmt</p>
                          </div>
                        </motion.div>
                      </Tooltip>
                      
                      <Tooltip content="Dependency enforcement for autonomous behavior - configure rules for tool execution and control how agents interact with tools">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <Shield className="w-4 h-4 text-red-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">Tool Guardrails</p>
                          </div>
                        </motion.div>
                      </Tooltip>
                      
                      <Tooltip content="Override and customize tool schemas to modify parameters, add constraints, or extend functionality for specific use cases">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <Wrench className="w-4 h-4 text-orange-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">Schema Overrides</p>
                          </div>
                        </motion.div>
                      </Tooltip>
                      
                      <Tooltip content="Automated deployment pipelines with continuous integration and delivery for agent updates">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <Workflow className="w-4 h-4 text-purple-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">CI/CD</p>
                          </div>
                        </motion.div>
                      </Tooltip>
                      
                      <Tooltip content="Git-based version control for agent code with rollback capabilities and change tracking">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <GitBranch className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">Version Control</p>
                          </div>
                        </motion.div>
                      </Tooltip>
                      
                      <Tooltip content="Advanced Retrieval-Augmented Generation with semantic search, vector databases, and intelligent document chunking for context-aware AI responses">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <FileSearch className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">Agentic RAG</p>
                          </div>
                        </motion.div>
                      </Tooltip>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Smart Message Routing</h4>
            <p className="text-sm text-gray-600">Intelligently routes messages to your agents only when needed</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Framework Agnostic</h4>
            <p className="text-sm text-gray-600">Works with any AI framework or custom agent implementation</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Server className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Enterprise Ready</h4>
            <p className="text-sm text-gray-600">Optional managed runtime with tools, storage, and observability</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}