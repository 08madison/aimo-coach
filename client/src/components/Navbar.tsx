import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, Trophy, Users, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/practice', label: '开始练习', icon: BookOpen },
    { href: '/leaderboard', label: '排行榜', icon: Trophy },
    { href: '/pricing', label: '订阅计划', icon: Sparkles },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src="/manus-storage/logo-icon_2f043b67.png"
                  alt="奥数AI教练"
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-white font-bold text-lg">∑</span>';
                  }}
                />
              </div>
              <div>
                <span
                  className={`font-bold text-lg leading-none transition-colors ${
                    scrolled ? 'text-foreground' : 'text-foreground'
                  }`}
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  奥数AI教练
                </span>
                <div className="text-[10px] text-muted-foreground leading-none mt-0.5">
                  7-12年级 · 智能辅导
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}>
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                    location === href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              登录
            </Button>
            <Link href="/pricing">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                免费开始
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-lg">
          <div className="container py-4 flex flex-col gap-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <span
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={16} className="text-primary" />
                  {label}
                </span>
              </Link>
            ))}
            <div className="flex gap-2 mt-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm" className="flex-1">登录</Button>
              <Link href="/pricing" className="flex-1">
                <Button size="sm" className="w-full bg-primary text-primary-foreground">免费开始</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
