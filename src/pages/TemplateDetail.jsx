import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Zap, Package, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TopBar from '../components/landing/TopBar';
import Footer from '../components/landing/Footer';

export default function TemplateDetail() {
  const { slug } = useParams();
  const [template, setTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTemplate();
  }, [slug]);

  const loadTemplate = async () => {
    try {
      const response = await fetch('/api/templates.json');
      const data = await response.json();
      const foundTemplate = data.templates.find(t => t.slug === slug);
      setTemplate(foundTemplate);
    } catch (error) {
      console.error('Error loading template:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B4EFF]"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        <div className="pt-24 pb-20 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Template not found</h1>
            <p className="text-gray-600 mb-8">The template you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      
      <div className="pt-24 pb-20 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/templates" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                Back to Templates
              </Link>
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                {template.icon ? (
                  <img src={template.icon} alt={template.name} className="w-12 h-12" />
                ) : (
                  <Package className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{template.name}</h1>
                <p className="text-lg text-gray-600">{template.shortDescription}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{template.setupTime} setup</span>
              </div>
              <Badge variant="secondary">{template.category}</Badge>
              {template.popularity && (
                <Badge className="bg-[#6B4EFF]/10 text-[#6B4EFF]">
                  {template.popularity}
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {template.fullDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Included Tools */}
              <Card>
                <CardHeader>
                  <CardTitle>Included Tools & Integrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {template.tools.map((tool, index) => (
                      <Badge key={index} variant="secondary" className="py-1.5 px-3">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - What's Included */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="sticky top-24">
                <CardHeader className="bg-gray-50 rounded-t-lg">
                  <CardTitle className="text-lg">What's Included</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Framework */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">AI Framework</p>
                      <Badge className="bg-[#6B4EFF]/10 text-[#6B4EFF]">
                        {template.framework} Runtime
                      </Badge>
                    </div>

                    {/* Models */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Available Models</p>
                      <div className="space-y-1">
                        {template.models.map((model, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#6B4EFF]" />
                            <span className="text-sm text-gray-600">{model}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Features */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Platform Features</p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>✓ Autonomous agent with memory</li>
                        <li>✓ Code interpreter built-in</li>
                        <li>✓ Web search capabilities</li>
                        <li>✓ Automatic Slack OAuth</li>
                        <li>✓ Thread management</li>
                        <li>✓ Powered by xpander.ai backend</li>
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Button 
                        className="w-full bg-[#6B4EFF] hover:bg-[#6B4EFF]/90" 
                        size="lg"
                        asChild
                      >
                        <a 
                          href={`https://xpander.ai/create?template=${template.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Use This Template
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Deploy in {template.setupTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-[#6B4EFF]/5 to-[#8B5CF6]/5 border-[#6B4EFF]/20">
              <CardContent className="py-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ready to deploy this template?
                </h3>
                <p className="text-gray-600 mb-6">
                  Get your AI agent running in Slack in just {template.setupTime}.
                </p>
                <Button 
                  size="lg" 
                  className="bg-[#6B4EFF] hover:bg-[#6B4EFF]/90"
                  asChild
                >
                  <a 
                    href={`https://xpander.ai/create?template=${template.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start with This Template
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}