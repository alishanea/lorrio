'use client';

import React, { useState } from 'react';
import { useLorrio } from '../context/LorrioContext';
import { OrderStatus } from '../types/lorrio';
import {
  Truck,
  DollarSign,
  MapPin,
  CheckCircle2,
  Navigation,
  ArrowRightLeft,
  Star,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
} from 'lucide-react';

export const DriverApp: React.FC = () => {
  const {
    driverProfile,
    toggleDriverOnline,
    orders,
    updateOrderStatus,
    updateDriverEta,
    returnLoads,
    acceptReturnLoad,
  } = useLorrio();

  const [etaInput, setEtaInput] = useState('1 hr 35 mins (ETA 04:30 PM)');
  const [isEtaOpen, setIsEtaOpen] = useState(false);

  const activeTrip = orders.find((o) => o.status !== 'DELIVERED') || orders[0];

  const handleAdvanceStatus = () => {
    if (!activeTrip) return;
    const nextMap: Record<OrderStatus, OrderStatus> = {
      BOOKED: 'MATERIAL_READY',
      MATERIAL_READY: 'VEHICLE_ASSIGNED',
      VEHICLE_ASSIGNED: 'IN_TRANSIT',
      IN_TRANSIT: 'DELIVERED',
      DELIVERED: 'DELIVERED',
    };
    updateOrderStatus(activeTrip.id, nextMap[activeTrip.status]);
  };

  const handleSaveEta = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTrip) {
      updateDriverEta(activeTrip.id, etaInput);
      setIsEtaOpen(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Driver Status Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-tr from-orange-600 to-amber-600 rounded-xl flex items-center justify-center text-white shadow font-bold text-lg">
              🚛
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold">{driverProfile.name}</h1>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">{driverProfile.vehicleNumber}</p>
            </div>
          </div>

          <button
            onClick={toggleDriverOnline}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shadow ${
              driverProfile.isOnline ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}
          >
            {driverProfile.isOnline ? '🟢 Online' : '🔴 Offline'}
          </button>
        </div>
      </div>

      {/* Driver Performance Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Today's Earnings</span>
          <span className="text-xl font-black text-slate-900 mt-1 block">
            ₹{driverProfile.todayEarnings.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">+ Return Payout</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Completed Trips</span>
          <span className="text-xl font-black text-slate-900 mt-1 block">{driverProfile.completedTrips}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Kannur ↔ Wayanad</span>
        </div>
      </div>

      {/* Active Trip Execution Card */}
      {activeTrip && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md space-y-4">
          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full">
                Active Assigned Delivery
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-1">
                Order #{activeTrip.id} — {activeTrip.quantity} {activeTrip.unit}
              </h2>
              <p className="text-xs text-slate-500">{activeTrip.pickupLocation} ➔ {activeTrip.deliveryLocation}</p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Freight Payout</span>
              <span className="text-lg font-black text-slate-900">₹{activeTrip.transportPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* ETA Setter Widget */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block">Current Delivery ETA</span>
              <span className="font-bold text-slate-800">{activeTrip.driverEtaText || 'Set Delivery ETA...'}</span>
            </div>
            <button
              onClick={() => setIsEtaOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-3 py-1.5 rounded-lg text-xs"
            >
              Update ETA
            </button>
          </div>

          {/* Status Advancement Action */}
          <button
            onClick={handleAdvanceStatus}
            disabled={activeTrip.status === 'DELIVERED'}
            className={`w-full font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow ${
              activeTrip.status === 'DELIVERED'
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-500 text-white'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>
              {activeTrip.status === 'BOOKED' && 'Step 1: Mark Material Loaded at Quarry'}
              {activeTrip.status === 'MATERIAL_READY' && 'Step 2: Depart Kannur Quarry (In Transit)'}
              {activeTrip.status === 'VEHICLE_ASSIGNED' && 'Step 3: Begin Ghat Pass Transit'}
              {activeTrip.status === 'IN_TRANSIT' && 'Step 4: Confirm Delivery at Wayanad Site'}
              {activeTrip.status === 'DELIVERED' && 'Trip Completed Successfully ✓'}
            </span>
          </button>
        </div>
      )}

      {/* Return Load Optimizer */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xl border border-slate-800 space-y-4">
        <div>
          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            ⚡ LORRIO RETURN LOAD OPTIMIZER
          </span>
          <h3 className="font-bold text-white text-base mt-1">Wayanad ➔ Kannur Return Loads</h3>
          <p className="text-xs text-slate-300">Don't return empty down the ghat pass!</p>
        </div>

        <div className="space-y-3">
          {returnLoads.map((ret) => {
            const isAccepted = ret.status === 'ACCEPTED';
            return (
              <div key={ret.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-white text-sm">{ret.material}</span>
                    <span className="text-slate-400 block text-[11px]">{ret.quantity} • {ret.distanceKm} km</span>
                  </div>
                  <span className="text-base font-black text-emerald-400">+₹{ret.earnings.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => acceptReturnLoad(ret.id)}
                  disabled={isAccepted}
                  className={`w-full font-bold py-2 rounded-lg text-xs transition ${
                    isAccepted
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isAccepted ? '✓ Return Trip Scheduled' : `Accept Return Load (+₹${ret.earnings.toLocaleString()})`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Update ETA Modal */}
      {isEtaOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-2xl space-y-3 text-xs border border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Update Delivery ETA</h3>
            <form onSubmit={handleSaveEta} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Estimated Arrival Time</label>
                <input
                  type="text"
                  required
                  value={etaInput}
                  onChange={(e) => setEtaInput(e.target.value)}
                  placeholder="e.g. 1 hr 30 mins (ETA 04:30 PM)"
                  className="w-full p-2.5 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEtaOpen(false)}
                  className="w-1/3 bg-slate-100 text-slate-700 font-semibold py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-orange-600 text-white font-bold py-2 rounded-lg shadow"
                >
                  Save & Notify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
