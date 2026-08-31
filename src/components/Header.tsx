'use client';

import React from 'react';
import { useLorrio } from '../context/LorrioContext';
import { UserRole } from '../types/lorrio';
import { Truck, Store, UserCheck, ShieldCheck, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole } = useLorrio();

  const roles: { id: UserRole; label: string; icon: React.ReactNode }[] = [
    { id: 'CUSTOMER', label: 'Customer App', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'DRIVER', label: 'Driver App', icon: <Truck className="w-4 h-4" /> },
    { id: 'SUPPLIER', label: 'Supplier Dashboard', icon: <Store className="w-4 h-4" /> },
    { id: 'ADMIN', label: 'Platform Admin', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Corridor Badge */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-2 rounded-lg text-white font-extrabold flex items-center gap-1.5 shadow-sm">
              <span className="text-xl tracking-wider">LORRIO</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-full text-xs text-orange-400 font-medium border border-slate-700">
              <MapPin className="w-3.5 h-3.5" />
              <span>Kannur ↔ Wayanad Corridor</span>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            {roles.map((r) => {
              const isActive = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {r.icon}
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
