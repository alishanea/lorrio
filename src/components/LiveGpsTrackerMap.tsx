'use client';

import React from 'react';
import { Order } from '../types/lorrio';
import { useLorrio } from '../context/LorrioContext';
import { Navigation, Truck, MapPin, Phone, MessageSquare, Clock, ShieldCheck, Share2 } from 'lucide-react';

interface LiveGpsTrackerMapProps {
  order: Order;
}

export const LiveGpsTrackerMap: React.FC<LiveGpsTrackerMapProps> = ({ order }) => {
  const { generateWhatsAppUrl } = useLorrio();

  const handleShareWhatsApp = () => {
    const url = generateWhatsAppUrl(order);
    window.open(url, '_blank');
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
      {/* Header Info */}
      <div className="flex justify-between items-start border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-orange-500/20 text-orange-400 text-[11px] font-bold px-2 py-0.5 rounded border border-orange-500/30">
              LIVE GPS TRACKING
            </span>
            <span className="text-xs text-slate-400 font-mono">ORDER #{order.id}</span>
          </div>
          <h3 className="font-bold text-white text-base mt-1">
            {order.quantity} {order.unit} — {order.material}
          </h3>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block font-medium">Estimated Arrival</span>
          <span className="text-sm font-black text-emerald-400 flex items-center gap-1 justify-end mt-0.5">
            <Clock className="w-3.5 h-3.5" />
            {order.driverEtaText || '1 hr 35 mins (ETA 04:30 PM)'}
          </span>
        </div>
      </div>

      {/* Simulated Live Map Canvas */}
      <div className="relative h-56 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between p-3">
        {/* Topographic map pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

        {/* Ghat Pass Route Overlay Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 40 180 Q 150 140 220 100 T 360 40"
            fill="none"
            stroke="#EA580C"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="animate-pulse"
          />
        </svg>

        {/* Kannur Quarry Origin Pin */}
        <div className="absolute bottom-6 left-6 flex items-center gap-1.5 z-10">
          <div className="p-1.5 bg-orange-600 rounded-full text-white shadow">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] bg-slate-900/90 text-slate-300 font-bold px-2 py-0.5 rounded border border-slate-700">
            Kannur Quarry
          </span>
        </div>

        {/* Moving Lorry Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
          <div className="bg-emerald-500 text-slate-950 p-2.5 rounded-full shadow-lg ring-4 ring-emerald-500/20 animate-bounce">
            <Truck className="w-5 h-5" />
          </div>
          <div className="bg-slate-900/95 text-white text-[10px] font-bold px-2 py-1 rounded shadow border border-emerald-500/50 mt-1 text-center whitespace-nowrap">
            <span>{order.vehicleNumber || 'KL-13-AF-4921'}</span>
            <span className="text-emerald-400 block text-[9px]">42 km/h • Thamarassery Ghat</span>
          </div>
        </div>

        {/* Wayanad Site Destination Pin */}
        <div className="absolute top-6 right-6 flex items-center gap-1.5 z-10">
          <span className="text-[10px] bg-slate-900/90 text-slate-300 font-bold px-2 py-0.5 rounded border border-slate-700">
            Wayanad Site
          </span>
          <div className="p-1.5 bg-emerald-600 rounded-full text-white shadow">
            <MapPin className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Top Live Banner */}
        <div className="relative z-10 flex justify-between items-center text-xs">
          <span className="bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-full text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            En Route (Ghat Pass)
          </span>
          <span className="bg-slate-900/80 backdrop-blur text-slate-300 font-mono text-[10px] px-2 py-1 rounded border border-slate-800">
            Route: Kannur ➔ Wayanad
          </span>
        </div>
      </div>

      {/* Driver Details & WhatsApp Sharing Actions */}
      <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center font-bold text-base">
            👤
          </div>
          <div>
            <span className="font-bold text-white block">{order.driverName || 'Sujith V. (Driver)'}</span>
            <span className="text-slate-400 block text-[11px]">
              Lorry: <strong className="text-slate-200">{order.vehicleNumber || 'KL-13-AF-4921'}</strong>
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={`tel:${order.driverPhone || '+919447388102'}`}
            className="flex-1 sm:flex-none bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Call Driver</span>
          </a>

          <button
            onClick={handleShareWhatsApp}
            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition shadow"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Share WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
