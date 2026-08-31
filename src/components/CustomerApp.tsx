'use client';

import React, { useState } from 'react';
import { useLorrio } from '../context/LorrioContext';
import { LoadListing, OrderStatus, MaterialCategory, LocationCoords } from '../types/lorrio';
import { PriceEstimatorWidget } from './PriceEstimatorWidget';
import { LiveGpsTrackerMap } from './LiveGpsTrackerMap';
import { NotificationCenter } from './NotificationCenter';
import {
  Search,
  MapPin,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Star,
  Package,
  ArrowRight,
  MessageSquare,
  Share2,
  Clock,
} from 'lucide-react';

export const CustomerApp: React.FC = () => {
  const { loads, orders, bookLoad, activeMobileTab, rateOrder, generateWhatsAppUrl } = useLorrio();

  const [selectedLoad, setSelectedLoad] = useState<LoadListing | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [customerName, setCustomerName] = useState('Anil Varma');
  const [customerPhone, setCustomerPhone] = useState('+91 94471 00982');
  const [deliveryAddress, setDeliveryAddress] = useState('Plot #42, Main Road, Kalpetta, Wayanad');
  const [deliveryCoords, setDeliveryCoords] = useState<LocationCoords | undefined>(undefined);

  // Rating Modal State
  const [ratingOrder, setRatingOrder] = useState<string | null>(null);
  const [ratingDriver, setRatingDriver] = useState(5);
  const [ratingMaterial, setRatingMaterial] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');

  const activeOrders = orders.filter((o) => o.status !== 'DELIVERED');
  const pastOrders = orders.filter((o) => o.status === 'DELIVERED');
  const primaryActiveOrder = activeOrders[0] || orders[0];

  const handleBookFromEstimator = (details: {
    material: MaterialCategory;
    quantity: number;
    pickupLocation: string;
    deliveryLocation: string;
    materialPrice: number;
    transportPrice: number;
    platformFee: number;
    totalPrice: number;
    deliveryCoords?: LocationCoords;
  }) => {
    const dummyLoad: LoadListing = {
      id: `LOAD-EST-${Date.now()}`,
      supplierId: 'SUP-01',
      supplierName: 'Mayyil Laterite Quarry',
      supplierPhone: '+91 98471 22341',
      supplierRating: 4.9,
      isVerifiedSupplier: true,
      material: details.material,
      quality: 'Premium Cut Finish (High Strength)',
      quantity: details.quantity,
      unit: details.material === 'Laterite Stone' ? 'stones' : 'tons',
      pickupLocation: details.pickupLocation,
      pickupCoords: { address: details.pickupLocation, lat: 11.9744, lng: 75.4851 },
      destinationLocation: details.deliveryLocation,
      destinationCoords: details.deliveryCoords || { address: details.deliveryLocation, lat: 11.6094, lng: 76.0827 },
      materialPrice: details.materialPrice,
      transportPrice: details.transportPrice,
      platformFee: details.platformFee,
      totalPrice: details.totalPrice,
      vehicleType: '10-Wheel Lorry (16 Ton)',
      availableDate: 'Today, Immediate Dispatch',
      status: 'AVAILABLE',
      driverName: 'Sujith V. (Express Haulers)',
      driverPhone: '+91 94473 88102',
      driverRating: 4.88,
      vehicleNumber: 'KL-13-AF-4921',
      isVerifiedDriver: true,
    };

    setSelectedLoad(dummyLoad);
    setDeliveryAddress(details.deliveryLocation);
    setDeliveryCoords(details.deliveryCoords);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLoad) {
      bookLoad(
        selectedLoad.id,
        customerName,
        customerPhone,
        deliveryAddress,
        deliveryAddress,
        deliveryCoords
      );
      setIsBookingOpen(false);
      setSelectedLoad(null);
    }
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ratingOrder) {
      rateOrder(ratingOrder, {
        driverRating: ratingDriver,
        materialRating: ratingMaterial,
        customerRating: 5,
        feedback: feedbackText,
      });
      setRatingOrder(null);
      setFeedbackText('');
    }
  };

  // Render tab content based on activeMobileTab
  if (activeMobileTab === 'notifications') {
    return <NotificationCenter />;
  }

  if (activeMobileTab === 'orders') {
    return (
      <div className="space-y-6 pb-12">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-orange-600" />
          <span>Live Order & GPS Tracking</span>
        </h2>

        {primaryActiveOrder ? (
          <div className="space-y-6">
            {/* Live GPS Tracker Component */}
            <LiveGpsTrackerMap order={primaryActiveOrder} />

            {/* Timeline Progress */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Shipment Status Progress</span>
                <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                  {primaryActiveOrder.status}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1 text-center relative">
                {['BOOKED', 'MATERIAL_READY', 'VEHICLE_ASSIGNED', 'IN_TRANSIT', 'DELIVERED'].map((st, i) => (
                  <div key={st} className="flex flex-col items-center space-y-1">
                    <div className="w-7 h-7 rounded-full bg-orange-600 text-white font-bold text-xs flex items-center justify-center shadow">
                      ✓
                    </div>
                    <span className="text-[9px] font-semibold text-slate-700 leading-tight">{st}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-2">
            <Package className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-700">No Active Orders</h3>
            <p className="text-xs text-slate-400">Place an order using the Price Estimator to track live GPS lorry delivery.</p>
          </div>
        )}
      </div>
    );
  }

  if (activeMobileTab === 'loads') {
    return (
      <div className="space-y-4 pb-12">
        <h2 className="text-xl font-bold text-slate-900">Available Quarry Loads</h2>
        <div className="grid grid-cols-1 gap-4">
          {loads.map((load) => (
            <div key={load.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-md">
                    {load.material}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-2">
                    {load.quantity} {load.unit}
                  </h3>
                  <p className="text-xs text-slate-500">{load.quality}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-slate-900">₹{load.totalPrice.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 block">Total</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Source:</span>
                  <span className="font-semibold text-slate-800">{load.pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Driver:</span>
                  <span className="font-semibold text-slate-800">{load.driverName || 'Verified Driver'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedLoad(load);
                  setIsBookingOpen(true);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow"
              >
                <span>Book This Load</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default 'home' tab
  return (
    <div className="space-y-6 pb-12">
      {/* Interactive Price Estimator Header Widget */}
      <PriceEstimatorWidget onBookEstimatedLoad={handleBookFromEstimator} />

      {/* Active Delivery Notification Card if any */}
      {primaryActiveOrder && (
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-2xl border border-slate-700 shadow-md space-y-3">
          <div className="flex justify-between items-center">
            <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-500/30">
              ACTIVE SHIPMENT
            </span>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {primaryActiveOrder.driverEtaText || 'ETA 04:30 PM'}
            </span>
          </div>

          <div>
            <h4 className="font-bold text-sm">Order #{primaryActiveOrder.id} — En Route</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              {primaryActiveOrder.quantity} {primaryActiveOrder.unit} {primaryActiveOrder.material}
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                const url = generateWhatsAppUrl(primaryActiveOrder);
                window.open(url, '_blank');
              }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Details</span>
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingOpen && selectedLoad && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-base">Confirm Booking</h3>
              <button onClick={() => setIsBookingOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3 text-xs">
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 space-y-1 text-orange-950">
                <div className="flex justify-between font-bold">
                  <span>{selectedLoad.quantity} {selectedLoad.unit}</span>
                  <span>₹{selectedLoad.totalPrice.toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-orange-800">{selectedLoad.material}</div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer / Site Manager</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Delivery Site Address</label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="w-1/3 bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl shadow"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
