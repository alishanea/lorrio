'use client';

import React from 'react';
import { useLorrio } from '../context/LorrioContext';
import { CustomerApp } from '../components/CustomerApp';
import { DriverApp } from '../components/DriverApp';
import { SupplierDashboard } from '../components/SupplierDashboard';
import { AdminOverview } from '../components/AdminOverview';

export default function Home() {
  const { role } = useLorrio();

  switch (role) {
    case 'CUSTOMER':
      return <CustomerApp />;
    case 'DRIVER':
      return <DriverApp />;
    case 'SUPPLIER':
      return <SupplierDashboard />;
    case 'ADMIN':
      return <AdminOverview />;
    default:
      return <CustomerApp />;
  }
}
