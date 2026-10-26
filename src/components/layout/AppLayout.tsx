import React, { useState } from 'react';
import { Sidebar } from './Sidebar.tsx';
import { TopHeader } from './TopHeader.tsx';
import { Footer } from '../common/Footer.tsx';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0faf3] via-[#eaf7ee] to-[#f3f9f2] text-slate-800 flex relative selection:bg-emerald-200 selection:text-emerald-900">
      {/* Subtle organic green aura in the backdrop */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-0 transform translate-x-1/3 -translate-y-1/3" />
      <div className="fixed bottom-0 left-72 w-[400px] h-[400px] bg-teal-200/20 rounded-full blur-3xl pointer-events-none -z-0 transform -translate-x-1/3 translate-y-1/3" />

      {/* Modern Side Navigation Bar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Workspace with sidebar offset on desktop */}
      <div className="flex-1 flex flex-col md:pl-72 min-w-0 z-10">
        <TopHeader onOpenMobileSidebar={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};
