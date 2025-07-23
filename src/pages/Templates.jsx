import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles, Clock, Zap, TrendingUp, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import TopBar from '../components/landing/TopBar';
import Footer from '../components/landing/Footer';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Templates', icon: Package },
    { id: 'Customer Support', name: 'Customer Support', icon: null },
    { id: 'DevOps & Infrastructure', name: 'DevOps & Infrastructure', icon: null },
    { id: 'Development Tools', name: 'Development Tools', icon: null },
    { id: 'Sales & Marketing', name: 'Sales & Marketing', icon: null },
    { id: 'Data & Analytics', name: 'Data & Analytics', icon: null },
    { id: 'HR & Operations', name: 'HR & Operations', icon: null },
    { id: 'Security & Compliance', name: 'Security & Compliance', icon: null }
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [searchTerm, selectedCategory, templates]);

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/templates.json');
      const data = await response.json();
      setTemplates(data.templates || []);
      setFilteredTemplates(data.templates || []);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = [...templates];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(search) ||
        template.shortDescription.toLowerCase().includes(search) ||
        template.tools.some(tool => tool.toLowerCase().includes(search)) ||
        template.features.some(feature => feature.toLowerCase().includes(search))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    setFilteredTemplates(filtered);
  };

  const getPopularityIcon = (popularity) => {
    switch (popularity) {
      case 'trending':
        return <TrendingUp className="w-4 h-4" />;
      case 'popular':
        return <Zap className="w-4 h-4" />;
      case 'new':
        return <Sparkles className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPopularityColor = (popularity) => {
    switch (popularity) {
      case 'trending':
        return 'text-orange-600 bg-orange-50';
      case 'popular':
        return 'text-blue-600 bg-blue-50';
      case 'new':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
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
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Agent Templates
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start with pre-configured AI agent templates. Deploy in minutes, customize to your needs.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search templates by name, tools, or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Filter by:</span>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? 'bg-[#6B4EFF] hover:bg-[#6B4EFF]/90' : ''}
                >
                  {category.icon && <category.icon className="w-4 h-4 mr-1" />}
                  {category.name}
                  {category.id === 'all' && (
                    <Badge variant="secondary" className="ml-2">
                      {templates.length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-sm text-gray-600">
              Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
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
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {template.icon ? (
                            <img src={template.icon} alt={template.name} className="w-8 h-8" />
                          ) : (
                            <Package className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        {template.popularity && (
                          <Badge className={`flex items-center gap-1 ${getPopularityColor(template.popularity)}`}>
                            {getPopularityIcon(template.popularity)}
                            {template.popularity}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {template.shortDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-4 flex-1">
                        {/* Framework and Models */}
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Framework & Models</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary">{template.framework}</Badge>
                            {template.models.map((model, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {model}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Tools */}
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Included Tools</p>
                          <div className="flex flex-wrap gap-1">
                            {template.tools.slice(0, 3).map((tool, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                            {template.tools.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.tools.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Setup Time */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{template.setupTime} setup</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-6">
                        <Button asChild className="w-full bg-[#6B4EFF] hover:bg-[#6B4EFF]/90">
                          <Link to={`/templates/${template.slug}`}>
                            Use This Template
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-to-r from-[#6B4EFF]/10 to-[#8B5CF6]/10 border-[#6B4EFF]/20">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Can't find what you need?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Create a custom agent from scratch or request a new template for your specific use case.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <a href="https://github.com/xpander-ai/templates" target="_blank" rel="noopener noreferrer">
                      Request Template
                    </a>
                  </Button>
                  <Button className="bg-[#6B4EFF] hover:bg-[#6B4EFF]/90" asChild>
                    <a href="https://xpander.ai/create" target="_blank" rel="noopener noreferrer">
                      Create Custom Agent
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