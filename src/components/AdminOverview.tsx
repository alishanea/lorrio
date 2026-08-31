'use client';

import React from 'react';
import { useLorrio } from '../context/LorrioContext';
import {
  ShieldCheck,
  TrendingUp,
  MapPin,
  Truck,
  Store,
  DollarSign,
  Package,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { loads, orders, driverProfile, supplierProfile } = useLorrio();

  const totalVolumeStones = orders.reduce((sum, o) => sum + o.quantity, 0);
  const totalPlatformFees = orders.reduce((sum, o) => sum + o.platformFee, 0);
  const totalTransactionGMV = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Hero Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/30">
            📊 Platform Analytics & Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Kannur ↔ Wayanad Laterite Corridor Overview
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Real-time transaction tracking, verification status, and corridor transport economics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 p-3 rounded-xl border border-slate-700">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-slate-200">System Status: Operational</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Total GMV Moved</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              ₹{totalTransactionGMV.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Kannur-Wayanad volume
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Material Volume</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {totalVolumeStones.toLocaleString()} Stones
            </span>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">
              Laterite blocks transported
            </span>
          </div>
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Platform Service Fees</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              ₹{totalPlatformFees.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">
              2.5% marketplace cut
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Active Verified Quarries</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {loads.length} Loads
            </span>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">
              Mayyil & Sreekandapuram
            </span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Store className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Trust & Verification Management */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Trust & Verification Network</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">Driver Network Verification</span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                ✓ 100% Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Driver: <strong>{driverProfile.name}</strong> ({driverProfile.vehicleNumber}) — RC Book, Insurance & Permit verified for Kannur-Wayanad ghat pass.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">Quarry Source Verification</span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                ✓ Verified Source
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Quarry: <strong>{supplierProfile.quarryName}</strong> ({supplierProfile.location}) — Mining permit & standard block dimensions verified.
            </p>
          </div>
        </div>
      </div>

      {/* Geographic Expansion Roadmap */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-bold">Lorrio Geographic & Material Expansion Strategy</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-800 p-3.5 rounded-xl border border-orange-500/50 space-y-1">
            <span className="text-orange-400 font-bold block">Phase 1 (Active)</span>
            <span className="text-white font-semibold block text-sm">Kannur ↔ Wayanad</span>
            <span className="text-slate-400 block text-[11px]">Laterite Stone focus</span>
          </div>

          <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700 space-y-1">
            <span className="text-slate-400 font-bold block">Phase 2</span>
            <span className="text-white font-semibold block text-sm">Kozhikode & Malappuram</span>
            <span className="text-slate-400 block text-[11px]">M-Sand & Aggregates</span>
          </div>

          <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700 space-y-1">
            <span className="text-slate-400 font-bold block">Phase 3</span>
            <span className="text-white font-semibold block text-sm">Kasaragod & Ernakulam</span>
            <span className="text-slate-400 block text-[11px]">Bricks & Blocks</span>
          </div>

          <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700 space-y-1">
            <span className="text-slate-400 font-bold block">Phase 4</span>
            <span className="text-white font-semibold block text-sm">Pan-South India Expansion</span>
            <span className="text-slate-400 block text-[11px]">Full Procurement Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
};
