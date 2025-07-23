import Layout from "./Layout.jsx";

import Landing from "./Landing";
import AgentsDirectory from "./AgentsDirectory";
import AgentDetail from "./AgentDetail";
import SubmitAgent from "./SubmitAgent";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';

const PAGES = {
    
    Landing: Landing,
    AgentsDirectory: AgentsDirectory,
    AgentDetail: AgentDetail,
    SubmitAgent: SubmitAgent,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Landing />} />
                
                
                <Route path="/Landing" element={<Landing />} />
                <Route path="/agents" element={<AgentsDirectory />} />
                <Route path="/agents/submit" element={<SubmitAgent />} />
                <Route path="/agents/:slug" element={<AgentDetail />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <ScrollToTop />
            <PagesContent />
        </Router>
    );
}