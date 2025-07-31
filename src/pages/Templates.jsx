import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Hammer, Package, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import TopBar from '../components/landing/TopBar';
import Footer from '../components/landing/Footer';
import TemplateCard from '@/components/ui/TemplateCard';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    let filtered = templates;
    
    if (selectedTools.length > 0) {
      filtered = filtered.filter(t => 
        t.tools && t.tools.some(tool => selectedTools.includes(tool))
      );
    }
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(t => 
        t.category && selectedCategories.includes(t.category)
      );
    }
    
    setFilteredTemplates(filtered);
  }, [selectedTools, selectedCategories, templates]);


  const handleToolToggle = (tool) => {
    setSelectedTools(prev => 
      prev.includes(tool)
        ? prev.filter(t => t !== tool)
        : [...prev, tool]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedTools([]);
    setSelectedCategories([]);
  };

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/templates.json');
      const data = await response.json();
      setTemplates(data.templates || []);
      setFilteredTemplates(data.templates || []);
      
      // Extract unique tools from templates
      const allTools = data.templates.flatMap(t => t.tools || []);
      const uniqueTools = [...new Set(allTools)].filter(Boolean).sort();
      setTools(uniqueTools);
      
      // Extract unique categories from templates
      const allCategories = data.templates.map(t => t.category).filter(Boolean);
      const uniqueCategories = [...new Set(allCategories)].sort();
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      
      <div className="pt-24 pb-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Templates
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
              Off-the-shelf AI Agent templates
            </p>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              In this section you'll find off-the-shelf AI Agents that you can easily deploy to your xpander.ai account, customize as you require, and start using them within minutes.
            </p>
          </motion.div>

          {/* Combined Filters */}
          {(categories.length > 0 || tools.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="mb-6 mt-6 space-y-3"
            >
              {/* Category Filters */}
              {categories.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <div className="flex items-center gap-1.5 mr-2">
                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-600 font-medium">Category:</span>
                  </div>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all duration-150 text-xs ${
                        selectedCategories.includes(category)
                          ? 'bg-[#6B4EFF] text-white hover:bg-[#6B4EFF]/90'
                          : 'hover:bg-[#6B4EFF]/10 hover:text-[#6B4EFF] hover:border-[#6B4EFF]'
                      }`}
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Tool Filters */}
              {tools.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <div className="flex items-center gap-1.5 mr-2">
                    <Hammer className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-600 font-medium">Tool:</span>
                  </div>
                  {tools.map((tool) => (
                    <Badge
                      key={tool}
                      variant={selectedTools.includes(tool) ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all duration-150 text-xs ${
                        selectedTools.includes(tool)
                          ? 'bg-[#6B4EFF] text-white hover:bg-[#6B4EFF]/90'
                          : 'hover:bg-[#6B4EFF]/10 hover:text-[#6B4EFF] hover:border-[#6B4EFF]'
                      }`}
                      onClick={() => handleToolToggle(tool)}
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Clear Filters Button */}
              {(selectedCategories.length > 0 || selectedTools.length > 0) && (
                <div className="flex justify-start">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700 text-xs"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* Available Templates Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Available Templates</h2>
          </motion.div>

          {/* Templates Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B4EFF]"></div>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 mb-4">No templates found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Clear filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredTemplates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-[#6B4EFF]/10 to-[#8B5CF6]/10 border-[#6B4EFF]/20">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Coming Soon
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  More agent templates are on the way! Have a suggestion? Join our community on Slack or Discord!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <a href="https://join.slack.com/t/xpandercommunity/shared_invite/zt-2mt2xkxkz-omM7f~_h2jcuzFudrYtZQQ" target="_blank" rel="noopener noreferrer">
                      Join Slack Community
                    </a>
                  </Button>
                  <Button className="bg-[#6B4EFF] hover:bg-[#6B4EFF]/90" asChild>
                    <a href="https://discord.gg/CUcp4WWh5g" target="_blank" rel="noopener noreferrer">
                      Join Discord
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}