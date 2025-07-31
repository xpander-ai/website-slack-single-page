import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Hammer } from 'lucide-react';

export default function TemplateCard({ template, delay = 0 }) {
  if (!template) return null;

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
            {/* Header with icon */}
            <div className="flex items-start gap-3 mb-4">
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
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
              {template.shortDescription}
            </p>

            {/* Framework */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Framework:</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  {template.framework}
                </Badge>
              </div>
            </div>

            {/* Tools */}
            {template.tools && template.tools.length > 0 && (
              <div className="mb-4">
                <div className="flex items-start gap-2 text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Hammer className="w-4 h-4" />
                    <span>Tools:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {template.tools.map((tool) => (
                      <Badge 
                        key={tool} 
                        variant="secondary" 
                        className="bg-[#6B4EFF]/10 text-[#6B4EFF] text-xs px-2 py-0.5"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
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