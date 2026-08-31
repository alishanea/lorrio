'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Search, Check, Crosshair } from 'lucide-react';
import { LocationCoords } from '../types/lorrio';

interface LocationPickerMapProps {
  initialAddress?: string;
  onSelectLocation: (coords: LocationCoords) => void;
  onClose?: () => void;
}

export const LocationPickerMap: React.FC<LocationPickerMapProps> = ({
  initialAddress = 'Plot #42, Main Road, Kalpetta, Wayanad',
  onSelectLocation,
  onClose,
}) => {
  const [address, setAddress] = useState(initialAddress);
  const [selectedLat, setSelectedLat] = useState(11.6094);
  const [selectedLng, setSelectedLng] = useState(76.0827);
  const [activePin, setActivePin] = useState<'Kalpetta' | 'Mananthavady' | 'Bathery' | 'Mayyil'>('Kalpetta');

  const presetLocations = [
    { label: 'Kalpetta Site, Wayanad', lat: 11.6094, lng: 76.0827, pin: 'Kalpetta' },
    { label: 'Mananthavady Villa Site, Wayanad', lat: 11.8026, lng: 76.0034, pin: 'Mananthavady' },
    { label: 'Sulthan Bathery Site, Wayanad', lat: 11.6644, lng: 76.2575, pin: 'Bathery' },
    { label: 'Mayyil Quarry Works, Kannur', lat: 11.9744, lng: 75.4851, pin: 'Mayyil' },
  ];

  const handleSelectPreset = (loc: typeof presetLocations[0]) => {
    setAddress(loc.label);
    setSelectedLat(loc.lat);
    setSelectedLng(loc.lng);
    setActivePin(loc.pin as any);
  };

  const handleConfirm = () => {
    onSelectLocation({
      address,
      lat: selectedLat,
      lng: selectedLng,
    });
    if (onClose) onClose();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden space-y-4 p-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-orange-600" />
          <h3 className="font-bold text-slate-900 text-sm">Select Delivery Location on Map</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm">
            ✕
          </button>
        )}
      </div>

      {/* Address Search & Quick Select */}
      <div className="space-y-2">
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Search address, landmark or site..."
            className="w-full text-xs p-3 pl-9 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {presetLocations.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition ${
                activePin === p.pin
                  ? 'bg-orange-100 text-orange-800 border border-orange-300 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              📍 {p.label.split(',')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Visual Simulation Container */}
      <div className="relative h-48 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between p-3">
        {/* Map grid simulation lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Route path line representation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-3/4 h-0.5 bg-dashed border-t-2 border-orange-500/60 opacity-80 rotate-12" />
        </div>

        {/* Map Pin Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
          <div className="bg-orange-600 text-white p-2 rounded-full shadow-lg animate-bounce">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow border border-slate-700 mt-1 whitespace-nowrap">
            {address.split(',')[0]}
          </span>
        </div>

        {/* Top Controls */}
        <div className="relative z-10 flex justify-between items-center text-white">
          <span className="text-[10px] bg-slate-800/90 backdrop-blur px-2 py-1 rounded font-mono border border-slate-700">
            GPS: {selectedLat.toFixed(4)}° N, {selectedLng.toFixed(4)}° E
          </span>
          <button
            type="button"
            onClick={() => handleSelectPreset(presetLocations[0])}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-white text-xs flex items-center gap-1 border border-slate-700"
          >
            <Crosshair className="w-3.5 h-3.5 text-orange-400" />
            <span>My Location</span>
          </button>
        </div>

        {/* Bottom Location Indicator */}
        <div className="relative z-10 bg-slate-800/90 backdrop-blur text-white text-xs p-2 rounded-lg border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate font-medium">{address}</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
            Pin Set
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow"
      >
        <Check className="w-4 h-4" />
        <span>Confirm Selected Pin Location</span>
      </button>
    </div>
  );
};
