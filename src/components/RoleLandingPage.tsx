'use client';

import React from 'react';
import { useLorrio } from '../context/LorrioContext';
import { Truck, Store, UserCheck, ShieldCheck, MapPin, ArrowRight, Star, Zap } from 'lucide-react';

export const RoleLandingPage: React.FC = () => {
  const { setRole } = useLorrio();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="max-w-5xl mx-auto w-full flex justify-between items-center py-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-2 rounded-xl text-white font-extrabold text-xl tracking-wider shadow-lg">
            LORRIO
          </div>
          <span className="text-xs bg-slate-800 text-orange-400 font-semibold px-2.5 py-1 rounded-full border border-slate-700 hidden sm:inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Kannur ↔ Wayanad Corridor
          </span>
        </div>
        <button
          onClick={() => setRole('ADMIN')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Portal</span>
        </button>
      </header>

      {/* Main Hero */}
      <main className="max-w-4xl mx-auto w-full my-auto py-8 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-500/10 text-orange-400 rounded-full text-xs font-bold border border-orange-500/20">
          <Zap className="w-3.5 h-3.5" /> Direct Quarry to Construction Site Logistics
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Select Your Profile to Enter <br />
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            The Lorrio Marketplace
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          The digital platform connecting construction material demand, quarry suppliers, and lorry transporters in the Kannur ↔ Wayanad corridor.
        </p>

        {/* 3 Entry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 text-left">
          {/* Customer Card */}
          <div
            onClick={() => setRole('CUSTOMER')}
            className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/50 p-6 rounded-2xl cursor-pointer transition-all duration-200 shadow-lg hover:shadow-orange-500/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-orange-600/20 text-orange-400 rounded-xl flex items-center justify-center font-bold text-xl border border-orange-500/30">
                👷
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                I Need Material
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Order Laterite stone from Kannur quarries. Get instant freight estimates, book verified 10-wheelers, and track delivery live.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-orange-400 pt-2 border-t border-slate-800">
              <span>Enter Customer App</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Driver Card */}
          <div
            onClick={() => setRole('DRIVER')}
            className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-2xl cursor-pointer transition-all duration-200 shadow-lg hover:shadow-emerald-500/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald-600/20 text-emerald-400 rounded-xl flex items-center justify-center font-bold text-xl border border-emerald-500/30">
                🚛
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                I Have A Lorry
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accept profitable Kannur ↔ Wayanad stone loads. Eliminate empty backhauls with our Smart Return-Load Optimizer.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400 pt-2 border-t border-slate-800">
              <span>Enter Driver Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Supplier Card */}
          <div
            onClick={() => setRole('SUPPLIER')}
            className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-6 rounded-2xl cursor-pointer transition-all duration-200 shadow-lg hover:shadow-amber-500/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-amber-600/20 text-amber-400 rounded-xl flex items-center justify-center font-bold text-xl border border-amber-500/30">
                🏭
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                I Own A Quarry
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Publish laterite stone stock, set cut finish pricing, manage loading dispatches, and track sales revenue.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-amber-400 pt-2 border-t border-slate-800">
              <span>Enter Quarry Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full text-center text-xs text-slate-500 py-4 border-t border-slate-900 relative z-10">
        <p>LORRIO — Construction-Material Logistics Marketplace © 2026</p>
      </footer>
    </div>
  );
};
