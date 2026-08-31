'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  LoadListing,
  Order,
  DriverProfile,
  SupplierProfile,
  ReturnLoad,
  OrderStatus,
  MaterialCategory,
  QualityGrade,
  NotificationItem,
  LocationCoords,
} from '../types/lorrio';
import {
  INITIAL_LOADS,
  INITIAL_ORDERS,
  INITIAL_DRIVER_PROFILE,
  INITIAL_SUPPLIER_PROFILE,
  INITIAL_RETURN_LOADS,
  INITIAL_NOTIFICATIONS,
} from '../lib/mockData';

interface LorrioContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeMobileTab: string;
  setActiveMobileTab: (tab: string) => void;
  loads: LoadListing[];
  orders: Order[];
  notifications: NotificationItem[];
  driverProfile: DriverProfile;
  supplierProfile: SupplierProfile;
  returnLoads: ReturnLoad[];
  activeOrder?: Order;
  unreadNotifCount: number;
  bookLoad: (
    loadId: string,
    customerName: string,
    customerPhone: string,
    deliveryAddress: string,
    deliveryLocation: string,
    deliveryCoords?: LocationCoords
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateDriverEta: (orderId: string, etaText: string) => void;
  createLoadListing: (data: {
    material: MaterialCategory;
    quality: QualityGrade;
    quantity: number;
    unit: string;
    pickupLocation: string;
    destinationLocation: string;
    materialPrice: number;
    transportPrice: number;
    vehicleType: string;
    availableDate: string;
  }) => void;
  toggleDriverOnline: () => void;
  acceptReturnLoad: (returnLoadId: string) => void;
  rateOrder: (
    orderId: string,
    ratings: { customerRating?: number; driverRating?: number; materialRating?: number; feedback?: string }
  ) => void;
  markNotificationRead: (id: string) => void;
  generateWhatsAppUrl: (order: Order) => string;
}

const LorrioContext = createContext<LorrioContextType | undefined>(undefined);

export const LorrioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('LANDING');
  const [activeMobileTab, setActiveMobileTab] = useState<string>('home');
  const [loads, setLoads] = useState<LoadListing[]>(INITIAL_LOADS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [driverProfile, setDriverProfile] = useState<DriverProfile>(INITIAL_DRIVER_PROFILE);
  const [supplierProfile, setSupplierProfile] = useState<SupplierProfile>(INITIAL_SUPPLIER_PROFILE);
  const [returnLoads, setReturnLoads] = useState<ReturnLoad[]>(INITIAL_RETURN_LOADS);

  const activeOrder = orders.find((o) => o.status !== 'DELIVERED') || orders[0];
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const bookLoad = (
    loadId: string,
    customerName: string,
    customerPhone: string,
    deliveryAddress: string,
    deliveryLocation: string,
    deliveryCoords?: LocationCoords
  ): Order => {
    const targetLoad = loads.find((l) => l.id === loadId);
    const orderId = `LR${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      loadId,
      customerName,
      customerPhone,
      deliveryAddress,
      pickupCoords: targetLoad?.pickupCoords || { address: 'Mayyil Quarry, Kannur', lat: 11.9744, lng: 75.4851 },
      deliveryCoords: deliveryCoords || { address: deliveryAddress, lat: 11.6094, lng: 76.0827 },
      material: targetLoad?.material || 'Laterite Stone',
      quality: targetLoad?.quality || 'Premium Cut Finish (High Strength)',
      quantity: targetLoad?.quantity || 500,
      unit: targetLoad?.unit || 'stones',
      pickupLocation: targetLoad?.pickupLocation || 'Mayyil Quarry, Kannur',
      deliveryLocation: deliveryLocation || targetLoad?.destinationLocation || 'Kalpetta, Wayanad',
      materialPrice: targetLoad?.materialPrice || 16500,
      transportPrice: targetLoad?.transportPrice || 6500,
      platformFee: targetLoad?.platformFee || 500,
      totalPrice: targetLoad?.totalPrice || 23500,
      supplierName: targetLoad?.supplierName || 'Mayyil Laterite Quarry',
      driverId: targetLoad?.driverId || driverProfile.id,
      driverName: targetLoad?.driverName || driverProfile.name,
      driverPhone: targetLoad?.driverPhone || driverProfile.phone,
      vehicleNumber: targetLoad?.vehicleNumber || driverProfile.vehicleNumber,
      status: 'BOOKED',
      driverEtaText: '1 hr 45 mins (ETA 04:30 PM)',
      liveDriverLocation: { lat: 11.8200, lng: 75.6100, speedKm: 45 },
      createdAt: 'Just Now',
      deliveryDate: 'Today Afternoon',
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Push notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: `🎉 Order #${orderId} Confirmed`,
      message: `Your booking for ${newOrder.quantity} ${newOrder.unit} of ${newOrder.material} has been confirmed. Driver ${newOrder.driverName} assigned!`,
      timestamp: 'Just now',
      read: false,
      type: 'ORDER',
      forRole: 'CUSTOMER',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setLoads((prev) =>
      prev.map((l) => (l.id === loadId ? { ...l, status: 'BOOKED' } : l))
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: `📦 Order #${orderId} Status Updated`,
      message: `Status changed to: ${status}. Driver is en route via Kannur-Wayanad ghat pass.`,
      timestamp: 'Just now',
      read: false,
      type: 'ORDER',
      forRole: 'CUSTOMER',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updateDriverEta = (orderId: string, etaText: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, driverEtaText: etaText } : o))
    );

    const notif: NotificationItem = {
      id: `NOTIF-ETA-${Date.now()}`,
      title: `⏱️ Driver Updated Delivery ETA`,
      message: `Order #${orderId} new ETA: ${etaText}`,
      timestamp: 'Just now',
      read: false,
      type: 'DRIVER',
      forRole: 'CUSTOMER',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const createLoadListing = (data: {
    material: MaterialCategory;
    quality: QualityGrade;
    quantity: number;
    unit: string;
    pickupLocation: string;
    destinationLocation: string;
    materialPrice: number;
    transportPrice: number;
    vehicleType: string;
    availableDate: string;
  }) => {
    const platformFee = Math.round((data.materialPrice + data.transportPrice) * 0.025);
    const newLoad: LoadListing = {
      id: `LOAD-KN-0${loads.length + 1}`,
      supplierId: supplierProfile.id,
      supplierName: supplierProfile.quarryName,
      supplierPhone: supplierProfile.phone,
      supplierRating: supplierProfile.rating,
      isVerifiedSupplier: supplierProfile.isVerified,
      material: data.material,
      quality: data.quality,
      quantity: data.quantity,
      unit: data.unit,
      pickupLocation: data.pickupLocation,
      pickupCoords: { address: data.pickupLocation, lat: 11.9744, lng: 75.4851 },
      destinationLocation: data.destinationLocation,
      destinationCoords: { address: data.destinationLocation, lat: 11.6094, lng: 76.0827 },
      materialPrice: data.materialPrice,
      transportPrice: data.transportPrice,
      platformFee,
      totalPrice: data.materialPrice + data.transportPrice + platformFee,
      vehicleType: data.vehicleType,
      availableDate: data.availableDate,
      status: 'AVAILABLE',
    };

    setLoads((prev) => [newLoad, ...prev]);
    setSupplierProfile((prev) => ({
      ...prev,
      activeListingsCount: prev.activeListingsCount + 1,
    }));
  };

  const toggleDriverOnline = () => {
    setDriverProfile((prev) => ({
      ...prev,
      isOnline: !prev.isOnline,
    }));
  };

  const acceptReturnLoad = (returnLoadId: string) => {
    const retLoad = returnLoads.find((r) => r.id === returnLoadId);
    if (retLoad) {
      setReturnLoads((prev) =>
        prev.map((r) => (r.id === returnLoadId ? { ...r, status: 'ACCEPTED' } : r))
      );
      setDriverProfile((prev) => ({
        ...prev,
        todayEarnings: prev.todayEarnings + retLoad.earnings,
        completedTrips: prev.completedTrips + 1,
      }));
    }
  };

  const rateOrder = (
    orderId: string,
    ratings: { customerRating?: number; driverRating?: number; materialRating?: number; feedback?: string }
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              customerRating: ratings.customerRating ?? o.customerRating,
              driverRating: ratings.driverRating ?? o.driverRating,
              materialRating: ratings.materialRating ?? o.materialRating,
              feedback: ratings.feedback ?? o.feedback,
            }
          : o
      )
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const generateWhatsAppUrl = (order: Order): string => {
    const text = encodeURIComponent(
      `🪨 *LORRIO ORDER CONFIRMATION #${order.id}*\n\n` +
      `📦 *Material:* ${order.quantity} ${order.unit} - ${order.material}\n` +
      `📍 *Pickup Quarry:* ${order.pickupLocation}\n` +
      `📍 *Delivery Site:* ${order.deliveryAddress}\n` +
      `🚛 *Lorry Driver:* ${order.driverName || 'Assigned Driver'} (${order.vehicleNumber || '10-Wheel Lorry'})\n` +
      `📞 *Driver Phone:* ${order.driverPhone || '+91 94473 88102'}\n` +
      `⏱️ *Delivery ETA:* ${order.driverEtaText || '1 hr 45 mins'}\n` +
      `💰 *Total Amount:* ₹${order.totalPrice.toLocaleString()}\n\n` +
      `🗺️ *Live Order Tracking:* https://lorrio.netlify.app/`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <LorrioContext.Provider
      value={{
        role,
        setRole,
        activeMobileTab,
        setActiveMobileTab,
        loads,
        orders,
        notifications,
        driverProfile,
        supplierProfile,
        returnLoads,
        activeOrder,
        unreadNotifCount,
        bookLoad,
        updateOrderStatus,
        updateDriverEta,
        createLoadListing,
        toggleDriverOnline,
        acceptReturnLoad,
        rateOrder,
        markNotificationRead,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </LorrioContext.Provider>
  );
};

export const useLorrio = () => {
  const context = useContext(LorrioContext);
  if (!context) {
    throw new Error('useLorrio must be used within a LorrioProvider');
  }
  return context;
};
