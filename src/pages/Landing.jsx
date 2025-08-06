import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  Rocket, 
  MessageSquare, 
  Shield, 
  Zap, 
  BarChart3, 
  Eye, 
  Lock, 
  Play,
  Copy,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Twitter,
  ExternalLink,
  Server,
  BookText,
  CalendarDays,
  GitPullRequest,
  LifeBuoy,
  Receipt,
  Check,
  Clock,
  DollarSign
} from 'lucide-react';

import HeroSection from '../components/landing/HeroSection';
import ProblemSolutionSection from '../components/landing/ProblemSolutionSection';
import SocialProofSection from '../components/landing/SocialProofSection';
import UseCaseCarousel from '../components/landing/UseCaseCarousel';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import ArchitectureSection from '../components/landing/ArchitectureSection';
import FAQSection from '../components/landing/FAQSection';
import FinalCTABanner from '../components/landing/FinalCTABanner';
import Footer from '../components/landing/Footer';
import TopBar from '../components/landing/TopBar';
import FrameworkCarousel from '../components/landing/FrameworkCarousel';
import PlatformBanner from '../components/landing/PlatformBanner';
import DeveloperFeaturesSection from '../components/landing/DeveloperFeaturesSection';
import SlackAgentsSection from '../components/landing/SlackAgentsSection';
import { featureFlags } from '@/config/featureFlags';

export default function Landing() {
  useEffect(() => {
    // Set favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = '/xpander-logo-purple.png';
    document.head.appendChild(link);
    
    // Set meta tags
    document.title = 'xpander.ai - Deploy AI Agents to Slack in 2 Minutes | Slack-Native AI';
    
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Turn any AI agent into a Slack-native teammate in under 2 minutes. One command deployment with auth, scaling, and context built-in. Works with LangChain, LlamaIndex, CrewAI.';
    document.head.appendChild(metaDescription);
    
    // OpenGraph tags
    const ogTitle = document.createElement('meta');
    ogTitle.property = 'og:title';
    ogTitle.content = 'xpander.ai - Deploy AI Agents to Slack in 2 Minutes';
    document.head.appendChild(ogTitle);
    
    const ogDescription = document.createElement('meta');
    ogDescription.property = 'og:description';
    ogDescription.content = 'Your agent. Our infra. One line to make it Slack-native – with auth, scaling, and context out of the box.';
    document.head.appendChild(ogDescription);
    
  }, []);

  return (
    <div className="bg-white">
      <TopBar />
      <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:400;500&display=swap');
          
          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .mono {
            font-family: 'JetBrains Mono', monospace;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #6B4EFF 0%, #8B5CF6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .gradient-bg {
            background: linear-gradient(135deg, #6B4EFF 0%, #8B5CF6 100%);
          }
          
          .hover-lift {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hover-lift:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }

          /* Basic Code Syntax Highlighting Styles */
          code {
              background-color: #f0f0f0;
              padding: 0.2em 0.4em;
              border-radius: 0.3em;
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.9em;
              white-space: nowrap;
          }

          pre {
              background-color: #282c34;
              color: #abb2bf;
              padding: 1em;
              border-radius: 8px;
              overflow-x: auto;
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.95em;
              line-height: 1.5;
          }

          pre code {
              background-color: transparent;
              padding: 0;
              border-radius: 0;
              font-size: 1em;
              white-space: pre;
          }
        `}</style>

        <div>
          <HeroSection />
          <FrameworkCarousel />
          <HowItWorksSection />
          <SocialProofSection />
          <UseCaseCarousel />
          <ProblemSolutionSection />
          <ArchitectureSection />
          <DeveloperFeaturesSection />
          {featureFlags.featuredAgentsEnabled && <SlackAgentsSection />}
          <FAQSection />
          <FinalCTABanner />
          <Footer />
        </div>
    </div>
  );
}