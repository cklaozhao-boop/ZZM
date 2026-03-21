/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Route, Routes } from 'react-router-dom';
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
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-white text-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agents/:id" element={<AgentDetails />} />
            <Route path="/agents/downloads" element={<AgentDownloads />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/workflow/:id" element={<WorkflowDetails />} />
            <Route path="/daily-review" element={<DailyReview />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
