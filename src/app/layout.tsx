import './globals.css';
import React from 'react';
import { LorrioProvider } from '../context/LorrioContext';
import { Header } from '../components/Header';

export const metadata = {
  title: 'Lorrio — Construction-Material Logistics Marketplace',
  description: 'Kannur ↔ Wayanad Laterite Stone Logistics Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <LorrioProvider>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            {children}
          </main>
          <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs text-center">
            <p>LORRIO — Construction-Material Logistics Marketplace © 2026</p>
            <p className="mt-1 text-slate-500">Kannur ↔ Wayanad Laterite Stone Logistics Corridor</p>
          </footer>
        </LorrioProvider>
      </body>
    </html>
  );
}
