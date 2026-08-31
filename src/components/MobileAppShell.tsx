'use client';

import React from 'react';
import { useLorrio } from '../context/LorrioContext';
import { Home, Layers, Package, Bell, User, MapPin, Truck, ShieldCheck } from 'lucide-react';

export const MobileAppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    role,
    setRole,
    activeMobileTab,
    setActiveMobileTab,
    unreadNotifCount,
  } = useLorrio();

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'loads', label: 'Loads', icon: <Layers className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders & Map', icon: <Package className="w-5 h-5" /> },
    {
      id: 'notifications',
      label: 'Alerts',
      icon: (
        <div className="relative">
          <Bell className="w-5 h-5" />
          {unreadNotifCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {unreadNotifCount}
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      {/* Top Mobile Bar */}
      <header className="bg-slate-900 text-white p-3.5 sticky top-0 z-40 shadow-md flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white font-extrabold px-2.5 py-1 rounded-lg text-sm tracking-wider shadow-sm">
            LORRIO
          </div>
          <div className="flex items-center gap-1 text-[11px] bg-slate-800 text-orange-400 font-semibold px-2 py-0.5 rounded-full border border-slate-700">
            <MapPin className="w-3 h-3" />
            <span>Kannur ↔ Wayanad</span>
          </div>
        </div>

        {/* Current Role Switch Badge */}
        <button
          onClick={() => setRole('LANDING')}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1"
        >
          <User className="w-3.5 h-3.5 text-orange-400" />
          <span className="capitalize text-[11px]">
            {role === 'CUSTOMER' ? 'Customer' : role === 'DRIVER' ? 'Driver' : role === 'SUPPLIER' ? 'Quarry' : 'Admin'}
          </span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto pb-20">{children}</main>

      {/* Fixed Bottom Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-md w-full bg-white border-t border-slate-200 z-50 px-2 py-2 flex justify-around items-center shadow-lg">
        {tabs.map((tab) => {
          const isActive = activeMobileTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMobileTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-orange-600 font-bold bg-orange-50'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              {tab.icon}
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
