export type UserRole = 'LANDING' | 'CUSTOMER' | 'DRIVER' | 'SUPPLIER' | 'ADMIN';

export type MaterialCategory =
  | 'Laterite Stone'
  | 'M-Sand'
  | 'Plastering Sand'
  | 'Granite Aggregates (20mm)'
  | 'Red Wire-Cut Bricks';

export type QualityGrade =
  | 'Premium Cut Finish (High Strength)'
  | 'Standard Machine Cut (Building Grade)'
  | 'Quarry Direct Standard';

export type OrderStatus =
  | 'BOOKED'
  | 'MATERIAL_READY'
  | 'VEHICLE_ASSIGNED'
  | 'IN_TRANSIT'
  | 'DELIVERED';

export interface LocationCoords {
  address: string;
  lat: number;
  lng: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'ORDER' | 'DRIVER' | 'SYSTEM';
  forRole: 'CUSTOMER' | 'DRIVER' | 'SUPPLIER' | 'ALL';
}

export interface LoadListing {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierPhone: string;
  supplierRating: number;
  isVerifiedSupplier: boolean;
  material: MaterialCategory;
  quality: QualityGrade;
  quantity: number;
  unit: string;
  pickupLocation: string;
  pickupCoords: LocationCoords;
  destinationLocation: string;
  destinationCoords: LocationCoords;
  materialPrice: number;
  transportPrice: number;
  platformFee: number;
  totalPrice: number;
  vehicleType: string;
  availableDate: string;
  status: 'AVAILABLE' | 'BOOKED' | 'DISPATCHED' | 'DELIVERED';
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverRating?: number;
  vehicleNumber?: string;
  isVerifiedDriver?: boolean;
}

export interface Order {
  id: string;
  loadId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  pickupCoords: LocationCoords;
  deliveryCoords: LocationCoords;
  material: MaterialCategory;
  quality: QualityGrade;
  quantity: number;
  unit: string;
  pickupLocation: string;
  deliveryLocation: string;
  materialPrice: number;
  transportPrice: number;
  platformFee: number;
  totalPrice: number;
  supplierName: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  status: OrderStatus;
  driverEtaText?: string; // e.g. "1 hr 45 mins (ETA 04:30 PM)"
  liveDriverLocation?: { lat: number; lng: number; speedKm: number };
  createdAt: string;
  deliveryDate: string;
  customerRating?: number;
  driverRating?: number;
  materialRating?: number;
  feedback?: string;
}

export interface ReturnLoad {
  id: string;
  pickupLocation: string;
  destinationLocation: string;
  material: string;
  quantity: string;
  earnings: number;
  distanceKm: number;
  status: 'AVAILABLE' | 'ACCEPTED';
}

export interface DriverProfile {
  id: string;
  name: string;
  phone: string;
  vehicleNumber: string;
  vehicleType: string;
  rating: number;
  completedTrips: number;
  isVerified: boolean;
  isOnline: boolean;
  todayEarnings: number;
  currentLocation: string;
}

export interface SupplierProfile {
  id: string;
  quarryName: string;
  ownerName: string;
  phone: string;
  location: string;
  rating: number;
  isVerified: boolean;
  activeListingsCount: number;
  totalSalesCount: number;
  revenueTotal: number;
}
