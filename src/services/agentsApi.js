// Agent API service - easily switchable to real API endpoint
class AgentsAPI {
  constructor() {
    this.baseUrl = '/api'; // Can be changed to real API URL
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  async getAllAgents() {
    try {
      const response = await fetch('/api/agents.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.agents || [];
    } catch (error) {
      console.error('Error fetching all agents:', error);
      throw new Error('Failed to load agents. Please try again later.');
    }
  }

  async fetchAgents(options = {}) {
    const { skills = [], search = '', sortBy = 'installs' } = options;
    
    try {
      const agents = await this.getAllAgents();
      let filteredAgents = [...agents];

      // Apply filters
      if (search) {
        const searchTerm = search.toLowerCase();
        filteredAgents = filteredAgents.filter(agent =>
          agent.name.toLowerCase().includes(searchTerm) ||
          agent.shortDescription.toLowerCase().includes(searchTerm) ||
          agent.skills?.some(skill => skill.toLowerCase().includes(searchTerm)) ||
          agent.author.toLowerCase().includes(searchTerm)
        );
      }

      if (skills.length > 0) {
        filteredAgents = filteredAgents.filter(agent =>
          skills.some(skill => agent.skills?.includes(skill))
        );
      }

      // Apply sorting
      filteredAgents = this.sortAgents(filteredAgents, sortBy);

      return {
        agents: filteredAgents,
        meta: {
          total: filteredAgents.length,
          filtered: filteredAgents.length !== agents.length
        }
      };
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw new Error('Failed to load agents. Please try again later.');
    }
  }

  async fetchAgent(slug) {
    try {
      const agents = await this.getAllAgents();
      const agent = agents.find(a => a.slug === slug);
      
      if (!agent) {
        throw new Error('Agent not found');
      }
      
      return agent;
    } catch (error) {
      console.error('Error fetching agent:', error);
      throw error;
    }
  }

  async getSkills() {
    try {
      const agents = await this.getAllAgents();
      const allSkills = agents.flatMap(agent => agent.skills || []);
      return [...new Set(allSkills)];
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  }

  sortAgents(agents, sortBy) {
    switch (sortBy) {
      case 'newest':
        return [...agents].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'installs':
        return [...agents].sort((a, b) => {
          const aCount = parseInt(a.installCount.match(/\d+/)?.[0] || '0');
          const bCount = parseInt(b.installCount.match(/\d+/)?.[0] || '0');
          return bCount - aCount;
        });
      default:
        return [...agents].sort((a, b) => {
          const aCount = parseInt(a.installCount.match(/\d+/)?.[0] || '0');
          const bCount = parseInt(b.installCount.match(/\d+/)?.[0] || '0');
          return bCount - aCount;
        });
    }
  }

  // Simulate agent submission (would be POST to real API)
  async submitAgent(agentData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would be:
      // const response = await fetch(`${this.baseUrl}/agents`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(agentData)
      // });
      
      console.log('Agent submitted:', agentData);
      return { success: true, message: 'Agent submitted successfully' };
    } catch (error) {
      console.error('Error submitting agent:', error);
      throw new Error('Failed to submit agent. Please try again later.');
    }
  }
}

// Export singleton instance
export const agentsApi = new AgentsAPI();
export default agentsApi; 