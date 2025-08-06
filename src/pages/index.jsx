import Layout from "./Layout.jsx";

import Landing from "./Landing";
import AgentsDirectory from "./AgentsDirectory";
import AgentDetail from "./AgentDetail";
import SubmitAgent from "./SubmitAgent";
import Templates from "./Templates";
import TemplateDetail from "./TemplateDetail";

import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import { featureFlags } from '@/config/featureFlags';

const PAGES = {
    
    Landing: Landing,
    AgentsDirectory: AgentsDirectory,
    AgentDetail: AgentDetail,
    SubmitAgent: SubmitAgent,
    Templates: Templates,
    TemplateDetail: TemplateDetail,
    
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
                {featureFlags.preconfiguredAppsEnabled ? (
                    <>
                        <Route path="/agents" element={<AgentsDirectory />} />
                        <Route path="/agents/submit" element={<SubmitAgent />} />
                        <Route path="/agents/:slug" element={<AgentDetail />} />
                    </>
                ) : (
                    <>
                        <Route path="/agents" element={<Navigate to="/" replace />} />
                        <Route path="/agents/submit" element={<Navigate to="/" replace />} />
                        <Route path="/agents/:slug" element={<Navigate to="/" replace />} />
                    </>
                )}
                {featureFlags.templatesEnabled ? (
                    <>
                        <Route path="/templates" element={<Templates />} />
                        <Route path="/templates/:slug" element={<TemplateDetail />} />
                    </>
                ) : (
                    <>
                        <Route path="/templates" element={<Navigate to="/" replace />} />
                        <Route path="/templates/:slug" element={<Navigate to="/" replace />} />
                    </>
                )}
                
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