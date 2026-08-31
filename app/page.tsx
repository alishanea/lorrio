'use client';

import React from 'react';
import { useLorrio } from '../src/context/LorrioContext';
import { RoleLandingPage } from '../src/components/RoleLandingPage';
import { MobileAppShell } from '../src/components/MobileAppShell';
import { CustomerApp } from '../src/components/CustomerApp';
import { DriverApp } from '../src/components/DriverApp';
import { SupplierDashboard } from '../src/components/SupplierDashboard';
import { AdminOverview } from '../src/components/AdminOverview';

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
