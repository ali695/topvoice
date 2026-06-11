'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mic2, Zap, Library, History, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/generate', label: 'Studio', icon: Zap },
  { href: '/presets', label: 'Presets', icon: Library },
  { href: '/history', label: 'History', icon: History },
  { href: '/pricing', label: 'Pricing', icon: null },
  { href: '/docs', label: 'Docs', icon: null },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#07070f]/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
              <Mic2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-lg leading-none">VoiceGen</span>
              <span className="text-violet-400 font-bold text-lg leading-none"> Studio</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                    active
                      ? 'bg-violet-500/15 text-violet-300'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
            <Button variant="glow" size="sm" asChild>
              <Link href="/generate" className="flex items-center gap-1.5">
                Start Free
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
