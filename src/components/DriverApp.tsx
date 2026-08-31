'use client';

import React from 'react';
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
    returnLoads,
    acceptReturnLoad,
  } = useLorrio();

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

  return (
    <div className="space-y-8 pb-12">
      {/* Driver Status Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-tr from-orange-600 to-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg font-bold text-xl">
            🚛
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{driverProfile.name}</h1>
              {driverProfile.isVerified && (
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Driver
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Vehicle: <span className="font-mono text-slate-200">{driverProfile.vehicleNumber}</span> ({driverProfile.vehicleType})
            </p>
          </div>
        </div>

        {/* Online Status Switch */}
        <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-xl border border-slate-700">
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">Availability Status</span>
            <span
              className={`text-xs font-bold ${
                driverProfile.isOnline ? 'text-emerald-400' : 'text-slate-400'
              }`}
            >
              {driverProfile.isOnline ? '🟢 Available for Loads' : '🔴 Offline'}
            </span>
          </div>
          <button
            onClick={toggleDriverOnline}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow ${
              driverProfile.isOnline
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
            }`}
          >
            {driverProfile.isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      {/* Driver Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Today's Earnings</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              ₹{driverProfile.todayEarnings.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Includes return trip payout
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Completed Trips</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {driverProfile.completedTrips}
            </span>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">
              Kannur ↔ Wayanad Hauls
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Driver Rating</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block flex items-center gap-1">
              {driverProfile.rating} <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </span>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">
              Top Rated Transporter
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Star className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Active Trip Execution Card */}
      {activeTrip && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs bg-orange-100 text-orange-800 font-bold px-2.5 py-1 rounded-full">
                Active Assigned Delivery
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">
                Order #{activeTrip.id} — {activeTrip.quantity} {activeTrip.unit} {activeTrip.material}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Route: <span className="font-semibold text-slate-700">{activeTrip.pickupLocation}</span> ➔{' '}
                <span className="font-semibold text-slate-700">{activeTrip.deliveryLocation}</span>
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 block">Trip Freight Fee</span>
              <span className="text-2xl font-black text-slate-900">
                ₹{activeTrip.transportPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Live Status Control Panel */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Current Trip Status</span>
              <span className="font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                {activeTrip.status}
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdvanceStatus}
                disabled={activeTrip.status === 'DELIVERED'}
                className={`w-full font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow ${
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
          </div>
        </div>
      )}

      {/* Smart Return Load Optimizer (Section 13 of Brief) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" /> Lorrio Return Load Optimizer
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold">
              Avoid Empty Lorry Returns: Wayanad ➔ Kannur Return Loads
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              After dropping off laterite stone in Wayanad, pick up return construction materials (aggregates/timber) back to Kannur to maximize lorry revenue.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {returnLoads.map((ret) => {
            const isAccepted = ret.status === 'ACCEPTED';
            return (
              <div
                key={ret.id}
                className={`rounded-xl p-5 border transition-all space-y-3 ${
                  isAccepted
                    ? 'bg-slate-800/80 border-emerald-500/50'
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      RETURN TRIP • {ret.distanceKm} km
                    </span>
                    <h3 className="font-bold text-white text-base mt-2">{ret.material}</h3>
                    <p className="text-xs text-slate-400">{ret.quantity}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-emerald-400">
                      +₹{ret.earnings.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Payout on delivery</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-1 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pickup:</span>
                    <span className="font-medium">{ret.pickupLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Drop-off:</span>
                    <span className="font-medium">{ret.destinationLocation}</span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => acceptReturnLoad(ret.id)}
                    disabled={isAccepted}
                    className={`w-full font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 transition-all ${
                      isAccepted
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                    }`}
                  >
                    {isAccepted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Return Load Accepted & Scheduled</span>
                      </>
                    ) : (
                      <>
                        <ArrowRightLeft className="w-4 h-4" />
                        <span>Accept Return Load (+₹{ret.earnings.toLocaleString()})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
