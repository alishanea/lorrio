import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        if self._pageNumber > 1:
            self.drawString(54, 11 * 72 - 36, "LORRIO — Strategic Partner Proposal & Specifications")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(54, 11 * 72 - 42, 8.5 * 72 - 54, 11 * 72 - 42)

        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * 72 - 54, 36, footer_text)
        self.drawString(54, 36, "CONFIDENTIAL — LORRIO STRATEGIC PITCH & TECHNICAL BLUEPRINT")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(54, 48, 8.5 * 72 - 54, 48)
        
        self.restoreState()

def create_partner_pdf(filename):
    doc = SimpleDocTemplate(filename, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()

    PRIMARY = colors.HexColor("#C85A32")
    DARK_BG = colors.HexColor("#0F172A")
    TEXT_DARK = colors.HexColor("#1E293B")
    TEXT_MUTED = colors.HexColor("#64748B")
    ACCENT_GREEN = colors.HexColor("#10B981")
    BG_LIGHT = colors.HexColor("#F8FAFC")

    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=PRIMARY, spaceAfter=6)
    subtitle_style = ParagraphStyle('DocSubTitle', parent=styles['Normal'], fontName='Helvetica', fontSize=11, leading=15, textColor=TEXT_MUTED, spaceAfter=12)
    h1_style = ParagraphStyle('H1', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=DARK_BG, spaceBefore=12, spaceAfter=6, keepWithNext=True)
    body_style = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=9.5, leading=14, textColor=TEXT_DARK, spaceAfter=6)
    bullet_style = ParagraphStyle('Bullet', parent=body_style, leftIndent=15, spaceAfter=4)

    story = []

    story.append(Paragraph("LORRIO — STRATEGIC PARTNERSHIP PROPOSAL", title_style))
    story.append(Paragraph("Exclusive Partnership Proposal for Quarry & Fleet Owners (16 Lorry Operations)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceBefore=0, spaceAfter=12))

    meta_data = [
        [Paragraph("<b>Prepared For:</b> Strategic Quarry & Fleet Owner", body_style), Paragraph("<b>Fleet Scale:</b> 16 Lorries + Laterite Quarry", body_style)],
        [Paragraph("<b>Primary Corridor:</b> Kannur ↔ Wayanad", body_style), Paragraph("<b>Value Prop:</b> Zero Empty Miles & Direct Quarry Sales", body_style)]
    ]
    meta_table = Table(meta_data, colWidths=[250, 254])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FEF3C7")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#FDE68A")),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("1. Executive Summary & Partnership Value", h1_style))
    story.append(Paragraph(
        "As an owner of a major Laterite Quarry in Kannur and a fleet of 16 lorries, your operation is the exact supply-side powerhouse that **Lorrio** is designed to empower.",
        body_style
    ))
    story.append(Paragraph(
        "Lorrio is a digital construction-material logistics platform. By partnering with Lorrio as our founding flagship partner, we instantly transform your fleet and quarry operations into a high-tech, high-profit enterprise.",
        body_style
    ))

    story.append(Paragraph("2. Financial Benefits For Your 16 Lorry Fleet", h1_style))
    story.append(Paragraph("• <b>Eliminate Empty Return Miles:</b> Currently, when your lorries transport laterite up to Wayanad, they often return back down the ghat pass completely empty. Lorrio's <b>Smart Return-Load Optimizer</b> automatically matches Wayanad ➔ Kannur return loads (crushed granite aggregates, timber, sand), generating an extra <b>₹5,000 to ₹6,000 profit per lorry trip</b>.", bullet_style))
    story.append(Paragraph("• <b>Fleet Revenue Multiplication:</b> Across 16 lorries running 20 trips per month, eliminating empty return trips adds <b>₹16,00,000+ extra monthly profit</b> to your fleet!", bullet_style))
    story.append(Paragraph("• <b>Live Fleet Telemetry & Driver Control:</b> Monitor all 16 lorries on an interactive map with real-time GPS tracking, speed indicators, and driver delivery ETAs.", bullet_style))

    story.append(Paragraph("3. Benefits For Your Quarry Operation", h1_style))
    story.append(Paragraph("• <b>Direct Customer Sales Channel:</b> Sell laterite stone directly to contractors and builders in Wayanad without paying middleman broker markups.", bullet_style))
    story.append(Paragraph("• <b>Priority Listing Status:</b> As a launch partner, your quarry gets <b>Verified Flagship Status</b> at the top of Lorrio customer search results.", bullet_style))
    story.append(Paragraph("• <b>Instant WhatsApp Order Sharing:</b> Automated WhatsApp dispatch receipts sent to customers with lorry details, driver contact, ETA, and live tracking links.", bullet_style))

    story.append(Spacer(1, 10))

    story.append(Paragraph("4. Fleet Payout & Economics Summary", h1_style))

    fleet_econ = [
        [Paragraph("<b>Metric</b>", body_style), Paragraph("<b>Without Lorrio</b>", body_style), Paragraph("<b>With Lorrio Platform</b>", body_style)],
        [Paragraph("<b>Fleet Size</b>", body_style), Paragraph("16 Lorries", body_style), Paragraph("16 Lorries (Fully Utilized)", body_style)],
        [Paragraph("<b>Return Trip Utilization</b>", body_style), Paragraph("0% (Empty Ghat Backhaul)", body_style), Paragraph("<b>100% Matched Return Loads</b>", body_style)],
        [Paragraph("<b>Extra Profit / Trip</b>", body_style), Paragraph("₹0", body_style), Paragraph("<b>+₹5,400 per trip</b>", body_style)],
        [Paragraph("<b>Monthly Fleet Gain</b>", body_style), Paragraph("Baseline Freight", body_style), Paragraph("<b>+₹16,00,000 / Month Net Gain</b>", body_style)]
    ]
    fe_table = Table(fleet_econ, colWidths=[120, 180, 204])
    fe_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_BG),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(fe_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Partner Proposal PDF created at: {filename}")

def create_tech_pdf(filename):
    doc = SimpleDocTemplate(filename, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()

    PRIMARY = colors.HexColor("#C85A32")
    DARK_BG = colors.HexColor("#0F172A")
    TEXT_DARK = colors.HexColor("#1E293B")
    TEXT_MUTED = colors.HexColor("#64748B")

    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=PRIMARY, spaceAfter=6)
    subtitle_style = ParagraphStyle('DocSubTitle', parent=styles['Normal'], fontName='Helvetica', fontSize=11, leading=15, textColor=TEXT_MUTED, spaceAfter=12)
    h1_style = ParagraphStyle('H1', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=DARK_BG, spaceBefore=12, spaceAfter=6, keepWithNext=True)
    body_style = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=9.5, leading=14, textColor=TEXT_DARK, spaceAfter=6)
    bullet_style = ParagraphStyle('Bullet', parent=body_style, leftIndent=15, spaceAfter=4)

    story = []

    story.append(Paragraph("LORRIO — APP & TECHNICAL ARCHITECTURE SPECS", title_style))
    story.append(Paragraph("Full Technical Specifications, Component Architecture & Deployment Details", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceBefore=0, spaceAfter=12))

    story.append(Paragraph("1. Technology Stack Overview", h1_style))
    story.append(Paragraph("• <b>Frontend Framework:</b> Next.js 14 (App Router) with React 18 & TypeScript 5.5+", bullet_style))
    story.append(Paragraph("• <b>Styling & Design System:</b> Tailwind CSS with custom Laterite Earth theme palette", bullet_style))
    story.append(Paragraph("• <b>State Engine:</b> React Context API (`LorrioContext.tsx`) with real-time multi-role state transitions", bullet_style))
    story.append(Paragraph("• <b>Deployment Infrastructure:</b> Netlify Static Export (`out/`) with `netlify.toml` CI/CD pipeline", bullet_style))
    story.append(Paragraph("• <b>Source Control:</b> GitHub repository (`alishanea/lorrio`)", bullet_style))

    story.append(Paragraph("2. Built Software Components", h1_style))
    story.append(Paragraph("<b>1. Role Landing Page (`RoleLandingPage.tsx`):</b> Interactive entry portal presenting 3 role cards: Customer (I Need Material), Driver (I Have A Lorry), and Quarry Supplier (I Own A Quarry).", bullet_style))
    story.append(Paragraph("<b>2. Mobile App Shell (`MobileAppShell.tsx`):</b> Native mobile layout with top location bar, profile badge, and fixed bottom navigation bar (Home, Loads, Orders, Alerts).", bullet_style))
    story.append(Paragraph("<b>3. Location Picker Map (`LocationPickerMap.tsx`):</b> Interactive map pin selection widget with GPS coordinate output (`11.6094° N, 76.0827° E`).", bullet_style))
    story.append(Paragraph("<b>4. Price & Freight Estimator (`PriceEstimatorWidget.tsx`):</b> Real-time quote calculator with quantity slider (200-1,500 stones) and instant cost itemization.", bullet_style))
    story.append(Paragraph("<b>5. WhatsApp API Integration (`generateWhatsAppUrl`):</b> Pre-filled WhatsApp link generator containing order ID, lorry number, driver phone, ETA, total amount, and live tracking link.", bullet_style))
    story.append(Paragraph("<b>6. Driver ETA Setter (`DriverApp.tsx`):</b> Modal allowing lorry drivers to update arrival ETAs in real time.", bullet_style))
    story.append(Paragraph("<b>7. Notification Center (`NotificationCenter.tsx`):</b> Real-time alert feed for customers and drivers.", bullet_style))
    story.append(Paragraph("<b>8. Live GPS Tracking Map (`LiveGpsTrackerMap.tsx`):</b> Interactive map simulation animating lorry movement along Kannur-Wayanad ghat pass.", bullet_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Tech Architecture PDF created at: {filename}")

def create_vision_pdf(filename):
    doc = SimpleDocTemplate(filename, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()

    PRIMARY = colors.HexColor("#C85A32")
    DARK_BG = colors.HexColor("#0F172A")
    TEXT_DARK = colors.HexColor("#1E293B")
    TEXT_MUTED = colors.HexColor("#64748B")

    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=PRIMARY, spaceAfter=6)
    subtitle_style = ParagraphStyle('DocSubTitle', parent=styles['Normal'], fontName='Helvetica', fontSize=11, leading=15, textColor=TEXT_MUTED, spaceAfter=12)
    h1_style = ParagraphStyle('H1', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=DARK_BG, spaceBefore=12, spaceAfter=6, keepWithNext=True)
    body_style = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=9.5, leading=14, textColor=TEXT_DARK, spaceAfter=6)
    bullet_style = ParagraphStyle('Bullet', parent=body_style, leftIndent=15, spaceAfter=4)

    story = []

    story.append(Paragraph("LORRIO — BUSINESS VISION, AIM & ROADMAP", title_style))
    story.append(Paragraph("Market Strategy, Expansion Roadmap, Monetization & Long-Term Aim", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceBefore=0, spaceAfter=12))

    story.append(Paragraph("1. Our Aim & Mission", h1_style))
    story.append(Paragraph(
        "<b>Our Aim:</b> To build the digital infrastructure connecting construction materials with the people and vehicles that move them across India.",
        body_style
    ))
    story.append(Paragraph(
        "Lorrio starts by hyper-focusing on the **Kannur ↔ Wayanad Laterite Stone Corridor**, proving the model locally before expanding across Kerala and South India.",
        body_style
    ))

    story.append(Paragraph("2. 4-Phase Growth Roadmap", h1_style))
    story.append(Paragraph("• <b>Phase 1 (Current Active MVP):</b> Kannur ↔ Wayanad Laterite Stone Corridor. Mobile-first app, location picker map, WhatsApp integration, and Return-Load Optimizer.", bullet_style))
    story.append(Paragraph("• <b>Phase 2 (Regional Kerala Expansion):</b> Kozhikode, Malappuram, and Kasaragod districts; onboarding M-sand, plastering sand, 20mm granite aggregates, and red wire-cut bricks.", bullet_style))
    story.append(Paragraph("• <b>Phase 3 (Platform Automation):</b> WhatsApp bot ordering interface, dynamic pricing algorithms, automated GST e-way bill generation, and driver GPS telemetry.", bullet_style))
    story.append(Paragraph("• <b>Phase 4 (Enterprise Procurement Hub):</b> Pan-South India construction procurement software, bulk enterprise contracts, and fleet management SaaS.", bullet_style))

    story.append(Paragraph("3. Revenue & Business Model", h1_style))
    story.append(Paragraph("1. <b>Platform Service Fee:</b> 2.5% fee on every completed transaction.", bullet_style))
    story.append(Paragraph("2. <b>Freight Transport Take-Rate:</b> Cut from matched lorry transport freight.", bullet_style))
    story.append(Paragraph("3. <b>Supplier SaaS Subscriptions:</b> Premium quarry badges, lead generation, and sales analytics.", bullet_style))
    story.append(Paragraph("4. <b>Driver Pro Tier:</b> Priority access to lucrative return loads and earnings optimization tools.", bullet_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Vision PDF created at: {filename}")

if __name__ == "__main__":
    base_path = r"c:\Users\ALISHAN\Downloads\SideCFO\lorrio"
    create_partner_pdf(os.path.join(base_path, "PARTNER_PROPOSAL_QUARRY_FLEET_OWNER.pdf"))
    create_tech_pdf(os.path.join(base_path, "APP_TECH_ARCHITECTURE_AND_SPECS.pdf"))
    create_vision_pdf(os.path.join(base_path, "BUSINESS_VISION_AND_ROADMAP.pdf"))
