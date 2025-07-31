import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Package, Zap, TrendingUp, Sparkles } from 'lucide-react';

export default function TemplateCard({ template, delay = 0 }) {
  if (!template) return null;

  const getPopularityIcon = (popularity) => {
    switch (popularity) {
      case 'trending':
        return <TrendingUp className="w-3 h-3" />;
      case 'popular':
        return <Zap className="w-3 h-3" />;
      case 'new':
        return <Sparkles className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getPopularityColor = (popularity) => {
    switch (popularity) {
      case 'trending':
        return 'bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 border-orange-200';
      case 'popular':
        return 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 border-blue-200';
      case 'new':
        return 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay }}
      className="group relative h-full"
    >
      <Link to={`/templates/${template.slug}`} className="block h-full">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-150 p-6 h-full flex flex-col relative overflow-hidden group-hover:border-[#6B4EFF]/20 hover-lift">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6B4EFF]/5 to-blue-500/5 rounded-full -translate-y-20 translate-x-20 group-hover:scale-110 transition-all duration-150"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Header with icon and popularity */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                {template.icon && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#6B4EFF]/10 to-blue-500/10 p-2">
                    <img 
                      src={template.icon} 
                      alt={`${template.name} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#6B4EFF] transition-all duration-150">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3" />
                    {template.setupTime}
                  </p>
                </div>
              </div>
              
              {template.popularity && (
                <Badge className={`${getPopularityColor(template.popularity)} flex items-center gap-1 px-2 py-1`}>
                  {getPopularityIcon(template.popularity)}
                  <span className="text-xs font-medium capitalize">{template.popularity}</span>
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
              {template.shortDescription}
            </p>

            {/* Framework and Model */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Framework:</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  {template.framework}
                </Badge>
              </div>
              
              {template.models && template.models.length > 0 && (
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-gray-500 flex-shrink-0">Models:</span>
                  <div className="flex flex-wrap gap-1">
                    {template.models.slice(0, 2).map((model) => (
                      <Badge 
                        key={model} 
                        variant="secondary" 
                        className="bg-[#6B4EFF]/10 text-[#6B4EFF] text-xs"
                      >
                        {model}
                      </Badge>
                    ))}
                    {template.models.length > 2 && (
                      <Badge 
                        variant="secondary" 
                        className="bg-gray-100 text-gray-500 text-xs"
                      >
                        +{template.models.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Tools */}
            {template.tools && template.tools.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  <Package className="w-3 h-3 text-gray-400 mr-1" />
                  {template.tools.slice(0, 3).map((tool) => (
                    <Badge 
                      key={tool} 
                      variant="outline" 
                      className="text-xs px-2 py-0.5"
                    >
                      {tool}
                    </Badge>
                  ))}
                  {template.tools.length > 3 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs px-2 py-0.5 text-gray-500"
                    >
                      +{template.tools.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Category */}
            <div className="mb-4">
              <Badge variant="secondary" className="bg-[#F5F6FF] text-[#6B4EFF] font-medium">
                {template.category}
              </Badge>
            </div>

            {/* CTA Button */}
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(`https://app.xpander.ai/slack_agents/new?templateId=${template.id}`, '_blank');
              }}
              className="w-full gradient-bg hover:opacity-90 text-white font-semibold transition-all duration-150 rounded-xl"
              size="sm"
            >
              Use This Template
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}