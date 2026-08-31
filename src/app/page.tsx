'use client';

import React from 'react';
import { useLorrio } from '../context/LorrioContext';
import { RoleLandingPage } from '../components/RoleLandingPage';
import { MobileAppShell } from '../components/MobileAppShell';
import { CustomerApp } from '../components/CustomerApp';
import { DriverApp } from '../components/DriverApp';
import { SupplierDashboard } from '../components/SupplierDashboard';
import { AdminOverview } from '../components/AdminOverview';

export default function Home() {
  const { role } = useLorrio();

  if (role === 'LANDING') {
    return <RoleLandingPage />;
  }

  const renderContent = () => {
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
  };

  return <MobileAppShell>{renderContent()}</MobileAppShell>;
}
