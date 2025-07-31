
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, User, PlusCircle, Loader, FileText, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Function to generate realistic timestamps
const generateTimestamp = (offsetSeconds = 0) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() - offsetSeconds);
  
  // If less than 60 seconds ago, show "Just now"
  if (offsetSeconds < 60) {
    return 'Just now';
  }
  
  // Otherwise show time
  return now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-3 py-1">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
  </div>
);

// Slack-style typing indicator with breathing effect
const SlackTypingIndicator = ({ user }) => (
  <div className="flex items-center gap-1.5 text-xs text-gray-500 italic">
    <span>{user} is thinking</span>
    <div className="flex items-center gap-0.5">
      <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse opacity-75"></div>
      <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse opacity-75" style={{ animationDelay: '200ms' }}></div>
      <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse opacity-75" style={{ animationDelay: '400ms' }}></div>
    </div>
  </div>
);

// Demo scenarios
const demoScenarios = [
  {
    id: 'file-processing',
    conversationFlow: [
      { type: 'reset', delay: 0 },
      {
        type: 'message',
        delay: 1000,
        payload: {
          user: 'Thomas Anderson',
          text: 'Can you complete this excel for me?',
          components: [
            { type: 'file_attachment', fileName: 'AI_Startups_Q3.xlsx', fileSize: '15 KB' }
          ],
          reaction: null,
        }
      },
      { type: 'add_reaction', delay: 10, payload: { messageIndex: 0, reaction: '⏳' } },
      { type: 'thinking', delay: 800, payload: { active: true } },
      {
        type: 'message',
        delay: 2500,
        payload: {
          bot: true,
          isXpander: true,
          user: 'xpander.ai',
          isTyping: true
        }
      },
      { type: 'wait', delay: 3000 },
      {
        type: 'update_message',
        delay: 0,
        payload: {
          messageIndex: 1,
          updates: {
            text: 'Of course. It looks like the "Number of Employees" column is missing. I will now work on finding that information for each company.',
            isTyping: false
          }
        }
      },
      { type: 'thinking', delay: 10, payload: { active: false } },
      { type: 'update_reaction', delay: 100, payload: { messageIndex: 0, reaction: '✅' } },
      { type: 'thinking', delay: 1500, payload: { active: true } },
      { type: 'wait', delay: 2500 },
      {
        type: 'message',
        delay: 1000,
        payload: {
          bot: true,
          isXpander: true,
          user: 'xpander.ai',
          isTyping: true
        }
      },
      { type: 'wait', delay: 2500 },
      {
        type: 'update_message',
        delay: 0,
        payload: {
          messageIndex: 2,
          updates: {
            isTyping: false,
            components: [
              { type: 'paragraph', content: "All done! I've updated the file with the employee counts." },
              { type: 'file_attachment', fileName: 'AI_Startups_Q3_completed.xlsx', fileSize: '18 KB' },
              { type: 'actions', buttons: [{ text: 'Download Updated File', icon: Download }] }
            ]
          }
        }
      },
      { type: 'thinking', delay: 500, payload: { active: false } },
      { type: 'wait', delay: 6000 }  // Give readers time to read the conversation
    ]
  },
  {
    id: 'api-debugging',
    conversationFlow: [
      { type: 'reset', delay: 0 },
      {
        type: 'message',
        delay: 1000,
        payload: {
          user: 'Alex Chen',
          text: 'Hey, anyone seeing 500 errors on the payment API? Users are complaining they can\'t checkout.',
          time: '3:24 PM'
        }
      },
      {
        type: 'message',
        delay: 2000,
        payload: {
          user: 'Jordan Kim',
          text: 'Yeah, I\'m getting reports too. Let me check the logs...',
          time: '3:25 PM'
        }
      },
      { type: 'thinking', delay: 1000, payload: { active: true } },
      {
        type: 'message',
        delay: 3000,
        payload: {
          bot: true,
          isXpander: true,
          user: 'xpander.ai',
          isTyping: true
        }
      },
      { type: 'wait', delay: 3500 },
      {
        type: 'update_message',
        delay: 0,
        payload: {
          messageIndex: 2,
          updates: {
            isTyping: false,
            components: [
              { type: 'paragraph', content: 'I\'ve already analyzed the logs. There\'s a database connection timeout in the payment service:' },
              {
              type: 'code_block',
                content: '[ERROR] payment-service-prod\nConnection timeout: database pool exhausted\nDuration: 30.2s (timeout: 30s)'
              },
              { type: 'paragraph', content: 'The connection pool is maxed out. This started 23 minutes ago.' },
              { type: 'actions', buttons: [{ text: 'Scale DB Pool', icon: PlusCircle }, { text: 'View Full Logs', icon: FileText }] }
            ]
          }
        }
      },
      { type: 'thinking', delay: 10, payload: { active: false } },
      { type: 'wait', delay: 2000 },
      {
        type: 'message',
        delay: 1500,
        payload: {
          user: 'Jordan Kim',
          text: 'Whoa, how did this just happen?',
          time: '3:26 PM'
        }
      },
      {
        type: 'message',
        delay: 2500,
        payload: {
          user: 'Alex Chen',
          text: 'Remember the AWS MCP EKS Agent we built? I added the Slack App with xpander.ai in 10 minutes, cool ah? 😎',
          time: '3:27 PM'
        }
      },
      { type: 'wait', delay: 6000 }  // Give readers time to read the conversation
    ]
  }
];

export default function HeroSection() {
  const [currentDemo, setCurrentDemo] = useState(1);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const chatContainerRef = useRef(null);
  const flowIndexRef = useRef(0);
  const timeoutRef = useRef(null);
  const demoSwitchTimeoutRef = useRef(null);

  const processFlow = () => {
    if (isPaused) {
      // If paused, retry after a short delay
      timeoutRef.current = setTimeout(() => {
        processFlow();
      }, 100);
      return;
    }

    const currentFlow = demoScenarios[currentDemo].conversationFlow;

    if (flowIndexRef.current >= currentFlow.length) {
      demoSwitchTimeoutRef.current = setTimeout(() => {
        if (!isPaused) {
          setCurrentDemo(prev => (prev + 1) % demoScenarios.length);
          flowIndexRef.current = 0;
        }
      }, 500);
      return;
    }

    const step = currentFlow[flowIndexRef.current];
    const adjustedDelay = Math.max(20, step.delay * 0.2);

    timeoutRef.current = setTimeout(() => {
      switch (step.type) {
        case 'reset':
          setDisplayedMessages([]);
          setIsThinking(false);
          break;
        case 'message':
          setDisplayedMessages(prev => [...prev, step.payload]);
          break;
        case 'add_reaction':
          setDisplayedMessages(prev =>
            prev.map((msg, idx) =>
              idx === step.payload.messageIndex
                ? { ...msg, reaction: step.payload.reaction }
                : msg
            )
          );
          break;
        case 'update_reaction':
          setDisplayedMessages(prev =>
            prev.map((msg, idx) =>
              idx === step.payload.messageIndex
                ? { ...msg, reaction: step.payload.reaction }
                : msg
            )
          );
          break;
        case 'thinking':
          setIsThinking(step.payload.active);
          break;
        case 'update_message':
          setDisplayedMessages(prev =>
            prev.map((msg, idx) =>
              idx === step.payload.messageIndex
                ? { ...msg, ...step.payload.updates }
                : msg
            )
          );
          break;
        case 'wait':
          break;
        default:
          console.warn('Unknown step type:', step.type);
          break;
      }
      flowIndexRef.current++;
      processFlow();
    }, adjustedDelay);
  };

  useEffect(() => {
    flowIndexRef.current = 0;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (demoSwitchTimeoutRef.current) {
      clearTimeout(demoSwitchTimeoutRef.current);
    }

    // Defer the animation start to ensure the page is interactive first.
    // This prevents the animation from blocking the initial scroll.
    const startTimeout = setTimeout(() => {
      processFlow();
    }, 200); // A small delay is enough to free the main thread.

    return () => {
      clearTimeout(startTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (demoSwitchTimeoutRef.current) {
        clearTimeout(demoSwitchTimeoutRef.current);
      }
    };
  }, [currentDemo]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [displayedMessages]);

  const nextDemo = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (demoSwitchTimeoutRef.current) {
      clearTimeout(demoSwitchTimeoutRef.current);
    }
    setCurrentDemo((prev) => (prev + 1) % demoScenarios.length);
  };

  const prevDemo = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (demoSwitchTimeoutRef.current) {
      clearTimeout(demoSwitchTimeoutRef.current);
    }
    setCurrentDemo((prev) => (prev - 1 + demoScenarios.length) % demoScenarios.length);
  };

  const handleQuickStartClick = () => {
    const section = document.getElementById('how-it-works');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSlackExamplesClick = () => {
    const section = document.getElementById('use-cases');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const renderMessageText = (message) => {
    if (!message.text) return null;
    return <div className="text-xs sm:text-sm leading-relaxed text-gray-600 break-words overflow-hidden">{message.text}</div>;
  };

  const renderMessageComponents = (components) => (
    <div className="space-y-2 sm:space-y-3 mt-2">
      {components.map((component, index) => {
        switch (component.type) {
          case 'paragraph':
            return <p key={index} className="text-xs sm:text-sm text-gray-700 break-words overflow-hidden">{component.content}</p>;
          case 'file_attachment':
            return (
              <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-md">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 hover:text-indigo-600 cursor-pointer truncate">{component.fileName}</p>
                  <p className="text-xs text-gray-500">{component.fileSize}</p>
                </div>
              </div>
            );
          case 'code_block':
            return (
              <div key={index} className="bg-gray-900 rounded-lg p-2 sm:p-3 mt-2 overflow-hidden">
                <pre className="text-xs text-gray-300 font-mono break-words whitespace-pre-wrap overflow-hidden">{component.content}</pre>
              </div>
            );
          case 'actions':
            return (
              <div key={index} className="flex gap-2 pt-1 flex-wrap">
                {component.buttons.map((button, i) => (
                  <Button key={i} size="sm" variant="outline" className="bg-white text-xs">
                    {button.icon && <button.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />}
                    <span className="truncate">{button.text}</span>
                  </Button>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );

  const getUserAvatar = (username) => {
    const userColors = {
      'Thomas Anderson': 'bg-blue-500',
      'Alex Chen': 'bg-green-500',
      'Jordan Kim': 'bg-purple-500'
    };

    const getInitials = (name) => {
      const parts = name.split(' ');
      if (parts.length > 1) {
        return parts.map(n => n[0]).join('').toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    };

    const colorClass = userColors[username] || 'bg-gray-500';
    const initials = getInitials(username);

    return { colorClass, initials };
  };

  return (
    <section className="flex items-center justify-center px-4 lg:px-8 bg-white pt-24 pb-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16 items-start lg:items-center">
          {/* Left Column - Content - Shows first on mobile */}
          <div className="lg:col-span-6 flex flex-col justify-center order-1">
            <div className="space-y-6 lg:space-y-10">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                  Make your AI agent <span className="gradient-text">Slack-native</span> in under an hour.
                </h1>

                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed space-y-3">
                  <p className="font-medium text-gray-800">Why teams choose <a href="/agents" className="text-[#6B4EFF] hover:underline">xpander.ai</a>:</p>
                  <ul className="space-y-2 text-sm sm:text-base md:text-lg lg:text-lg">
                    <li className="flex items-start gap-2"><span className="text-purple-500 mt-1.5 flex-shrink-0"> • </span><span>Smart Engage saves 80%+ on LLM costs by pre-screening messages before invoking your agent</span></li>
                    <li className="flex items-start gap-2"><span className="text-purple-500 mt-1.5 flex-shrink-0"> • </span><span>Built-in OAuth handles user authentication for dozens of SaaS platforms like GitHub, Jira, Google, and many more. No security code needed</span></li>
                    <li className="flex items-start gap-2"><span className="text-purple-500 mt-1.5 flex-shrink-0"> • </span><span>Works with any AI framework or use our <a href="#frameworks" className="text-[#6B4EFF] hover:underline">pre-configured agents</a> (Agno + OpenAI/Bedrock)</span></li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="flex flex-col items-center sm:items-start">
                  <Button
                    size="default"
                    onClick={handleQuickStartClick}
                    className="gradient-bg hover-lift text-white font-semibold"
                  >
                    Create & Deploy Agent Now
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">5 minutes • No credit card required</p>
                </div>
                <Button
                  size="default"
                  variant="outline"
                  onClick={handleSlackExamplesClick}
                  className="text-[#6B4EFF] border border-gray-200 hover:border-[#6B4EFF] hover:bg-[#F9F8FF] font-semibold"
                >
                  Slack Apps examples →
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo - Shows second on mobile */}
          <div className="lg:col-span-6 flex justify-center order-2 mt-8 lg:mt-0">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg relative group">
              {/* Navigation Arrows - Visible on mobile, hover on desktop */}
              <button
                onClick={prevDemo}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-150 block lg:opacity-0 lg:group-hover:opacity-100"
                aria-label="Previous demo"
                style={{ touchAction: 'manipulation' }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>

              <button
                onClick={nextDemo}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-150 block lg:opacity-0 lg:group-hover:opacity-100"
                aria-label="Next demo"
                style={{ touchAction: 'manipulation' }}
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>

              <div 
                className="bg-white rounded-xl lg:rounded-2xl shadow-xl overflow-hidden hover-lift"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Slack Mockup */}
                <div className="relative bg-[#3F0E40] p-2 sm:p-3 lg:p-4">
                  {/* Slack Header */}
                  <div className="flex items-center justify-between mb-3 lg:mb-4">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="flex gap-1 lg:gap-2">
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-white text-xs lg:text-sm font-medium">
                        {currentDemo === 0 ? '#agent-demo' : '#dev-alerts'}
                      </span>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="bg-white rounded-lg p-2 sm:p-3 lg:p-4 h-[280px] sm:h-[320px] lg:h-[400px] flex flex-col overflow-hidden">
                    <div ref={chatContainerRef} className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4 pb-2 sm:pb-3 overflow-y-auto scroll-smooth">
                      {displayedMessages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="flex gap-2 sm:gap-3 items-start min-w-0"
                        >
                          {message.bot ? (
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden ${isThinking && message.isXpander ? 'animate-pulse' : ''}`}>
                              <img src="/xpander-logo-purple.png" alt="xpander.ai" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            (() => {
                              const { colorClass, initials } = getUserAvatar(message.user);
                              return (
                                <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass} text-white font-semibold text-xs lg:text-sm`}>
                                  {initials}
                                </div>
                              );
                            })()
                          )}

                          <div className="flex-1 min-w-0 overflow-hidden">
                            <div className="flex items-center gap-1 sm:gap-2 mb-1">
                              <span className={`font-semibold text-xs sm:text-sm text-gray-900 truncate ${isThinking && message.bot && message.isXpander ? 'animate-pulse' : ''}`}>{message.user}</span>
                              <span className="text-xs text-gray-500 flex-shrink-0">{generateTimestamp(Math.max(0, (displayedMessages.length - index - 1) * 30))}</span>
                            </div>
                            <div className={`overflow-hidden ${isThinking && message.bot && message.isXpander ? 'animate-pulse' : ''}`}>
                              {message.isTyping ? (
                                <TypingIndicator />
                              ) : (
                                <>
                                  {renderMessageText(message)}
                                  {message.components && renderMessageComponents(message.components)}
                                </>
                              )}
                            </div>
                            {message.reaction && (
                              <div className="mt-1 sm:mt-2">
                                <span className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs">
                                  {message.reaction}
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Message Input Area */}
                    <div className="mt-auto pt-1 sm:pt-2 flex-shrink-0">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-1.5 sm:p-2 lg:p-3">
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <span className="truncate">Message {currentDemo === 0 ? '#agent-demo' : '#dev-alerts'}</span>
                        </div>
                      </div>

                      {/* Thinking Indicator - Below Input */}
                      {isThinking && (
                        <div className="mt-2">
                          <SlackTypingIndicator user="xpander.ai" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {demoScenarios.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentDemo(index)}
                    className={`w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full transition-colors ${
                      index === currentDemo ? 'bg-[#6B4EFF]' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to demo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
