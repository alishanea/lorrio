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
} from '../types/lorrio';
import {
  INITIAL_LOADS,
  INITIAL_ORDERS,
  INITIAL_DRIVER_PROFILE,
  INITIAL_SUPPLIER_PROFILE,
  INITIAL_RETURN_LOADS,
} from '../lib/mockData';

interface LorrioContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  loads: LoadListing[];
  orders: Order[];
  driverProfile: DriverProfile;
  supplierProfile: SupplierProfile;
  returnLoads: ReturnLoad[];
  bookLoad: (
    loadId: string,
    customerName: string,
    customerPhone: string,
    deliveryAddress: string,
    deliveryLocation: string
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
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
  activeOrder?: Order;
}

const LorrioContext = createContext<LorrioContextType | undefined>(undefined);

export const LorrioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('CUSTOMER');
  const [loads, setLoads] = useState<LoadListing[]>(INITIAL_LOADS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [driverProfile, setDriverProfile] = useState<DriverProfile>(INITIAL_DRIVER_PROFILE);
  const [supplierProfile, setSupplierProfile] = useState<SupplierProfile>(INITIAL_SUPPLIER_PROFILE);
  const [returnLoads, setReturnLoads] = useState<ReturnLoad[]>(INITIAL_RETURN_LOADS);

  const activeOrder = orders.find((o) => o.status !== 'DELIVERED') || orders[0];

  const bookLoad = (
    loadId: string,
    customerName: string,
    customerPhone: string,
    deliveryAddress: string,
    deliveryLocation: string
  ): Order => {
    const targetLoad = loads.find((l) => l.id === loadId);
    const orderId = `LR${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      loadId,
      customerName,
      customerPhone,
      deliveryAddress,
      material: targetLoad?.material || 'Laterite Stone',
      quality: targetLoad?.quality || 'Premium Cut Finish (High Strength)',
      quantity: targetLoad?.quantity || 500,
      unit: targetLoad?.unit || 'stones',
      pickupLocation: targetLoad?.pickupLocation || 'Mayyil, Kannur',
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
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      deliveryDate: 'Tomorrow Morning',
    };

    setOrders((prev) => [newOrder, ...prev]);

    setLoads((prev) =>
      prev.map((l) => (l.id === loadId ? { ...l, status: 'BOOKED' } : l))
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
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
      destinationLocation: data.destinationLocation,
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

  return (
    <LorrioContext.Provider
      value={{
        role,
        setRole,
        loads,
        orders,
        driverProfile,
        supplierProfile,
        returnLoads,
        bookLoad,
        updateOrderStatus,
        createLoadListing,
        toggleDriverOnline,
        acceptReturnLoad,
        rateOrder,
        activeOrder,
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
