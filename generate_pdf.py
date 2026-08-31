import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
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
        
        # Header (pages 2+)
        if self._pageNumber > 1:
            self.drawString(54, 11 * 72 - 36, "LORRIO — Master Project Brief & Blueprint")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(54, 11 * 72 - 42, 8.5 * 72 - 54, 11 * 72 - 42)

        # Footer
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * 72 - 54, 36, footer_text)
        self.drawString(54, 36, "CONFIDENTIAL — LORRIO CONSTRUCTION LOGISTICS MARKETPLACE")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(54, 48, 8.5 * 72 - 54, 48)
        
        self.restoreState()

def create_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom palette
    PRIMARY = colors.HexColor("#C85A32")     # Laterite Rust
    DARK_BG = colors.HexColor("#0F172A")     # Slate 900
    TEXT_DARK = colors.HexColor("#1E293B")   # Slate 800
    TEXT_MUTED = colors.HexColor("#64748B")  # Slate 500
    ACCENT_GREEN = colors.HexColor("#10B981")# Emerald 500
    BG_LIGHT = colors.HexColor("#F8FAFC")    # Slate 50

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=30,
        textColor=PRIMARY,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=TEXT_MUTED,
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=DARK_BG,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=PRIMARY,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=TEXT_DARK,
        spaceAfter=8
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=body_style,
        leftIndent=15,
        spaceAfter=4
    )

    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#7C2D12"),
        spaceBefore=4,
        spaceAfter=4
    )

    story = []

    # Title Banner
    story.append(Paragraph("LORRIO — MASTER PROJECT BRIEF", title_style))
    story.append(Paragraph("From Concept to Deployed WebApp: Complete Vision, MVP Implementation & Strategic Roadmap", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceBefore=0, spaceAfter=15))

    # Meta Table Banner
    meta_data = [
        [
            Paragraph("<b>Founder & Concept:</b> Alishan E A", body_style),
            Paragraph("<b>Target Corridor:</b> Kannur ↔ Wayanad", body_style)
        ],
        [
            Paragraph("<b>Initial Material:</b> Laterite Stone", body_style),
            Paragraph("<b>Current Status:</b> Phase 1 WebApp Deployed", body_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[250, 254])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FEF3C7")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#FDE68A")),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 15))

    # 1. WHAT IS LORRIO
    story.append(Paragraph("1. What is Lorrio? (The Core Idea)", h1_style))
    story.append(Paragraph(
        "<b>Lorrio</b> is a specialized construction-material logistics marketplace. It bridges the gap between people who need heavy building materials, quarry material suppliers, and independent lorry transporters.",
        body_style
    ))
    story.append(Paragraph(
        "Lorrio is not simply <i>'an Uber for trucks'</i>. Generic trucking apps treat drivers as delivery couriers for any cargo. Lorrio is built around the complete construction material transaction lifecycle:",
        body_style
    ))

    # Formula callout
    formula_text = Paragraph(
        "<b>Lorrio Transaction Lifecycle =</b> Material + Quantity + Cut Quality + Source Quarry + Lorry Freight + Route + Site Delivery",
        callout_style
    )
    f_table = Table([[formula_text]], colWidths=[504])
    f_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFEDD5")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#FDBA74")),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(f_table)
    story.append(Spacer(1, 10))

    # 2. THE PROBLEM WE ARE SOLVING
    story.append(Paragraph("2. The Problem We Are Solving (Current Offline Friction)", h1_style))
    story.append(Paragraph(
        "Construction logistics in Kerala relies almost entirely on fragmented offline networks: phone calls, WhatsApp groups, local brokers, and direct driver contacts. This creates major inefficiencies for all parties:",
        body_style
    ))

    story.append(Paragraph("• <b>Customer Uncertainty:</b> Buyers in Wayanad needing 500 laterite stones must make multiple calls to figure out which quarry in Kannur has stock, what quality is available, how much freight will cost, and when delivery will occur.", bullet_style))
    story.append(Paragraph("• <b>Unverified Quality & Hidden Cuts:</b> Lack of standardized stone quality grading and hidden middleman margins.", bullet_style))
    story.append(Paragraph("• <b>Empty Return Trips (Driver Loss):</b> Lorry drivers hauling laterite from Kannur up to Wayanad often return back down the ghat pass completely empty, wasting fuel and losing profit.", bullet_style))
    story.append(Paragraph("• <b>Quarry Inventory Stagnation:</b> Suppliers lack digital visibility to showcase real-time stock to distant buyers.", bullet_style))

    story.append(Spacer(1, 10))

    # 3. OUR AIM & WHAT WE ARE GOING TO DO
    story.append(Paragraph("3. Our Aim & Strategic Plan", h1_style))
    story.append(Paragraph(
        "<b>Our Ultimate Aim:</b> To build the digital infrastructure connecting construction materials with the people and vehicles that move them across India.",
        body_style
    ))
    story.append(Paragraph(
        "<b>Our Method — Start Narrow, Win Locally:</b> Rather than launching nationwide on Day 1, Lorrio begins by dominating one hyper-local, high-volume corridor:",
        body_style
    ))
    story.append(Paragraph("<b>1. Starting Geography:</b> Kannur ↔ Wayanad corridor.", bullet_style))
    story.append(Paragraph("<b>2. Starting Material:</b> Laterite Stone (standard 500-piece load / 10-wheel lorry).", bullet_style))
    story.append(Paragraph("<b>3. Core Transaction:</b> Seamless matching of quarry material + lorry haulage + delivery tracking.", bullet_style))

    story.append(Spacer(1, 10))

    # 4. THE CHANGE LORRIO BRINGS
    story.append(Paragraph("4. The Fundamental Product Transformation", h1_style))
    
    workflow_data = [
        [Paragraph("<b>Traditional Offline Workflow</b>", ParagraphStyle('W1', parent=body_style, fontName='Helvetica-Bold', textColor=colors.red)),
         Paragraph("<b>Lorrio Platform Workflow</b>", ParagraphStyle('W2', parent=body_style, fontName='Helvetica-Bold', textColor=ACCENT_GREEN))],
        [
            Paragraph("Customer ➔ 5 Phone Calls ➔ Find Material ➔ Find Driver ➔ Bargain Freight ➔ Coordinate Pickup ➔ Blind Wait", body_style),
            Paragraph("Customer ➔ Search Material ➔ Compare Loads ➔ Transparent Price Breakdown ➔ Book ➔ Live 5-Step Tracker ➔ Rate", body_style)
        ]
    ]
    wf_table = Table(workflow_data, colWidths=[246, 258])
    wf_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), colors.HexColor("#FEE2E2")),
        ('BACKGROUND', (1,0), (1,0), colors.HexColor("#D1FAE5")),
        ('BACKGROUND', (0,1), (-1,-1), BG_LIGHT),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(wf_table)

    story.append(Spacer(1, 15))

    # 5. WHAT HAS BEEN BUILT TILL NOW (PHASE 1 WEBAPP)
    story.append(Paragraph("5. What Has Been Built Till Now (Phase 1 WebApp MVP)", h1_style))
    story.append(Paragraph(
        "We have designed, built, and deployed the complete **Lorrio Phase 1 MVP Web Application** using Next.js 14, React 18, TypeScript, and Tailwind CSS. The app features an interactive **Multi-Role Switcher** allowing instant live testing across all four marketplace perspectives:",
        body_style
    ))

    # Roles Table
    roles_data = [
        [Paragraph("<b>Role View</b>", body_style), Paragraph("<b>Key Features Built & Tested</b>", body_style)],
        [
            Paragraph("<b>🛒 Customer App</b>", body_style),
            Paragraph("Material & corridor search (Kannur ➔ Wayanad), load comparison cards, itemized price breakdown (Material + Lorry Transport + 2.5% Platform Fee), order booking modal, live 5-step timeline tracking (Booked ➔ Material Ready ➔ Vehicle Assigned ➔ In Transit ➔ Delivered), and post-delivery review form.", body_style)
        ],
        [
            Paragraph("<b>🚛 Driver App</b>", body_style),
            Paragraph("Availability status toggle (🟢 Available / 🔴 Offline), trip status advancement controller, today's earnings counter, and the <b>Smart Return-Load Optimizer</b> (surfacing Wayanad ➔ Kannur return loads like crushed granite aggregates to eliminate empty backhauls).", body_style)
        ],
        [
            Paragraph("<b>🏭 Supplier Dashboard</b>", body_style),
            Paragraph("Verified Quarry Profile (Mayyil Laterite Works), active load publisher modal (material category, cut quality, quantity, price, vehicle type), inventory listings, and sales revenue dashboard.", body_style)
        ],
        [
            Paragraph("<b>📊 Admin Overview</b>", body_style),
            Paragraph("Corridor volume KPIs (Total GMV moved, stones transported, platform fees collected), driver/quarry trust verification network management, and expansion strategy roadmap.", body_style)
        ]
    ]
    r_table = Table(roles_data, colWidths=[130, 374])
    r_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_BG),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    for i in range(1, len(roles_data)):
        if i % 2 == 0:
            r_table.setStyle(TableStyle([('BACKGROUND', (0, i), (-1, i), BG_LIGHT)]))
    story.append(r_table)

    story.append(Spacer(1, 15))

    # 6. FUTURE ROADMAP
    story.append(Paragraph("6. Future Roadmap & Growth Phases", h1_style))

    roadmap_data = [
        [Paragraph("<b>Phase</b>", body_style), Paragraph("<b>Target Focus</b>", body_style), Paragraph("<b>Key Milestones</b>", body_style)],
        [
            Paragraph("<b>Phase 1 (Active)</b>", body_style),
            Paragraph("Kannur ↔ Wayanad", body_style),
            Paragraph("Laterite Stone MVP web app, multi-role state engine, Return-Load Optimizer.", body_style)
        ],
        [
            Paragraph("<b>Phase 2</b>", body_style),
            Paragraph("Regional Expansion", body_style),
            Paragraph("Kozhikode, Malappuram & Kasaragod districts; adding M-sand, plastering sand, 20mm aggregates, red bricks.", body_style)
        ],
        [
            Paragraph("<b>Phase 3</b>", body_style),
            Paragraph("Automation", body_style),
            Paragraph("WhatsApp ordering interface, dynamic pricing algorithms, automated e-way bills, driver GPS telemetry.", body_style)
        ],
        [
            Paragraph("<b>Phase 4</b>", body_style),
            Paragraph("Enterprise Platform", body_style),
            Paragraph("Pan-South India procurement hub, enterprise SaaS for construction companies, multi-project expense management.", body_style)
        ]
    ]
    rm_table = Table(roadmap_data, colWidths=[100, 130, 274])
    rm_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(rm_table)

    story.append(Spacer(1, 15))

    # 7. BUSINESS & MONETIZATION MODEL
    story.append(Paragraph("7. Monetization & Business Model", h1_style))
    story.append(Paragraph("1. <b>Platform Service Fee:</b> 2.5% service fee on every completed transaction.", bullet_style))
    story.append(Paragraph("2. <b>Lorry Freight Commission:</b> Percentage take-rate on matched lorry transport freight.", bullet_style))
    story.append(Paragraph("3. <b>Supplier SaaS Subscriptions:</b> Premium quarry badges, lead generation, and sales analytics.", bullet_style))
    story.append(Paragraph("4. <b>Driver Pro Tier:</b> Priority access to lucrative return loads and route earnings optimization.", bullet_style))

    story.append(Spacer(1, 15))

    # Signoff Box
    signoff_text = Paragraph(
        "<b>Repository & Deployment Status:</b><br/>"
        "GitHub Repository: <code>https://github.com/alishanea/lorrio.git</code><br/>"
        "Branch: <code>main</code> (Fully committed & pushed)<br/>"
        "Local Dev Command: <code>cmd /c npm run dev</code>",
        ParagraphStyle('Signoff', parent=body_style, textColor=DARK_BG)
    )
    so_table = Table([[signoff_text]], colWidths=[504])
    so_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#94A3B8")),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(so_table)

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated at: {filename}")

if __name__ == "__main__":
    out_pdf = r"c:\Users\ALISHAN\Downloads\SideCFO\lorrio\LORRIO_MASTER_PROJECT_BRIEF.pdf"
    create_pdf(out_pdf)
