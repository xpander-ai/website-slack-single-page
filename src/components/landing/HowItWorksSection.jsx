import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MousePointer, Check, Terminal, Code, Download, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { featureFlags } from '@/config/featureFlags';

export default function HowItWorksSection() {
    const [activeTab, setActiveTab] = useState('wizard');
    const [selectedFramework, setSelectedFramework] = useState('agno');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const response = await fetch('/api/templates.json');
                const data = await response.json();
                setTemplates(data.templates || []);
                // Set first template as default if available
                if (data.templates && data.templates.length > 0) {
                    setSelectedTemplate(data.templates[0].id);
                }
            } catch (error) {
                console.error('Error loading templates:', error);
            }
        };
        
        if (selectedFramework === 'agno') {
            loadTemplates();
        }
    }, [selectedFramework]);

    const getTemplateDeployLink = (templateId) => {
        return `https://app.xpander.ai/slack_agents/new?templateId=${templateId}`;
    };
    
    const steps = [
        {
            icon: MousePointer,
            title: "Create Slack Agent",
            content: (
                <div className="space-y-4">
                    {/* Tab Navigation */}
                    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() => setActiveTab('wizard')}
                            data-tab="wizard"
                            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                activeTab === 'wizard'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Start from a Slack AI Agent blueprint
                        </button>
                        <button
                            onClick={() => setActiveTab('code')}
                            data-tab="code"
                            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                activeTab === 'code'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <span className="flex items-center justify-center gap-1">
                                <Terminal className="w-3.5 h-3.5" />
                                Bring Your Own Code
                            </span>
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'wizard' ? (
                        <>
                            <p className="text-gray-600">
                                Choose your AI framework and start from a pre-configured template:
                            </p>
                            
                            {/* Framework Selection */}
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Select AI Framework
                                    </label>
                                    <Select
                                        value={selectedFramework}
                                        onValueChange={setSelectedFramework}
                                    >
                                        <SelectTrigger className="w-full max-w-xs">
                                            <SelectValue placeholder="Select a framework" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="agno">
                                                <div className="flex items-center gap-2">
                                                    <img src="/logos/agno.png" alt="Agno" className="w-4 h-4" />
                                                    <span>Agno</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="langchain" disabled>
                                                <div className="flex items-center gap-2">
                                                    <img src="/logos/langchain-color.png" alt="LangChain" className="w-4 h-4 object-contain" />
                                                    <span>LangChain (Coming Soon)</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="crewai" disabled>
                                                <div className="flex items-center gap-2">
                                                    <img src="/logos/CrewAI Logo.png" alt="CrewAI" className="w-4 h-4 object-contain" />
                                                    <span>CrewAI (Coming Soon)</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                {/* Template Selection */}
                                {selectedFramework === 'agno' && templates.length > 0 && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Select Template
                                        </label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex h-10 w-full max-w-xs items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                                    {selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.name : "Select a template"}
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-80">
                                                {templates.map((template) => (
                                                    <DropdownMenuItem 
                                                        key={template.id} 
                                                        onClick={() => setSelectedTemplate(template.id)}
                                                    >
                                                        {template.name}
                                                    </DropdownMenuItem>
                                                ))}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild>
                                                    <a 
                                                        href="/templates" 
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#6B4EFF] font-medium cursor-pointer"
                                                    >
                                                        Browse all templates →
                                                    </a>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )}
                                
                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    {selectedFramework === 'agno' && selectedTemplate && (
                                        <div>
                                            <a 
                                                href={getTemplateDeployLink(selectedTemplate)} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-block"
                                            >
                                                <button className="gradient-bg hover:opacity-90 text-white font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 text-sm">
                                                    Deploy Selected Configuration
                                                </button>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-sm text-gray-600">
                                    <strong>What's included:</strong>
                                </p>
                                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#6B4EFF] mt-0.5">✓</span>
                                        <span style={{ whiteSpace: 'nowrap' }}>
                                            <a href="https://github.com/agno-agi/agno" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-600 hover:text-[#6B4EFF] transition-colors">
                                                <img src="/logos/agno.png" alt="" className="inline" style={{ height: '0.8em', width: 'auto', marginRight: '0.15em', verticalAlign: '-0.1em' }} />Agno
                                            </a>
                                            {' '}runtime preconfigured
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#6B4EFF] mt-0.5">✓</span>
                                        <span>Autonomous agent with memory, code interpreter & web search</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#6B4EFF] mt-0.5">✓</span>
                                        <span>OpenAI models + function calling preconfigured</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#6B4EFF] mt-0.5">✓</span>
                                        <span>Automatic Slack OAuth & thread management</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#6B4EFF] mt-0.5">✓</span>
                                        <span className="flex items-start gap-1 flex-wrap">
                                            <span style={{ whiteSpace: 'nowrap' }}>
                                                Powered by
                                                <a href="https://github.com/xpander-ai/xpander-ai" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-600 hover:text-[#6B4EFF] transition-colors ml-1">
                                                    <img src="/xpander-logo-purple.png" alt="" className="inline" style={{ height: '0.8em', width: 'auto', marginRight: '0.15em', verticalAlign: '-0.1em' }} />xpander.ai
                                                </a>
                                                {' '}backend
                                            </span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-gray-600">
                                Create your agent with custom code using the xpander CLI:
                            </p>
                            <div className="space-y-4 max-w-2xl">
                                {/* Step 1 */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Step 1: Install CLI & Initialize</h4>
                                    <div className="bg-white rounded-lg p-4 overflow-x-auto border border-gray-300 shadow-sm">
                                        <div className="text-sm font-mono space-y-1">
                                            <div className="text-green-600"># Install xpander CLI globally</div>
                                            <div className="text-gray-900">npm install -g xpander-cli</div>
                                            <div className="mt-2"></div>
                                            <div className="text-green-600"># Create new agent or fetch backend config</div>
                                            <div className="text-gray-900">xpander agent new <span className="text-green-600"># or use: xpander init</span></div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Step 2 */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Step 2: Add Your Business Logic</h4>
                                    <div className="bg-white rounded-lg p-4 overflow-x-auto border border-gray-300 shadow-sm">
                                        <div className="text-sm font-mono space-y-1">
                                            <div><span className="text-blue-600">from</span> <span className="text-gray-900">xpander_sdk </span><span className="text-blue-600">import</span> <span className="text-gray-900">Task, Backend, on_task</span></div>
                                            <div><span className="text-blue-600">from</span> <span className="text-gray-900">agno.agent </span><span className="text-blue-600">import</span> <span className="text-gray-900">Agent</span></div>
                                            <div className="mt-2"></div>
                                            <div className="text-green-600"># Stateful agent, zero infrastructure overhead</div>
                                            <div className="text-purple-600">@on_task</div>
                                            <div><span className="text-blue-600">async def</span> <span className="text-orange-600">handle_task</span><span className="text-gray-900">(task: Task):</span></div>
                                            <div className="ml-4"><span className="text-gray-900">backend = Backend()  </span><span className="text-green-600"># DB, MCP tools, system prompt</span></div>
                                            <div className="ml-4"><span className="text-gray-900">agent = Agent(**</span><span className="text-blue-600">await</span> <span className="text-gray-900">backend.aget_args())</span></div>
                                            <div className="mt-1 ml-4"></div>
                                            <div className="ml-4 text-green-600"># Task includes user data + events from Slack, webhooks, agents</div>
                                            <div className="ml-4"><span className="text-gray-900">result = </span><span className="text-blue-600">await</span> <span className="text-gray-900">agent.arun(message=task.to_message())</span></div>
                                            <div className="ml-4"><span className="text-gray-900">task.result = result.content</span></div>
                                            <div className="ml-4"><span className="text-blue-600">return</span> <span className="text-gray-900">task</span></div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Integration Guide Alert */}
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <p className="text-sm text-blue-800 mb-2">
                                        <strong>Need different models or AI frameworks?</strong>
                                    </p>
                                    <p className="text-xs text-blue-700">
                                        Check out our <a href="https://docs.xpander.ai/Examples/04-local-model-integration" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-800 hover:underline">integration guide</a> for local models, different AI frameworks, and custom setups.
                                    </p>
                                </div>
                                
                                {/* Step 3 */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Step 3: Deploy</h4>
                                    <div className="bg-white rounded-lg p-4 overflow-x-auto border border-gray-300 shadow-sm">
                                        <div className="text-sm font-mono space-y-1">
                                            <div className="text-green-600"># Deploy your agent to production</div>
                                            <div className="text-gray-900">xpander deploy</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )
        },
        {
            icon: Download,
            title: "Add Slack as Task Source",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Connect your deployed agent to Slack to receive tasks and messages:
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <ol className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="font-semibold text-gray-700">1.</span>
                                <span>Go to <a href="https://app.xpander.ai/slack_agents/new" target="_blank" rel="noopener noreferrer" className="text-[#6B4EFF] hover:underline font-medium">app.xpander.ai/slack_agents/new</a></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-semibold text-gray-700">2.</span>
                                <span>Select "Connect Existing Agent" and link your deployed agent</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-semibold text-gray-700">3.</span>
                                <span>Configure Slack OAuth and select channels for your agent</span>
                            </li>
                        </ol>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-sm text-blue-800 mb-2">
                            <strong>Pro tip:</strong> Your custom agent will now receive Slack messages as tasks and can respond using your business logic
                        </p>
                        <p className="text-xs text-blue-700">
                            The Task object includes user data, message content, and context from Slack threads - perfect for building intelligent conversational agents.
                        </p>
                    </div>
                </div>
            )
        },
        {
            icon: Check,
            title: "Done! Agent is Live",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Your agent is instantly deployed and ready to use in Slack:
                    </p>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="bg-[#3F0E40] p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <span className="text-white text-sm font-medium">#general</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 space-y-3">
                            <div className="flex gap-3 items-start">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <img src="/xpander-logo-purple.png" alt="xpander.ai" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-gray-900">Your Agent</span>
                                        <span className="text-xs text-gray-500">just now</span>
                                    </div>
                                    <p className="text-sm text-gray-700">🚀 I'm now live in your workspace! I can answer questions from your documentation. Try mentioning me or DMing me!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="text-sm text-green-800 font-medium flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            Your agent is ready - no additional setup required!
                        </p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section id="how-it-works" className="py-20 px-4 lg:px-8 bg-[#F5F6FF]">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.15 }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Deploy in 3 Simple Steps
                    </h2>
                    <p className="text-xl text-gray-600">
                        No coding required. Your Slack agent is ready in minutes.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="absolute left-8 top-20 bottom-20 w-0.5 bg-gradient-to-b from-[#6B4EFF] to-blue-500 hidden md:block" />
                    
                    {/* Steps */}
                    <div className="space-y-16">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="relative"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.15 }}
                            >
                                <div className="flex items-start gap-6">
                                    {/* Step Number */}
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#6B4EFF] to-blue-500 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg">
                                        {index + 1}
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                            <step.icon className="w-6 h-6 text-[#6B4EFF]" />
                                            {step.title}
                                        </h3>
                                        <div>{step.content}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

            <style jsx>{`
                .gradient-bg {
                    background: linear-gradient(135deg, #6B4EFF 0%, #8B5CF6 100%);
                }
            `}</style>
        </section>
    );
}