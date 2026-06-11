'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic2, Zap, Menu, X, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/generate', label: 'Generate' },
  { href: '/presets', label: 'Presets' },
  { href: '/categories', label: 'Categories' },
  { href: '/use-cases', label: 'Use Cases' },
  { href: '/docs', label: 'Docs' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#07070f]/90 backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/30'
            : 'bg-[#07070f]/70 backdrop-blur-md border-b border-white/5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/40 group-hover:shadow-violet-500/60 transition-shadow">
                <Mic2 className="w-4 h-4 text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#07070f] animate-pulse" />
              </div>
              <div className="leading-none">
                <span className="font-black text-white text-[17px]">VoiceGen</span>
                <span className="text-violet-400 font-black text-[17px]"> Studio</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map(({ href, label }) => {
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200',
                      active
                        ? 'text-white'
                        : 'text-white/55 hover:text-white hover:bg-white/6'
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="navActive"
                        className="absolute inset-0 rounded-lg bg-violet-500/15 border border-violet-500/30"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2.5">
              {/* Browser badge */}
              <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold">
                <Sparkles className="w-3 h-3" />
                Free Browser-Based
              </span>

              <Button variant="glow" size="sm" asChild className="hidden sm:inline-flex">
                <Link href="/generate" className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Open Studio
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </Button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-white/8 bg-[#07070f]/95 backdrop-blur-xl"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV_LINKS.map(({ href, label }) => {
                  const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                        active
                          ? 'bg-violet-500/15 text-violet-300 border border-violet-500/25'
                          : 'text-white/60 hover:text-white hover:bg-white/6'
                      )}
                    >
                      {label}
                    </Link>
                  );
                })}
                <div className="pt-2 pb-1">
                  <Button variant="glow" size="lg" asChild className="w-full">
                    <Link href="/generate" className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Open Voice Studio
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
