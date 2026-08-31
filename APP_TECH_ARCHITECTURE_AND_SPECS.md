# 💻 Lorrio App & Technical Architecture Specifications

> **Complete Technical Blueprint**: Stack architecture, component specs, features built, and deployment workflow for the Lorrio mobile-first web app.

---

## 1. Technology Stack Overview

- **Frontend Framework**: Next.js 14 (App Router) with React 18 & TypeScript 5.5+
- **Styling & Design System**: Tailwind CSS with custom Laterite Earth theme palette (`#C85A32`)
- **State Engine**: React Context API (`LorrioContext.tsx`) with real-time multi-role state transitions
- **Deployment Infrastructure**: Netlify Static Export (`out/`) with `netlify.toml` CI/CD pipeline
- **Source Control**: GitHub repository (`https://github.com/alishanea/lorrio.git`)

---

## 2. Built Software Components

1. **Role Landing Page (`RoleLandingPage.tsx`)**: Interactive entry portal presenting 3 role cards: Customer (I Need Material), Driver (I Have A Lorry), and Quarry Supplier (I Own A Quarry).
2. **Mobile App Shell (`MobileAppShell.tsx`)**: Native mobile layout with top location bar, profile badge, and fixed bottom navigation bar (Home, Loads, Orders, Alerts).
3. **Location Picker Map (`LocationPickerMap.tsx`)**: Interactive map pin selection widget with GPS coordinate output (`11.6094° N, 76.0827° E`).
4. **Price & Freight Estimator (`PriceEstimatorWidget.tsx`)**: Real-time quote calculator with quantity slider (200-1,500 stones) and instant cost itemization.
5. **WhatsApp API Integration (`generateWhatsAppUrl`)**: Pre-filled WhatsApp link generator containing order ID, lorry number, driver phone, ETA, total amount, and live tracking link.
6. **Driver ETA Setter (`DriverApp.tsx`)**: Modal allowing lorry drivers to update arrival ETAs in real time.
7. **Notification Center (`NotificationCenter.tsx`)**: Real-time alert feed for customers and drivers.
8. **Live GPS Tracking Map (`LiveGpsTrackerMap.tsx`)**: Interactive map simulation animating lorry movement along Kannur-Wayanad ghat pass.

---

## 3. Live Production URL
👉 **[https://lorrio.netlify.app/](https://lorrio.netlify.app/)**
