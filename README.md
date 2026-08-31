# 🪨 Lorrio — Construction-Material Logistics Marketplace

> **The digital marketplace connecting construction material demand, quarry suppliers, and lorry transportation.**  
> Starting with the **Kannur ↔ Wayanad** laterite stone corridor.

---

## 📌 Executive Summary

**Lorrio** is a specialized construction-material logistics platform. It solves a fragmented offline problem: how to easily source heavy construction materials (starting with **Laterite Stone**), calculate transparent prices, match verified lorry haulers, and track delivery live from quarry to construction site.

Rather than being generic "Uber for trucks", Lorrio manages the complete transaction lifecycle:
$$\text{Transaction} = \text{Material} + \text{Quantity} + \text{Source Quarry} + \text{Price} + \text{Vehicle} + \text{Route} + \text{Delivery}$$

---

## 🚀 Key MVP Features (Phase 1)

Lorrio MVP features a live, interactive **Multi-Role Web Application**:

### 1. 🛒 Customer App
- **Material & Route Search**: Filter laterite stone (e.g. 500 blocks / 10-wheel load) from Kannur quarries to Wayanad delivery sites.
- **Itemized Pricing**: Transparent breakdown showing Material Cost, Lorry Transport Fee, and Platform Service Fee.
- **Live 5-Step Progress Timeline**: Real-time tracking from `BOOKED` ➔ `MATERIAL_READY` ➔ `VEHICLE_ASSIGNED` ➔ `IN_TRANSIT` ➔ `DELIVERED`.
- **Review & Rating**: Post-delivery feedback for drivers and stone cut quality.

### 2. 🚛 Driver App & Return-Load Optimizer
- **Availability Toggle**: 🟢 Available for Loads / 🔴 Offline.
- **Trip Status Controller**: Step-by-step dispatch status updates for active trips.
- **Smart Return-Load Optimizer**: Identifies return loads (e.g. Wayanad ➔ Kannur crushed aggregates) after drop-off to eliminate empty return miles and increase driver profits.

### 3. 🏭 Supplier / Quarry Dashboard
- **Quarry Stock Management**: Profile management for verified quarries in Kannur (Mayyil, Sreekandapuram, Anthoor).
- **Load Publisher**: Post new stone listings with cut quality, quantity, price, and vehicle specifications.
- **Sales Analytics**: Revenue metrics, order queues, and dispatch tracking.

### 4. 📊 Platform Admin & Governance
- **Corridor Volume KPIs**: Total GMV moved, stone volume transported, and platform fee collections.
- **Trust & Verification Network**: Verification management for lorry drivers (RC/Permits) and quarry sources (Mining Permits).

---

## 🗺️ Product Roadmap & Future Strategy

```
Phase 1 (Current MVP)       Phase 2                     Phase 3                     Phase 4
┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
│ Kannur ↔ Wayanad   │ ➔ │ Kozhikode,          │ ➔ │ WhatsApp Bot,       │ ➔ │ Pan-South India     │
│ Laterite Stone      │   │ Malappuram &        │   │ Dynamic Pricing,    │   │ Procurement Hub,    │
│ Multi-role Web App  │   │ M-Sand / Aggregates │   │ Route Optimization  │   │ Fleet Software      │
└─────────────────────┘   └─────────────────────┘   └─────────────────────┘   └─────────────────────┘
```

- **Phase 1 (Validation MVP)**: Kannur ↔ Wayanad Laterite stone transaction execution.
- **Phase 2 (Material & Geographic Scale)**: Expand to M-Sand, Plastering Sand, Aggregates, Red Bricks across Kozhikode, Malappuram, Kasaragod.
- **Phase 3 (Automation)**: WhatsApp ordering interface, dynamic pricing algorithms, digital invoices, and automated route optimization.
- **Phase 4 (Enterprise Procurement)**: Enterprise software for large construction companies, multi-project expense management, and fleet telemetry.

---

## 💰 Business & Monetization Model

1. **Transaction Platform Fee**: 2.5% service fee per completed order.
2. **Lorry Transport Freight Commission**: Percentage take rate on lorry freight matching.
3. **Supplier Subscriptions**: Premium listings, analytics dashboards, and priority visibility for top quarries.
4. **Driver Pro Tier**: Priority access to high-margin return loads and earnings optimization tools.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js v18+ 
- npm v9+

### Installation & Execution
```bash
# Clone repository
git clone https://github.com/alishanea/lorrio.git
cd lorrio

# Install dependencies
npm install

# Start development server
npm run dev
# (Or using cmd on Windows: cmd /c npm run dev)
```

Open [http://localhost:3000](http://localhost:3000) in your browser to test the app.

---

## 📄 Project Documentation

For full detailed documentation, market framing, competitor analysis, and architectural specs, see [`LORRIO_PROJECT_DOCUMENTATION.md`](file:///c:/Users/ALISHAN/Downloads/SideCFO/lorrio/LORRIO_PROJECT_DOCUMENTATION.md).
