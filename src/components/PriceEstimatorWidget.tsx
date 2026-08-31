'use client';

import React, { useState } from 'react';
import { MaterialCategory } from '../types/lorrio';
import { Calculator, MapPin, Truck, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { LocationPickerMap } from './LocationPickerMap';
import { LocationCoords } from '../types/lorrio';

interface PriceEstimatorWidgetProps {
  onBookEstimatedLoad?: (details: {
    material: MaterialCategory;
    quantity: number;
    pickupLocation: string;
    deliveryLocation: string;
    materialPrice: number;
    transportPrice: number;
    platformFee: number;
    totalPrice: number;
    deliveryCoords?: LocationCoords;
  }) => void;
}

export const PriceEstimatorWidget: React.FC<PriceEstimatorWidgetProps> = ({ onBookEstimatedLoad }) => {
  const [material, setMaterial] = useState<MaterialCategory>('Laterite Stone');
  const [quantity, setQuantity] = useState<number>(500);
  const [pickup, setPickup] = useState<string>('Mayyil Quarry, Kannur');
  const [delivery, setDelivery] = useState<string>('Kalpetta, Wayanad');
  const [showMapPicker, setShowMapPicker] = useState<boolean>(false);
  const [customCoords, setCustomCoords] = useState<LocationCoords | undefined>(undefined);

  // Dynamic Freight & Material Price Math
  const baseRatePerStone = material === 'Laterite Stone' ? 33 : 30;
  const freightBasePerStone = 13;
  
  const materialPrice = quantity * baseRatePerStone;
  const transportPrice = quantity * freightBasePerStone;
  const platformFee = Math.round((materialPrice + transportPrice) * 0.025);
  const totalPrice = materialPrice + transportPrice + platformFee;

  const handleLocationSelected = (coords: LocationCoords) => {
    setDelivery(coords.address);
    setCustomCoords(coords);
    setShowMapPicker(false);
  };

  const handleBookClick = () => {
    if (onBookEstimatedLoad) {
      onBookEstimatedLoad({
        material,
        quantity,
        pickupLocation: pickup,
        deliveryLocation: delivery,
        materialPrice,
        transportPrice,
        platformFee,
        totalPrice,
        deliveryCoords: customCoords,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md space-y-5">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-100 text-orange-700 rounded-xl">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Interactive Price Estimator</h3>
            <p className="text-xs text-slate-500">Instant quote for Kannur ↔ Wayanad material freight</p>
          </div>
        </div>
        <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Guaranteed Rate
        </span>
      </div>

      {/* Material Selector Pills */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700">Select Material</label>
        <div className="flex flex-wrap gap-2">
          {(['Laterite Stone', 'M-Sand', 'Granite Aggregates (20mm)', 'Red Wire-Cut Bricks'] as MaterialCategory[]).map(
            (m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMaterial(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  material === m
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {m}
              </button>
            )
          )}
        </div>
      </div>

      {/* Quantity Range Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <label className="font-semibold text-slate-700">Order Quantity</label>
          <span className="font-black text-orange-600 text-sm bg-orange-50 px-2 py-0.5 rounded">
            {quantity} {material === 'Laterite Stone' ? 'stones' : 'tons'} (10-Wheel Load)
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="1500"
          step="50"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full accent-orange-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
          <span>200 (Min Load)</span>
          <span>500 (Standard Lorry)</span>
          <span>1,500 (Multi-Lorry)</span>
        </div>
      </div>

      {/* Corridor Location Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Kannur Pickup Quarry</label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-orange-500 outline-none"
          >
            <option value="Mayyil Quarry, Kannur">Mayyil Quarry Works, Kannur</option>
            <option value="Sreekandapuram, Kannur">Sreekandapuram Quarry, Kannur</option>
            <option value="Anthoor, Kannur">Anthoor Stone Quarry, Kannur</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-slate-700">Wayanad Delivery Site</label>
            <button
              type="button"
              onClick={() => setShowMapPicker(!showMapPicker)}
              className="text-[11px] text-orange-600 hover:underline font-bold flex items-center gap-0.5"
            >
              <MapPin className="w-3 h-3" /> Map Pin
            </button>
          </div>
          <input
            type="text"
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
            placeholder="Address in Wayanad..."
            className="w-full p-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
      </div>

      {/* Map Picker Drawer */}
      {showMapPicker && (
        <LocationPickerMap
          initialAddress={delivery}
          onSelectLocation={handleLocationSelected}
          onClose={() => setShowMapPicker(false)}
        />
      )}

      {/* Real-time Price Breakdown Display */}
      <div className="bg-slate-900 text-white rounded-xl p-4 space-y-2 text-xs">
        <div className="flex justify-between text-slate-300">
          <span>Material Cost ({quantity} units)</span>
          <span className="font-semibold text-white">₹{materialPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Lorry Freight (Kannur ➔ Wayanad Ghat)</span>
          <span className="font-semibold text-white">₹{transportPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Lorrio Service Fee (2.5%)</span>
          <span>₹{platformFee.toLocaleString()}</span>
        </div>
        <div className="border-t border-slate-800 pt-2 flex justify-between items-center">
          <div>
            <span className="text-slate-400 text-[10px] block">Estimated Total Payout</span>
            <span className="text-xl font-black text-emerald-400">₹{totalPrice.toLocaleString()}</span>
          </div>
          <button
            type="button"
            onClick={handleBookClick}
            className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition shadow"
          >
            <span>Book Instant Load</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
