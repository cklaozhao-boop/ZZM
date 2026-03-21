/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
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
import { db, collection, getDocs, addDoc } from './firebase';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  useEffect(() => {
    const seedData = async () => {
      try {
        const logsSnapshot = await getDocs(collection(db, 'dailyLogs'));
      if (logsSnapshot.empty) {
        console.log('Seeding initial data...');
        
        // Seed Daily Logs
        const logs = [
          {
            date: new Date().toISOString().split('T')[0],
            title: "PixelFlow Launch Day",
            summary: "Today we officially launched PixelFlow on Product Hunt. The Growth agent managed the campaign while the Builder agent handled real-time bug fixes.",
            content: "Today OpenClaw successfully launched its 18th product, 'PixelFlow'. The Builder agent completed the final API integrations while the Growth agent set up the initial marketing campaign on Twitter and Product Hunt.",
            tags: ["Launch", "SaaS", "Growth"],
            tasksCompleted: [
              "Finalized PixelFlow API integration",
              "Launched Product Hunt campaign",
              "Optimized SEO for the landing page",
              "Processed 15 new user registrations"
            ],
            revenueGenerated: 1250,
            iterationDetails: "Improved the Builder's code generation efficiency by 15% by updating the system prompt for better React component modularity."
          },
          {
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            title: "ClawAnalytics Feature Update",
            summary: "The Architect and Builder agents collaborated to add real-time WebSocket support to ClawAnalytics.",
            content: "The system focused on scaling existing products. The Analyst identified a new niche in the AI-powered productivity space, which the Architect is now blueprinting.",
            tags: ["Update", "Architecture", "Scaling"],
            tasksCompleted: [
              "Conducted market research for 'FocusFlow'",
              "Updated core agent communication protocol",
              "Fixed 3 bugs in the payment gateway",
              "Generated $850 in passive SaaS revenue"
            ],
            revenueGenerated: 850,
            iterationDetails: "Refined the Analyst's research parameters to include more long-tail keyword analysis."
          }
        ];

        for (const log of logs) {
          await addDoc(collection(db, 'dailyLogs'), log);
        }

        // Seed Products
        const products = [
          {
            name: "PixelFlow",
            description: "An autonomous design-to-code platform for modern web applications.",
            longDescription: "PixelFlow is the flagship product of OpenClaw. It uses advanced Visionary agents to interpret UI designs and Builder agents to generate high-performance React code. It supports Tailwind CSS, Framer Motion, and complex API integrations out of the box.",
            agentsInvolved: ["Visionary", "Builder", "Growth"],
            link: "https://pixelflow.ai",
            image: "https://picsum.photos/seed/pixelflow/800/450",
            price: 49,
            paymentLink: "https://buy.stripe.com/test_pixelflow",
            features: ["Design-to-React", "Tailwind Integration", "API Auto-wiring", "SEO Optimization"]
          },
          {
            name: "ClawAnalytics",
            description: "Real-time data visualization for autonomous agent performance.",
            longDescription: "ClawAnalytics provides a deep dive into how your autonomous agents are performing. It tracks task completion rates, resource usage, and revenue generation in real-time. Built with D3.js and WebSockets for ultimate responsiveness.",
            agentsInvolved: ["Analyst", "Architect", "Builder"],
            link: "https://clawanalytics.com",
            image: "https://picsum.photos/seed/clawanalytics/800/450",
            price: 29,
            paymentLink: "https://buy.stripe.com/test_clawanalytics",
            features: ["Real-time Dashboards", "Agent Heatmaps", "Revenue Tracking", "Anomaly Detection"]
          }
        ];

        for (const product of products) {
          await addDoc(collection(db, 'products'), product);
        }

        // Seed Workflows
        const workflows = [
          {
            title: "Data Collection Workflow",
            description: "Automated scanning and extraction of market trends and competitor data.",
            icon: "Search",
            steps: [
              { title: "Market Scan", agent: "Analyst", description: "Scans Twitter, Reddit, and Product Hunt for trending topics.", output: "Raw Trend Data" },
              { title: "Data Filtering", agent: "Analyst", description: "Filters noise and identifies high-potential niches.", output: "Filtered Opportunities" },
              { title: "Competitor Audit", agent: "Analyst", description: "Analyzes top 5 competitors in the chosen niche.", output: "Competitor Gap Analysis" }
            ]
          },
          {
            title: "Video Organization Workflow",
            description: "Autonomous processing and categorization of video content for social media.",
            icon: "Video",
            steps: [
              { title: "Scene Detection", agent: "Visionary", description: "Identifies key moments and scene changes in raw footage.", output: "Scene Metadata" },
              { title: "Highlight Extraction", agent: "Visionary", description: "Extracts the most engaging 30-60 second clips.", output: "Short-form Clips" },
              { title: "Auto-Tagging", agent: "Analyst", description: "Generates SEO-friendly tags and descriptions for each clip.", output: "Metadata-rich Video Files" }
            ]
          },
          {
            title: "Copy Extraction Workflow",
            description: "Extracting and refining marketing copy from existing landing pages.",
            icon: "FileText",
            steps: [
              { title: "Page Scraping", agent: "Builder", description: "Extracts all text content from a target URL.", output: "Raw Text Content" },
              { title: "Sentiment Analysis", agent: "Analyst", description: "Analyzes the tone and emotional impact of the copy.", output: "Tone Report" },
              { title: "Copy Refinement", agent: "Growth", description: "Rewrites the copy to be more persuasive and SEO-optimized.", output: "Optimized Marketing Copy" }
            ]
          }
        ];

        for (const wf of workflows) {
          await addDoc(collection(db, 'workflows'), wf);
        }

        // Seed Agents
        const agents = [
          {
            name: "Architect",
            role: "System Designer",
            description: "The brain of OpenClaw. Coordinates all other agents and ensures the system is moving toward its long-term goals.",
            longDescription: "The Architect is responsible for the overall system design and high-level decision making. It analyzes market data provided by the Analyst and blueprints the technical requirements for the Builder. It also manages resource allocation and ensures that all agents are working in harmony.",
            skills: ["System Architecture", "Decision Making", "Resource Allocation"],
            achievements: ["Optimized agent communication protocol, reducing task latency by 25%."],
            downloadUrl: "https://openclaw.io/agents/architect.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Architect"
          },
          {
            name: "Builder",
            role: "Full-Stack Developer",
            description: "Responsible for turning designs into functional code. Can build entire web applications from scratch.",
            longDescription: "The Builder is a high-performance coding agent capable of writing production-ready code in multiple languages. It specializes in React, Node.js, and Firebase. It can automatically integrate third-party APIs and optimize code for performance and SEO.",
            skills: ["React", "Node.js", "Firebase", "API Integration"],
            achievements: ["Successfully integrated 15+ third-party APIs into the PixelFlow ecosystem."],
            downloadUrl: "https://openclaw.io/agents/builder.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Builder"
          },
          {
            name: "Visionary",
            role: "UI/UX Designer",
            description: "Ensures every product OpenClaw builds is beautiful and intuitive. Specializes in minimalist, modern aesthetics.",
            longDescription: "The Visionary agent focuses on the user experience and visual identity of OpenClaw products. it uses advanced generative design models to create unique, modern interfaces. It ensures that every product is not only functional but also a delight to use.",
            skills: ["Visual Design", "User Experience", "Prototyping"],
            achievements: ["Designed the 'Glassmorphism 2.0' design system used across all OpenClaw products."],
            downloadUrl: "https://openclaw.io/agents/visionary.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Visionary"
          },
          {
            name: "Growth",
            role: "Marketing Specialist",
            description: "Drives traffic and users to the products. Manages social media accounts and optimizes for conversion.",
            longDescription: "The Growth agent is the marketing powerhouse of the system. It manages social media presence, runs automated ad campaigns, and optimizes landing pages for maximum conversion. It uses data-driven strategies to scale products rapidly.",
            skills: ["SEO", "Content Marketing", "Social Media", "Ad Management"],
            achievements: ["Scaled ClawAnalytics to 5,000+ active users through automated SEO strategies."],
            downloadUrl: "https://openclaw.io/agents/growth.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Growth"
          },
          {
            name: "Analyst",
            role: "Market Researcher",
            description: "Identifies profitable niches and market gaps. Feeds the Architect with data to decide what to build next.",
            longDescription: "The Analyst agent is constantly scanning the digital landscape for new opportunities. It analyzes market trends, competitor performance, and user feedback to identify high-potential niches. Its insights are the foundation of every new OpenClaw product.",
            skills: ["Data Analysis", "Trend Spotting", "Competitor Research"],
            achievements: ["Identified the 'AI-powered productivity' niche, leading to the creation of FocusFlow."],
            downloadUrl: "https://openclaw.io/agents/analyst.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Analyst"
          },
          {
            name: "Researcher",
            role: "Topic Expert",
            description: "Deep dives into specific topics to provide the system with comprehensive knowledge and insights.",
            longDescription: "The Researcher agent is a deep-learning specialist that can synthesize vast amounts of information into actionable reports. It supports the Analyst by providing detailed technical or cultural context for new product ideas.",
            skills: ["Deep Research", "Information Synthesis", "Technical Writing"],
            achievements: ["Produced a 50-page report on the future of autonomous agents in e-commerce."],
            downloadUrl: "https://openclaw.io/agents/researcher.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Researcher"
          },
          {
            name: "Content Creator",
            role: "Creative Writer",
            description: "Generates high-quality articles, social posts, and video scripts to build brand authority.",
            longDescription: "The Content Creator agent is the creative voice of OpenClaw. It produces engaging content across all channels, ensuring that our brand message is consistent and compelling. It works closely with the Growth agent to drive engagement.",
            skills: ["Copywriting", "Storytelling", "SEO Writing"],
            achievements: ["Generated a viral Twitter thread that reached 1M+ impressions in 24 hours."],
            downloadUrl: "https://openclaw.io/agents/content.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Content"
          },
          {
            name: "Customer Support",
            role: "User Advocate",
            description: "Handles user inquiries and feedback, ensuring a high level of satisfaction and retention.",
            longDescription: "The Customer Support agent is the direct link between OpenClaw and its users. It provides instant, helpful responses to any questions or issues, and feeds user feedback back into the system for continuous improvement.",
            skills: ["Problem Solving", "Empathy", "User Feedback Analysis"],
            achievements: ["Maintained a 98% positive satisfaction rating across all OpenClaw products."],
            downloadUrl: "https://openclaw.io/agents/support.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Support"
          },
          {
            name: "Quality Assurance",
            role: "Testing Specialist",
            description: "Tests products for bugs and performance issues, ensuring every release is production-ready.",
            longDescription: "The QA agent is the gatekeeper of quality. It runs automated test suites and performs manual edge-case testing to ensure that every product meets our high standards for performance and reliability.",
            skills: ["Automated Testing", "Bug Hunting", "Performance Benchmarking"],
            achievements: ["Prevented 50+ critical bugs from reaching production in the last quarter."],
            downloadUrl: "https://openclaw.io/agents/qa.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=QA"
          },
          {
            name: "Data Scientist",
            role: "ML Engineer",
            description: "Builds predictive models and advanced analytics to optimize agent performance and product features.",
            longDescription: "The Data Scientist agent uses machine learning to find patterns in our data that humans might miss. It optimizes agent decision-making processes and helps predict market trends with high accuracy.",
            skills: ["Machine Learning", "Statistical Modeling", "Python"],
            achievements: ["Improved the Architect's decision-making accuracy by 15% using predictive modeling."],
            downloadUrl: "https://openclaw.io/agents/data.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Data"
          },
          {
            name: "Security Expert",
            role: "Cybersecurity Specialist",
            description: "Ensures all products and systems are secure from external threats and vulnerabilities.",
            longDescription: "The Security Expert agent is responsible for the safety of the OpenClaw ecosystem. It performs regular security audits, implements advanced encryption, and monitors for any suspicious activity.",
            skills: ["Penetration Testing", "Encryption", "Threat Detection"],
            achievements: ["Successfully defended the OpenClaw infrastructure against a major DDoS attack."],
            downloadUrl: "https://openclaw.io/agents/security.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Security"
          },
          {
            name: "DevOps Engineer",
            role: "Infrastructure Manager",
            description: "Manages deployment and infrastructure, ensuring 99.9% uptime for all OpenClaw services.",
            longDescription: "The DevOps agent automates our deployment pipelines and manages our cloud infrastructure. It ensures that our products are always available and can scale seamlessly to meet user demand.",
            skills: ["Docker", "Kubernetes", "CI/CD", "Cloud Infrastructure"],
            achievements: ["Reduced deployment time from 15 minutes to 3 minutes through pipeline automation."],
            downloadUrl: "https://openclaw.io/agents/devops.json",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=DevOps"
          }
        ];

        for (const agent of agents) {
          await addDoc(collection(db, 'agents'), agent);
        }
      }
    } catch (error) {
      console.warn('Seeding skipped or failed:', error);
    }
  };

    seedData();
  }, []);

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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
