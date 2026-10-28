'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Video, BookOpen, FolderDown, Users, 
  RefreshCw, Layers, BarChart3, ShieldAlert, Settings, HelpCircle, LogOut 
} from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Growth Lab Replays', href: '/replays', icon: Video },
  { label: 'Training System', href: '/training', icon: BookOpen },
  { label: 'Resource Library', href: '/resources', icon: FolderDown },
  { label: 'Clients & Access', href: '/clients', icon: Users },
  { label: 'Sync & Provisioning', href: '/provisioning', icon: RefreshCw },
  { label: 'Portal Structure', href: '/structure', icon: Layers },
  { label: 'Reports & Analytics', href: '/reports', icon: BarChart3 },
  { label: 'Audit Logs', href: '/audit-log', icon: ShieldAlert },
  { label: 'Settings & Team', href: '/settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded bg-blue-900 flex items-center justify-center text-white font-bold font-serif">b3</div>
          <span className="text-lg font-serif font-semibold text-slate-900">
            Consult b3 <span className="text-sm font-sans font-normal text-slate-500 ml-2">Admin Portal</span>
          </span>
        </div>
        <button onClick={handleLogout} className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center space-x-2">
          <span>Sign Out</span>
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between hidden md:flex shrink-0">
          <nav className="space-y-1 p-4">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}