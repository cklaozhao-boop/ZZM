import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Users, Workflow, Calendar, Package, Home, Globe, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), path: '/', icon: Home },
    { name: t('nav.agents'), path: '/agents', icon: Users },
    { name: t('nav.workflow'), path: '/workflow', icon: Workflow },
    { name: t('nav.logs'), path: '/daily-review', icon: Calendar },
    { name: t('nav.products'), path: '/products', icon: Package },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center items-center gap-4 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 p-1.5 bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full pointer-events-auto"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap",
                isActive ? "text-brand" : "text-gray-500 hover:text-brand"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-white shadow-sm rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon size={18} />
              <span className="hidden md:block text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </motion.div>

      <motion.button
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
        className="flex items-center gap-2 p-3 bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full text-gray-500 hover:text-brand transition-all pointer-events-auto"
      >
        <Globe size={18} />
        <span className="hidden md:block text-xs font-bold uppercase w-6 text-center">{language === 'en' ? 'ZH' : 'EN'}</span>
      </motion.button>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto"
      >
        <Link
          to="/admin"
          className={cn(
            'flex items-center gap-2 rounded-full border border-white/20 bg-white/70 p-3 text-gray-500 shadow-2xl backdrop-blur-xl transition-all hover:text-brand',
            location.pathname === '/admin' && 'text-brand',
          )}
        >
          <Shield size={18} />
          <span className="hidden md:block text-xs font-bold">{language === 'en' ? 'ADMIN' : '后台'}</span>
        </Link>
      </motion.div>
    </nav>
  );
}
