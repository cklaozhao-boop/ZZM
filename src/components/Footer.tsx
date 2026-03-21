import React from 'react';
import { Github, Twitter, Globe, Rss } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { assetUrl, localize, site } from '../lib/content';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="py-12 px-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h3 className="text-xl font-semibold tracking-tight text-black">{site.brandName}</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            {localize(site.footerDescription, language) || t('footer.desc')}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <SocialLink href={site.socialLinks.github} icon={<Github size={20} />} label="GitHub" />
          <SocialLink href="https://x.com" icon={<Twitter size={20} />} label="X" />
          <SocialLink href={site.socialLinks.website} icon={<Globe size={20} />} label="Website" />
          <SocialLink href={assetUrl(site.socialLinks.rss)} icon={<Rss size={20} />} label="Report" />
        </div>

        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} OpenClaw. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-gray-400 hover:text-brand hover:bg-brand/5 rounded-full transition-all duration-300"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
