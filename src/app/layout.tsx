import './globals.css';
import React from 'react';
import { LorrioProvider } from '../context/LorrioContext';

export const metadata = {
  title: 'Lorrio — Construction-Material Logistics Marketplace',
  description: 'Kannur ↔ Wayanad Laterite Stone Logistics Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-900 font-sans antialiased">
        <LorrioProvider>{children}</LorrioProvider>
      </body>
    </html>
  );
}
