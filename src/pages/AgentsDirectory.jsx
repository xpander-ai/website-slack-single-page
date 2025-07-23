import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '../components/landing/TopBar';
import Footer from '../components/landing/Footer';
import AgentCard from '@/components/ui/AgentCard';
import agentsApi from '@/services/agentsApi';

export default function AgentsDirectory() {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 9;

  useEffect(() => {
    const loadAgents = async () => {
      try {
        setLoading(true);
        const agentsData = await agentsApi.getAllAgents();
        setAgents(agentsData);
        setFilteredAgents(agentsData);
        
        // Extract unique skills
        const skills = await agentsApi.getSkills();
        setAvailableSkills(skills);
      } catch (err) {
        setError(err.message);
        console.error('Error loading agents:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
  }, []);

  useEffect(() => {
    let filtered = [...agents];

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        agent.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(agent =>
        selectedSkills.every(skill => agent.skills?.includes(skill))
      );
    }

    // Sort agents by newest
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredAgents(filtered);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [agents, searchQuery, selectedSkills]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);
  const startIndex = (currentPage - 1) * agentsPerPage;
  const endIndex = startIndex + agentsPerPage;
  const currentAgents = filteredAgents.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        {/* Header section with fixed height for consistent layout */}
        <section className="pt-24 pb-16 px-4 lg:px-8 bg-gradient-to-br from-[#6B4EFF]/5 via-white to-purple-50/30">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded-lg w-96 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-64 mx-auto mb-8"></div>
              <div className="h-12 bg-gray-200 rounded-xl w-48 mx-auto"></div>
            </div>
          </div>
        </section>
        
        {/* Loading grid */}
        <section className="py-8 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        <div className="pt-24 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Agents</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      
      {/* Header Section - Consistent with other pages */}
      <section className="pt-24 pb-16 px-4 lg:px-8 bg-gradient-to-br from-[#6B4EFF]/5 via-white to-purple-50/30">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Slack Agent Directory
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Discover Slack-native AI agents running on xpander.ai. Install directly to your Slack workspace
              or submit your own.
            </p>
            <Button
              asChild
              size="lg"
              className="gradient-bg hover-lift text-white px-8 py-4 text-lg font-semibold rounded-xl"
            >
              <Link to="/agents/submit">
                <Plus className="mr-2 w-5 h-5" />
                Submit Your Agent
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Search */}
            <div className="relative max-w-xl mx-auto w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, skill, or team"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

          </motion.div>

          {/* Skills Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6"
          >
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Filter className="w-4 h-4" />
                <span>Filter by skills:</span>
              </div>
              
              {availableSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedSkills.includes(skill)
                      ? 'bg-[#6B4EFF] text-white hover:bg-[#6B4EFF]/90'
                      : 'hover:bg-[#6B4EFF]/10 hover:text-[#6B4EFF] hover:border-[#6B4EFF]'
                  }`}
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                </Badge>
              ))}
              
              {(selectedSkills.length > 0 || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <p className="text-gray-600">
              {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''} found
              {totalPages > 1 && (
                <span className="text-gray-400 ml-2">
                  • Showing {startIndex + 1}-{Math.min(endIndex, filteredAgents.length)} of {filteredAgents.length}
                </span>
              )}
            </p>
          </motion.div>

          {/* Agents Grid */}
          {filteredAgents.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AgentCard agent={agent} showDetails={true} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No agents found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or clearing the filters.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            </motion.div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 flex items-center justify-center gap-2"
            >
              {/* Previous Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  <div key={index}>
                    {page === '...' ? (
                      <span className="px-3 py-1 text-gray-400">...</span>
                    ) : (
                      <Button
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[40px] ${
                          currentPage === page
                            ? 'bg-[#6B4EFF] hover:bg-[#6B4EFF]/90 text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
} 