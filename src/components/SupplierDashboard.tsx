'use client';

import React, { useState } from 'react';
import { useLorrio } from '../context/LorrioContext';
import { MaterialCategory, QualityGrade } from '../types/lorrio';
import {
  Store,
  PlusCircle,
  Package,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Truck,
  Layers,
  Star,
} from 'lucide-react';

export const SupplierDashboard: React.FC = () => {
  const { supplierProfile, loads, createLoadListing, orders } = useLorrio();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [material, setMaterial] = useState<MaterialCategory>('Laterite Stone');
  const [quality, setQuality] = useState<QualityGrade>('Premium Cut Finish (High Strength)');
  const [quantity, setQuantity] = useState(500);
  const [unit, setUnit] = useState('stones');
  const [pickupLocation, setPickupLocation] = useState('Mayyil, Kannur');
  const [destinationLocation, setDestinationLocation] = useState('Kalpetta, Wayanad');
  const [materialPrice, setMaterialPrice] = useState(16500);
  const [transportPrice, setTransportPrice] = useState(6500);
  const [vehicleType, setVehicleType] = useState('10-Wheel Lorry (16 Ton)');
  const [availableDate, setAvailableDate] = useState('Tomorrow, 07:00 AM');

  const supplierListings = loads.filter((l) => l.supplierId === supplierProfile.id);

  const handleSubmitLoad = (e: React.FormEvent) => {
    e.preventDefault();
    createLoadListing({
      material,
      quality,
      quantity,
      unit,
      pickupLocation,
      destinationLocation,
      materialPrice,
      transportPrice,
      vehicleType,
      availableDate,
    });
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Supplier Profile Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-tr from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg font-bold text-xl">
            🏭
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{supplierProfile.quarryName}</h1>
              {supplierProfile.isVerified && (
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Quarry Source
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Proprietor: <span className="font-semibold text-slate-200">{supplierProfile.ownerName}</span> •{' '}
              <span className="text-slate-300">{supplierProfile.location}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish New Quarry Load</span>
        </button>
      </div>

      {/* Supplier Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Active Listings</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {supplierListings.length} Loads
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
              Published on Marketplace
            </span>
          </div>
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Total Orders Sales</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {supplierProfile.totalSalesCount}
            </span>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">
              Kannur ↔ Wayanad Deliveries
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Total Quarry Revenue</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              ₹{(supplierProfile.revenueTotal / 100000).toFixed(1)} Lakhs
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Direct payout settlement
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Quarry Rating</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block flex items-center gap-1">
              {supplierProfile.rating} <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </span>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">
              Top Rated Supplier
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Star className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Active Quarry Load Listings */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Your Published Material Listings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supplierListings.map((load) => (
            <div
              key={load.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-md">
                    {load.material}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {load.quantity} {load.unit}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{load.quality}</p>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">
                    ₹{load.totalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 block">Total Customer Price</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Source Quarry</span>
                  <span className="font-semibold text-slate-800">{load.pickupLocation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Corridor Route</span>
                  <span className="font-semibold text-slate-800">{load.destinationLocation}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-200/60 flex justify-between text-slate-600">
                  <span>Material Price: <strong>₹{load.materialPrice.toLocaleString()}</strong></span>
                  <span>Lorry Transport: <strong>₹{load.transportPrice.toLocaleString()}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publish New Load Listing Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Publish New Quarry Load</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitLoad} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Material Type
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value as MaterialCategory)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option value="Laterite Stone">Laterite Stone</option>
                    <option value="M-Sand">M-Sand</option>
                    <option value="Plastering Sand">Plastering Sand</option>
                    <option value="Granite Aggregates (20mm)">Granite Aggregates (20mm)</option>
                    <option value="Red Wire-Cut Bricks">Red Wire-Cut Bricks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quality Grade
                  </label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value as QualityGrade)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option value="Premium Cut Finish (High Strength)">Premium Cut Finish</option>
                    <option value="Standard Machine Cut (Building Grade)">Standard Machine Cut</option>
                    <option value="Quarry Direct Standard">Quarry Direct Standard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Unit (stones / tons)
                  </label>
                  <input
                    type="text"
                    required
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quarry Pickup (Kannur)
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination (Wayanad)
                  </label>
                  <input
                    type="text"
                    required
                    value={destinationLocation}
                    onChange={(e) => setDestinationLocation(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Material Cost (₹ INR)
                  </label>
                  <input
                    type="number"
                    required
                    value={materialPrice}
                    onChange={(e) => setMaterialPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Transport Freight Fee (₹ INR)
                  </label>
                  <input
                    type="number"
                    required
                    value={transportPrice}
                    onChange={(e) => setTransportPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs shadow"
                >
                  Publish Load Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
