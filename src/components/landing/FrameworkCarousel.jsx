
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap } from 'lucide-react';

const frameworks = [
    { name: 'LangChain', logo: 'langchain' },
    { name: 'CrewAI', logo: 'crewai' },
    { name: 'Meta Llama', logo: 'meta' },
    { name: 'OpenAI', logo: 'openai' },
    { name: 'Anthropic', logo: 'anthropic' },
    { name: 'Mistral', logo: 'mistral' },
    { name: 'AWS Bedrock', logo: 'bedrock' },
    { name: 'NVIDIA NeMo', logo: 'nvidia' },
    { name: 'Google Gemini', logo: 'gemini' },
];

const Logo = ({ type }) => {
    const logoBaseStyle = "h-12 w-auto object-contain";
    switch (type) {
        case 'langchain': return (
            <img 
                src="/logos/langchain-color.png" 
                alt="LangChain Logo" 
                className={logoBaseStyle} 
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-2xl font-bold text-gray-700">LangChain</div>';
                }}
            />
        );
        case 'crewai': return (
            <img 
                src="/logos/CrewAI Logo.png" 
                alt="CrewAI Logo" 
                className={logoBaseStyle}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-2xl font-bold text-gray-700">CrewAI</div>';
                }}
            />
        );
        case 'meta': return (
            <img 
                src="/logos/llama.png" 
                alt="Meta Llama Logo" 
                className={logoBaseStyle}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-2xl font-bold text-blue-600">Meta</div>';
                }}
            />
        );
        case 'openai': return (
            <img 
                src="/logos/openai.svg" 
                alt="OpenAI Logo" 
                className={logoBaseStyle}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-2xl font-bold text-gray-700">OpenAI</div>';
                }}
            />
        );
        case 'anthropic': return (
            <img 
                src="/logos/anthropic.png" 
                alt="Anthropic Logo" 
                className={logoBaseStyle}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-2xl font-medium text-[#D97757]">Anthropic</div>';
                }}
            />
        );
        case 'mistral': return (
            <img 
                src="/logos/mistral.png" 
                alt="Mistral Logo" 
                className={logoBaseStyle}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-2xl font-bold text-[#FF7000]">MISTRAL</div>';
                }}
            />
        );
        case 'bedrock': return (
            <img 
                src="/logos/bedrock.png" 
                alt="AWS Bedrock Logo" 
                className={logoBaseStyle}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-xl font-bold text-[#FF9900]">AWS Bedrock</div>';
                }}
            />
        );
        case 'nvidia': return (
            <img 
                src="/logos/nvidia.png" 
                alt="NVIDIA Logo" 
                className={logoBaseStyle}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-xl font-bold text-[#76B900]">NVIDIA</div>';
                }}
            />
        );
        case 'gemini': return (
            <img 
                src="/logos/gemini.svg" 
                alt="Google Gemini Logo" 
                className={logoBaseStyle}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Gemini</div>';
                }}
            />
        );
        default: return null;
    }
};

export default function FrameworkCarousel() {
  return (
    <section id="frameworks" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-8">
            Works with any agent framework
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-all duration-150 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Build an Slack AI Agent from a template</h3>
                    <p className="text-sm text-gray-600">Production-ready, optimized for performance, no infrastructure to manage</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="text-xs text-purple-700 font-medium">
                    <p>Available now:</p>
                    <p className="mt-1">
                      <img src="/logos/agno.png" alt="" className="inline" style={{ height: '1em', width: 'auto', marginRight: '0.15em', verticalAlign: '-0.15em' }} />Agno + OpenAI or Amazon Bedrock
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all duration-150 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Deploy your own agent code</h3>
                    <p className="text-sm text-gray-600 mb-4">Start from boilerplates of LangChain, CrewAI, or deploy directly. Full control over your agent's behavior</p>
                    <div className="text-xs text-gray-500 font-medium">
                      <p>Coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 w-full overflow-hidden relative [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
        <style jsx>{`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .scrolling-wrapper {
            animation: scroll 40s linear infinite;
          }
        `}</style>
        
        <div className="flex w-max scrolling-wrapper">
          {[...frameworks, ...frameworks].map((fw, i) => (
             <div
                key={`${fw.name}-${i}`}
                className="flex flex-col items-center justify-center p-6 mx-4 w-48 shrink-0"
             >
                <div className="h-20 flex items-center justify-center">
                    <Logo type={fw.logo} />
                </div>
                <p className="text-base font-semibold text-gray-800 mt-2">{fw.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
