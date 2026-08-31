export type UserRole = 'CUSTOMER' | 'DRIVER' | 'SUPPLIER' | 'ADMIN';

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

export interface LoadListing {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierPhone: string;
  supplierRating: number;
  isVerifiedSupplier: boolean;
  material: MaterialCategory;
  quality: QualityGrade;
  quantity: number; // e.g. 500
  unit: string; // e.g. "stones"
  pickupLocation: string; // Kannur
  destinationLocation: string; // Wayanad
  materialPrice: number; // ₹ INR
  transportPrice: number; // ₹ INR
  platformFee: number; // ₹ INR
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
  createdAt: string;
  deliveryDate: string;
  customerRating?: number;
  driverRating?: number;
  materialRating?: number;
  feedback?: string;
}

export interface ReturnLoad {
  id: string;
  pickupLocation: string; // Wayanad
  destinationLocation: string; // Kannur
  material: string; // e.g. "Crushed Granite Aggregates"
  quantity: string; // e.g. "12 Tons"
  earnings: number; // ₹ INR
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
