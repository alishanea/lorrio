'use client';

import React, { useState } from 'react';
import { useLorrio } from '../context/LorrioContext';
import { LoadListing, OrderStatus, MaterialCategory } from '../types/lorrio';
import {
  Search,
  MapPin,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Star,
  Package,
  Calendar,
  Clock,
  ArrowRight,
  Info,
  ChevronRight,
  AlertCircle,
  ThumbsUp,
} from 'lucide-react';

export const CustomerApp: React.FC = () => {
  const { loads, orders, bookLoad, rateOrder } = useLorrio();

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialCategory>('Laterite Stone');
  const [selectedPickup, setSelectedPickup] = useState<string>('Kannur');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('Wayanad');
  const [selectedLoad, setSelectedLoad] = useState<LoadListing | null>(null);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [customerName, setCustomerName] = useState('Anil Varma');
  const [customerPhone, setCustomerPhone] = useState('+91 94471 00982');
  const [deliveryAddress, setDeliveryAddress] = useState('Plot #42, Main Road, Kalpetta, Wayanad');

  // Rating Modal State
  const [ratingOrder, setRatingOrder] = useState<string | null>(null);
  const [ratingDriver, setRatingDriver] = useState(5);
  const [ratingMaterial, setRatingMaterial] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');

  const activeOrders = orders.filter((o) => o.status !== 'DELIVERED');
  const pastOrders = orders.filter((o) => o.status === 'DELIVERED');

  const filteredLoads = loads.filter(
    (l) =>
      l.status === 'AVAILABLE' &&
      l.material === selectedMaterial
  );

  const handleBookClick = (load: LoadListing) => {
    setSelectedLoad(load);
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
        selectedDelivery
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

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'BOOKED':
        return 0;
      case 'MATERIAL_READY':
        return 1;
      case 'VEHICLE_ASSIGNED':
        return 2;
      case 'IN_TRANSIT':
        return 3;
      case 'DELIVERED':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Banner / Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/50">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-semibold border border-orange-500/30">
            🪨 Kannur ↔ Wayanad Construction Logistics
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Order Construction Materials & Book Lorry Delivery Direct from Quarry
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Search verified laterite stone quarry loads in Kannur, match reliable 10-wheeler lorries, and track your delivery live to Wayanad construction sites.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 bg-slate-800/90 backdrop-blur p-4 rounded-xl border border-slate-700 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Material Needed
            </label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value as MaterialCategory)}
              className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="Laterite Stone">🪨 Laterite Stone</option>
              <option value="M-Sand">⏳ M-Sand (Manufactured Sand)</option>
              <option value="Plastering Sand">🏖️ Plastering Sand</option>
              <option value="Granite Aggregates (20mm)">🪨 Granite Aggregates (20mm)</option>
              <option value="Red Wire-Cut Bricks">🧱 Red Wire-Cut Bricks</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Pickup Source
            </label>
            <select
              value={selectedPickup}
              onChange={(e) => setSelectedPickup(e.target.value)}
              className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="Kannur">📍 Kannur District (All Quarries)</option>
              <option value="Mayyil, Kannur">Mayyil Quarry Belt</option>
              <option value="Sreekandapuram, Kannur">Sreekandapuram Belt</option>
              <option value="Anthoor, Kannur">Anthoor Stone Region</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Delivery Destination
            </label>
            <select
              value={selectedDelivery}
              onChange={(e) => setSelectedDelivery(e.target.value)}
              className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="Wayanad">📍 Wayanad District</option>
              <option value="Kalpetta, Wayanad">Kalpetta</option>
              <option value="Mananthavady, Wayanad">Mananthavady</option>
              <option value="Sulthan Bathery, Wayanad">Sulthan Bathery</option>
              <option value="Vythiri, Wayanad">Vythiri</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-all shadow-md">
              <Search className="w-4 h-4" />
              <span>Search Loads ({filteredLoads.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Orders Live Tracking Section */}
      {activeOrders.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-orange-600" />
              <span>Live Delivery Tracking</span>
            </h2>
            <span className="text-xs bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full font-semibold">
              {activeOrders.length} Active Shipment
            </span>
          </div>

          {activeOrders.map((ord) => {
            const stepIdx = getStatusStepIndex(ord.status);
            const steps: { status: OrderStatus; label: string }[] = [
              { status: 'BOOKED', label: 'Booking Confirmed' },
              { status: 'MATERIAL_READY', label: 'Material Ready at Quarry' },
              { status: 'VEHICLE_ASSIGNED', label: 'Vehicle Assigned' },
              { status: 'IN_TRANSIT', label: 'In Transit (Kannur ↔ Wayanad Ghat)' },
              { status: 'DELIVERED', label: 'Delivered to Site' },
            ];

            return (
              <div
                key={ord.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                        ORDER #{ord.id}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Live Active
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {ord.quantity} {ord.unit} — {ord.material}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                      <span>Source: {ord.pickupLocation}</span>
                      <span>→</span>
                      <span>Destination: {ord.deliveryLocation}</span>
                    </p>
                  </div>

                  <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6">
                    <span className="text-xs text-slate-500 block">Total Amount</span>
                    <span className="text-xl font-black text-slate-900">
                      ₹{ord.totalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      (Material + Lorry Transport)
                    </span>
                  </div>
                </div>

                {/* Progress Timeline Tracker */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                    <span>Order Progress</span>
                    <span className="text-orange-600 font-bold">
                      {steps[stepIdx]?.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 relative">
                    {steps.map((st, i) => {
                      const isComplete = i <= stepIdx;
                      const isCurrent = i === stepIdx;

                      return (
                        <div key={st.status} className="flex flex-col items-center text-center space-y-1">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isComplete
                                ? 'bg-orange-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-400 border border-slate-200'
                            } ${isCurrent ? 'ring-4 ring-orange-100' : ''}`}
                          >
                            {isComplete ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs leading-tight font-medium ${
                              isCurrent ? 'text-slate-900 font-bold' : isComplete ? 'text-slate-700' : 'text-slate-400'
                            }`}
                          >
                            {st.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Driver & Delivery Information */}
                <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs border border-slate-100">
                  <div>
                    <span className="text-slate-400 block font-medium">Assigned Transporter</span>
                    <span className="font-bold text-slate-800 block text-sm mt-0.5">
                      {ord.driverName || 'Assigning local driver...'}
                    </span>
                    <span className="text-slate-500 block">
                      Vehicle: {ord.vehicleNumber || '10-Wheel Lorry'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Supplier & Quality</span>
                    <span className="font-bold text-slate-800 block text-sm mt-0.5">
                      {ord.supplierName}
                    </span>
                    <span className="text-slate-500 block">{ord.quality}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Delivery Contact</span>
                    <span className="font-bold text-slate-800 block text-sm mt-0.5">
                      {ord.customerName}
                    </span>
                    <span className="text-slate-500 block">{ord.deliveryAddress}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Available Load Listings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Available Material Loads</h2>
            <p className="text-xs text-slate-500">
              Verified quarry stock with pre-negotiated lorry transportation for Kannur ↔ Wayanad
            </p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold">
            {filteredLoads.length} Loads Available
          </span>
        </div>

        {filteredLoads.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-3">
            <Package className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-semibold text-slate-700">No active loads for this search</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Try changing the material filter or check back as suppliers in Kannur post new quarry loads throughout the day.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLoads.map((load) => (
              <div
                key={load.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-orange-50 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-md">
                          {load.material}
                        </span>
                        {load.isVerifiedSupplier && (
                          <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                            <ShieldCheck className="w-3 h-3" /> Verified Quarry
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-2">
                        {load.quantity} {load.unit}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">{load.quality}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-black text-slate-900">
                        ₹{load.totalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400 block">Total per load</span>
                    </div>
                  </div>

                  {/* Location & Driver Details */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block font-medium">Pickup Quarry</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-orange-600" />
                        {load.pickupLocation}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">Destination</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {load.destinationLocation}
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-200/60 col-span-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-slate-700 font-medium">
                          {load.driverName ? load.driverName : 'Verified Local Driver'}
                        </span>
                        {load.driverRating && (
                          <span className="flex items-center gap-0.5 text-amber-600 font-bold text-[11px] bg-amber-50 px-1.5 py-0.2 rounded">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {load.driverRating}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500 font-medium">{load.vehicleType}</span>
                    </div>
                  </div>

                  {/* Itemized Price Breakdown */}
                  <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Material Cost ({load.quantity} {load.unit})</span>
                      <span className="font-medium text-slate-800">₹{load.materialPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lorry Transport ({load.pickupLocation} → {load.destinationLocation})</span>
                      <span className="font-medium text-slate-800">₹{load.transportPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Platform Service Fee (2.5%)</span>
                      <span>₹{load.platformFee.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleBookClick(load)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow"
                  >
                    <span>Book Material Load</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Completed Orders & Ratings Section */}
      {pastOrders.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Completed Orders & Delivery Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastOrders.map((ord) => (
              <div key={ord.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                      ORDER #{ord.id}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base mt-1">
                      {ord.quantity} {ord.unit} — {ord.material}
                    </h4>
                    <p className="text-xs text-slate-500">{ord.supplierName} • {ord.deliveryLocation}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    ✓ Delivered
                  </span>
                </div>

                {ord.feedback ? (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700">Rating given:</span>
                      <span className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {ord.materialRating || 5}/5
                      </span>
                    </div>
                    <p className="text-slate-600 italic">"{ord.feedback}"</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setRatingOrder(ord.id)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span>Rate Driver & Material Quality</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {isBookingOpen && selectedLoad && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Confirm Order Booking</h3>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="bg-orange-50/70 p-4 rounded-xl border border-orange-100 space-y-2 text-xs text-orange-950">
                <div className="flex justify-between font-semibold">
                  <span>Material:</span>
                  <span>{selectedLoad.quantity} {selectedLoad.unit} — {selectedLoad.material}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup Quarry:</span>
                  <span>{selectedLoad.pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selected Corridor:</span>
                  <span className="font-bold">{selectedLoad.pickupLocation} ➔ {selectedDelivery}</span>
                </div>
                <div className="border-t border-orange-200/60 pt-2 flex justify-between text-sm font-black">
                  <span>Total Booking Amount:</span>
                  <span>₹{selectedLoad.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer / Site Manager Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Site Address (Wayanad)
                </label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs shadow"
                >
                  Confirm & Dispatch Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rating & Review Modal */}
      {ratingOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Rate Delivery & Quality</h3>
              <button
                onClick={() => setRatingOrder(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRatingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rate Driver & Delivery Timeliness
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingDriver(star)}
                      className={`p-2 rounded-lg text-sm font-bold ${
                        ratingDriver >= star ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      ★ {star}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rate Stone / Material Cut Quality
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingMaterial(star)}
                      className={`p-2 rounded-lg text-sm font-bold ${
                        ratingMaterial >= star ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      ★ {star}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Comments / Feedback
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention stone strength, handling, breakage, or driver punctuality..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRatingOrder(null)}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs shadow"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
