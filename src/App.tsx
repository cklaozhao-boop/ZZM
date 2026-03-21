/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Agents from './pages/Agents';
import AgentDetails from './pages/AgentDetails';
import AgentDownloads from './pages/AgentDownloads';
import Workflow from './pages/Workflow';
import WorkflowDetails from './pages/WorkflowDetails';
import DailyReview from './pages/DailyReview';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Admin from './pages/Admin';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-white text-black font-sans selection:bg-brand/10 selection:text-brand">
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/:id" element={<AgentDetails />} />
              <Route path="/agents/downloads" element={<AgentDownloads />} />
              <Route path="/workflow" element={<Workflow />} />
              <Route path="/workflow/:id" element={<WorkflowDetails />} />
              <Route path="/daily-review" element={<DailyReview />} />
              <Route path="/daily-review/:id" element={<DailyReview />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
