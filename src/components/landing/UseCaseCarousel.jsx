
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Code, FileText, GitPullRequest, Shield, Zap, Info, ArrowRight, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Function to generate realistic timestamps
const generateTimestamp = (offsetMinutes = 0) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - offsetMinutes);
  
  return now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};


const useCases = [
  {
    id: 'user-auth',
    title: 'User-Authenticated Actions',
    description: 'Let users connect their accounts (GitHub, Jira, GDrive) for personalized actions, scoped to their own permissions.',
    mockup: {
      channel: '#dm-with-github-agent',
      messages: [
        {
          user: 'liam.g',
          avatarColor: 'bg-teal-500',
          initials: 'LG',
          text: '@xpander.ai can you show me my open pull requests?'
        },
        {
          bot: true, user: 'xpander.ai', isEphemeral: true,
          components: [
            {
                type: 'feature_paragraph',
                content: 'To do that, I need to connect to your GitHub account. This will allow me to access your repositories and PRs on your behalf.',
                feature: {
                    name: "Per-User OAuth Flow",
                    description: "xpander.ai handles the OAuth 2.0 flow for each user, securely storing tokens and mapping them to Slack user IDs."
                }
            },
            {
              type: 'feature_actions',
              buttons: [{ text: 'Connect GitHub Account', icon: UserCheck }],
              feature: {
                  name: "Secure Credential Storage",
                  description: "User tokens are encrypted and stored in a secure vault, scoped only to the user who provided them."
              }
            }
          ]
        },
        {
          bot: true, user: 'xpander.ai',
          components: [
            {
              type: 'paragraph',
              content: 'Great, you\'re connected! Here are your open PRs:'
            },
            {
                type: 'feature_list',
                items: [
                    { icon: GitPullRequest, text: '#231 - Fix: Login button alignment (webapp)' },
                    { icon: GitPullRequest, text: '#229 - Feat: Add new data export endpoint (api)' }
                ],
                feature: {
                    name: "On-Behalf-Of API Calls",
                    description: "Once authenticated, the agent uses the user's token to make API calls, ensuring all actions respect their individual permissions."
                }
            }
          ]
        }
      ]
    }
  },
  {
    id: 'dev-assist',
    title: 'Developer Assistant',
    description: 'Automate code reviews, CI checks, and documentation lookups right from Slack.',
    mockup: {
      channel: '#pull-requests',
      messages: [
        {
          user: 'maya.d',
          avatarColor: 'bg-green-500',
          initials: 'MD',
          text: 'Hey @xpander.ai, can you review this PR for me?',
          attachment: { type: 'link', text: 'GitHub: #134 - Feat: Add User Caching' },
        },
        {
          bot: true, user: 'xpander.ai',
          components: [
            {
              type: 'paragraph',
              content: 'On it. I\'m analyzing the PR now...',
            },
            {
                type: 'feature_paragraph',
                content: 'Here\'s the summary of `PR #134`:',
                feature: {
                    name: "Link Unfurling",
                    description: "xpander.ai automatically processes links from platforms like GitHub, providing rich context without manual lookups."
                }
            },
            {
              type: 'code_block',
              content: `+ redis.set(user_id, user_data)\n- # db.fetch_user(user_id)\nAnalysis: Looks good, but there's no TTL on the Redis key. This could lead to stale data.`
            },
            {
                type: 'feature_actions',
                buttons: [{ text: 'Add TTL (3600s)' }, { text: 'Approve' }, { text: 'Request Changes' }],
                feature: {
                    name: "Post-Processor to Buttons",
                    description: "Convert any agent output (text, JSON) into interactive Slack buttons, forms, and modals."
                }
            }
          ]
        }
      ]
    }
  },
  {
    id: 'incident-response',
    title: 'Incident Response',
    description: 'Spin up war rooms, page on-call, and pull diagnostics in seconds.',
    mockup: {
      channel: '#alerts-prod',
      messages: [
        {
            user: 'Datadog',
            isApp: true,
            avatarIcon: <Zap className="w-5 h-5 text-white" />,
            avatarColor: 'bg-orange-500',
            text: '[P1] High API Latency Detected on `payment-gateway`',
        },
        {
          bot: true, user: 'xpander.ai',
          components: [
            {
                type: 'feature_paragraph',
                content: 'P1 Incident declared. A new channel #inc-high-latency has been created and the on-call engineer has been paged.',
                feature: {
                    name: "Trigger & React",
                    description: "Configure agents to trigger on specific keywords, user mentions, or even messages from other apps."
                }
            },
            {
              type: 'paragraph',
              content: 'I am gathering initial diagnostics now...'
            },
          ]
        }
      ]
    }
  },
  {
    id: 'security-copilot',
    title: 'Security Copilot',
    description: 'Analyze file uploads and monitor conversations for sensitive data leaks.',
    mockup: {
      channel: '#general',
      messages: [
        {
          user: 'dave.c',
          avatarColor: 'bg-blue-500',
          initials: 'DC',
          text: 'Hey team, here are the client keys for the upcoming migration.',
          attachment: { type: 'file', name: 'client_access_keys.csv' },
        },
        {
          bot: true, user: 'xpander.ai',
          isEphemeral: true,
          components: [
             {
                type: 'feature_paragraph',
                content: 'This message was deleted. I detected that `client_access_keys.csv` may contain sensitive credentials. Sharing keys in public channels is against our security policy.',
                feature: {
                    name: "Unified Media Pipeline",
                    description: "Agents can inspect files, transcribe audio, and analyze images through a single, secure pipeline."
                }
            },
            {
              type: 'paragraph',
              content: 'A notification has been sent to the security team.'
            },
          ]
        }
      ]
    }
  }
];

const FeatureTooltip = ({ feature, children }) => (
    <TooltipProvider delayDuration={100}>
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="relative inline-block">
                    {children}
                    <Info className="absolute -top-1 -right-2 w-3.5 h-3.5 text-blue-500 bg-white rounded-full p-0.5 cursor-pointer" />
                </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs bg-gray-800 text-white border-gray-700">
                <p className="font-bold text-base">{feature.name}</p>
                <p>{feature.description}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const renderMessageContent = (components, isMobile) => ( // Pass isMobile flag
  <div className="space-y-3">
    {components.map((component, index) => {
      const content = (
          <>
            {component.type === 'paragraph' && (
              <div className="text-sm text-gray-700 prose prose-sm max-w-none">
                <ReactMarkdown>{component.content}</ReactMarkdown>
              </div>
            )}
            {component.type === 'feature_paragraph' && (
              <div className="text-sm text-gray-700 prose prose-sm max-w-none">
                <ReactMarkdown>{component.content}</ReactMarkdown>
              </div>
            )}
            {component.type === 'code_block' && (
              <div className="bg-gray-800 rounded-md p-3 my-2">
                <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">{component.content}</pre>
              </div>
            )}
            {component.type === 'feature_actions' && (
              <div className="flex gap-2 pt-1 flex-wrap">
                {component.buttons.map((button, i) => (
                  <Button key={i} size="sm" variant="outline" className="text-xs">
                    {button.icon && <button.icon className="w-3 h-3 mr-1.5" />}
                    {button.text}
                  </Button>
                ))}
              </div>
            )}
            {component.type === 'feature_list' && (
                <ul className="space-y-2 mt-2">
                    {component.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-800">
                            {item.icon && <item.icon className="w-4 h-4 text-gray-500 flex-shrink-0" />}
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            )}
          </>
      );

      // Conditionally render Tooltip only on non-mobile devices
      if (component.feature && !isMobile) {
          return <FeatureTooltip key={index} feature={component.feature}>{content}</FeatureTooltip>
      }
      return <div key={index}>{content}</div>;
    })}
  </div>
);


// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-3 py-1">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
  </div>
);

// Message component with animation
const AnimatedMessage = ({ message, index, isActive }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [messageReady, setMessageReady] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsVisible(false);
      setShowTyping(false);
      setMessageReady(false);
      return;
    }

    const baseDelay = index * 800; // Stagger messages by 800ms
    
    // Show message after delay
    const showTimer = setTimeout(() => {
      if (message.bot) {
        // Show typing indicator first for bot messages
        setShowTyping(true);
        setIsVisible(true);
        
        // Then show actual message after typing duration
        setTimeout(() => {
          setShowTyping(false);
          setMessageReady(true);
        }, 1500);
      } else {
        // Show user messages immediately
        setIsVisible(true);
        setMessageReady(true);
      }
    }, baseDelay);

    return () => clearTimeout(showTimer);
  }, [index, isActive, message.bot]);

  const timestamp = generateTimestamp(message.timeOffset || (5 - index));

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 items-start ${message.isEphemeral ? 'opacity-80' : ''}`}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${message.bot ? 'bg-white p-1' : message.avatarColor}`}>
        {message.bot && (
          <img src="/xpander-logo-purple.png" alt="xpander.ai" className="w-full h-full object-cover rounded-md" />
        )}
        {message.avatarIcon}
        {message.initials && <span className="text-white font-bold text-sm">{message.initials}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900">{message.user}</span>
          <span className="text-xs text-gray-500">{timestamp}</span>
          {message.isApp && <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-sm font-medium">APP</span>}
        </div>
        
        {showTyping && message.bot ? (
          <TypingIndicator />
        ) : (
          messageReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {message.text && (
                <div className="text-sm text-gray-700 prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      p: ({children}) => {
                        if (typeof children === 'string') {
                          const parts = children.split(/(@xpander\.ai)/g);
                          return (
                            <p>
                              {parts.map((part, index) =>
                                part === '@xpander.ai' ?
                                  <span key={index} className="text-blue-600 font-medium">@xpander.ai</span> :
                                  part
                              )}
                            </p>
                          );
                        }
                        return <p>{children}</p>;
                      }
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              )}
              {message.attachment?.type === 'link' && <a href="#" className="text-sm text-blue-600 hover:underline">{message.attachment.text}</a>}
              {message.attachment?.type === 'file' && (
                <div className="mt-2 flex items-center gap-2 p-2 bg-gray-100 rounded-md border border-gray-200">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-800">{message.attachment.name}</span>
                </div>
              )}
              {message.components && renderMessageContent(message.components, false)}
              {message.isEphemeral && (
                <p className="text-xs text-gray-500 italic mt-2">Only visible to you</p>
              )}
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
};

export default function UseCaseCarousel() {
  const [activeTab, setActiveTab] = useState(0);
  const autoPlayRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view on component mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Auto-play carousel only when in view and not paused
  useEffect(() => {
    if (isInView && !isPaused && !autoPlayRef.current) {
      autoPlayRef.current = setInterval(() => {
        setActiveTab(prev => (prev + 1) % useCases.length);
      }, 8000); // Change every 8 seconds
    }

    if (isPaused || !isInView) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isInView, isPaused, useCases.length]);

  // Intersection observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 } // Start when 30% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const nextTab = () => {
    stopAutoPlay();
    setActiveTab(prev => (prev + 1) % useCases.length);
  };

  const prevTab = () => {
    stopAutoPlay();
    setActiveTab(prev => (prev - 1 + useCases.length) % useCases.length);
  };

  const handleTabClick = (index) => {
    stopAutoPlay();
    setActiveTab(index);
  };

  const activeUseCase = useCases[activeTab];

  return (
    <section ref={sectionRef} id="use-cases" className="py-16 px-4 lg:px-8 bg-gray-50" style={{ touchAction: 'manipulation' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            See what Slack-native agents can actually do
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Go beyond simple Q&A. Deploy agents that participate, manage, and secure your workspace like a true teammate.
          </p>
        </motion.div>

        {/* Mobile Tab-based Layout */}
        <div 
          className="block lg:hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-3 mb-8">
            {useCases.map((useCase, index) => (
              <button
                key={useCase.id}
                onClick={() => handleTabClick(index)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeTab === index
                    ? 'bg-[#6B4EFF] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 active:bg-gray-200'
                }`}
                style={{ touchAction: 'manipulation' }}
              >
                {useCase.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeUseCase.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{activeUseCase.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{activeUseCase.description}</p>
                {/* Feature highlights */}
                <div className="space-y-2">
                  {activeUseCase.id === 'user-auth' && (
                    <>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Per-user OAuth flow with secure token storage</div>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Actions scoped to individual user permissions</div>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Works with GitHub, Jira, Google Drive, and more</div>
                    </>
                  )}
                  {activeUseCase.id === 'dev-assist' && (
                    <>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Automatic link unfurling for rich context</div>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Convert outputs to interactive buttons</div>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Integrated with CI/CD and code review tools</div>
                    </>
                  )}
                  {activeUseCase.id === 'incident-response' && (
                    <>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Trigger on specific keywords or app messages</div>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Automatic channel creation and team paging</div>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Real-time diagnostic data gathering</div>
                    </>
                  )}
                  {activeUseCase.id === 'security-copilot' && (
                    <>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Unified media pipeline for file analysis</div>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Real-time conversation monitoring</div>
                      <div className="flex items-center gap-2 text-xs text-gray-700"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Automatic policy enforcement</div>
                    </>
                  )}
                </div>
              </div>

              {/* Slack Mockup */}
              <div className="p-4 bg-gray-100">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-[#3F0E40] p-3 flex items-center justify-between">
                    <span className="text-white text-sm font-medium">{activeUseCase.mockup.channel}</span>
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                      <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                    {activeUseCase.mockup.messages.map((message, i) => (
                      <div key={i} className={`flex gap-2 items-start ${message.isEphemeral ? 'opacity-80' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${message.bot ? 'bg-white p-1' : message.avatarColor}`}>
                          {message.bot && (
                            <img src="/xpander-logo-purple.png" alt="xpander.ai" className="w-full h-full object-cover rounded-md" />
                          )}
                          {message.avatarIcon}
                          {message.initials && <span className="text-white font-bold text-xs">{message.initials}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-1 mb-1">
                            <span className="font-semibold text-xs text-gray-900">{message.user}</span>
                            <span className="text-xs text-gray-500">{generateTimestamp(message.timeOffset || (5 - i))}</span>
                            {message.isApp && <span className="text-xs bg-gray-200 text-gray-600 px-1 py-0.5 rounded-sm font-medium">APP</span>}
                          </div>
                          {message.text && (
                            <div className="text-xs text-gray-700 prose prose-xs max-w-none">
                              <ReactMarkdown
                                components={{
                                  p: ({children}) => {
                                    if (typeof children === 'string') {
                                      const parts = children.split(/(@xpander\.ai)/g);
                                      return (
                                        <p>
                                          {parts.map((part, index) =>
                                            part === '@xpander.ai' ?
                                              <span key={index} className="text-blue-600 font-medium">@xpander.ai</span> :
                                              part
                                          )}
                                        </p>
                                      );
                                    }
                                    return <p>{children}</p>;
                                  }
                                }}
                              >
                                {message.text}
                              </ReactMarkdown>
                            </div>
                          )}
                          {message.attachment?.type === 'link' && <a href="#" className="text-xs text-blue-600 hover:underline">{message.attachment.text}</a>}
                          {message.attachment?.type === 'file' && (
                            <div className="mt-1 flex items-center gap-1 p-2 bg-gray-100 rounded-md border border-gray-200">
                              <FileText className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-800">{message.attachment.name}</span>
                            </div>
                          )}
                          {message.components && renderMessageContent(message.components, isMobile)}
                          {message.isEphemeral && (
                            <p className="text-xs text-gray-500 italic mt-1">Only visible to you</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Horizontal Carousel */}
        <div 
          className="hidden lg:block relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows - Always visible on mobile, hover-visible on desktop */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <button
              onClick={prevTab}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              style={{ touchAction: 'manipulation' }}
              aria-label="Previous use case"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <button
              onClick={nextTab}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              style={{ touchAction: 'manipulation' }}
              aria-label="Next use case"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Carousel Content */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mx-12">
            <div className="grid lg:grid-cols-12 min-h-[600px]">
              {/* Left Side - Use Case Info */}
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-purple-50 to-blue-50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-gray-900">{activeUseCase.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{activeUseCase.description}</p>
                    </div>

                    {/* Feature highlights - same as mobile but larger */}
                    <div className="space-y-3">
                      {activeUseCase.id === 'user-auth' && (
                        <>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Per-user OAuth flow with secure token storage</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Actions scoped to individual user permissions</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Works with GitHub, Jira, Google Drive, and more</span>
                          </div>
                        </>
                      )}
                      {activeUseCase.id === 'dev-assist' && (
                        <>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Automatic link unfurling for rich context</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Convert outputs to interactive buttons</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Integrated with CI/CD and code review tools</span>
                          </div>
                        </>
                      )}
                      {activeUseCase.id === 'incident-response' && (
                        <>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Trigger on specific keywords or app messages</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Automatic channel creation and team paging</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Real-time diagnostic data gathering</span>
                          </div>
                        </>
                      )}
                      {activeUseCase.id === 'security-copilot' && (
                        <>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Unified media pipeline for file analysis</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Real-time conversation monitoring</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Automatic policy enforcement</span>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side - Slack Mockup */}
              <div className="lg:col-span-7 p-6 lg:p-8 flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-lg">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="bg-[#3F0E40] p-4 flex items-center justify-between">
                        <span className="text-white text-sm font-medium">{activeUseCase.mockup.channel}</span>
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6 space-y-4 max-h-96 overflow-y-auto">
                        {activeUseCase.mockup.messages.map((message, i) => (
                          <AnimatedMessage 
                            key={i} 
                            message={message} 
                            index={i} 
                            isActive={true}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {useCases.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTab ? 'bg-purple-600 scale-125' : 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500'
                }`}
                style={{ touchAction: 'manipulation' }}
                aria-label={`Go to use case ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
