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
        
        if self._pageNumber > 1:
            self.drawString(54, 11 * 72 - 36, "LORRIO — Mobile-First Construction Logistics App")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(54, 11 * 72 - 42, 8.5 * 72 - 54, 11 * 72 - 42)

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

    PRIMARY = colors.HexColor("#C85A32")
    DARK_BG = colors.HexColor("#0F172A")
    TEXT_DARK = colors.HexColor("#1E293B")
    TEXT_MUTED = colors.HexColor("#64748B")
    ACCENT_GREEN = colors.HexColor("#10B981")
    BG_LIGHT = colors.HexColor("#F8FAFC")

    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=24, leading=28, textColor=PRIMARY, spaceAfter=6)
    subtitle_style = ParagraphStyle('DocSubTitle', parent=styles['Normal'], fontName='Helvetica', fontSize=11, leading=15, textColor=TEXT_MUTED, spaceAfter=12)
    h1_style = ParagraphStyle('H1', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=15, leading=19, textColor=DARK_BG, spaceBefore=12, spaceAfter=6, keepWithNext=True)
    body_style = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=9.5, leading=14, textColor=TEXT_DARK, spaceAfter=6)
    bullet_style = ParagraphStyle('Bullet', parent=body_style, leftIndent=15, spaceAfter=4)

    story = []

    story.append(Paragraph("LORRIO — MASTER PROJECT BRIEF & REDESIGN BLUEPRINT", title_style))
    story.append(Paragraph("Mobile-First Application Architecture, WhatsApp Dispatch, GPS Tracking & Feature Specs", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceBefore=0, spaceAfter=12))

    meta_data = [
        [Paragraph("<b>Founder:</b> Alishan E A", body_style), Paragraph("<b>UI Architecture:</b> Mobile-First Native App", body_style)],
        [Paragraph("<b>Target Corridor:</b> Kannur ↔ Wayanad", body_style), Paragraph("<b>Status:</b> Redesigned & Deployed", body_style)]
    ]
    meta_table = Table(meta_data, colWidths=[250, 254])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FEF3C7")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#FDE68A")),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("1. Redesigned Mobile-First Features", h1_style))
    story.append(Paragraph("<b>1. Role Selection Landing Page:</b> Landing page welcoming users with 3 entry cards: Customer (I Need Material), Driver (I Have A Lorry), and Quarry Supplier (I Own A Quarry).", bullet_style))
    story.append(Paragraph("<b>2. Interactive Google Maps Location Picker:</b> Customers select exact quarry pickup and Wayanad delivery site with GPS pin coordinates.", bullet_style))
    story.append(Paragraph("<b>3. Interactive Price & Freight Estimator:</b> Move quantity slider (200 to 1,500 stones) and get real-time price calculations (Material + Lorry Freight + 2.5% Platform Fee).", bullet_style))
    story.append(Paragraph("<b>4. Driver Delivery ETA Input:</b> Drivers set and update delivery ETA (e.g. 'ETA 04:30 PM (1 hr 35 mins)').", bullet_style))
    story.append(Paragraph("<b>5. WhatsApp API Integration:</b> One-touch WhatsApp sharing link generating formatted order summaries containing lorry details, driver contact, ETA, total amount, and live tracking link.", bullet_style))
    story.append(Paragraph("<b>6. Notification Center:</b> Real-time 🔔 Notification tab for Customers and Drivers.", bullet_style))
    story.append(Paragraph("<b>7. Live GPS Tracking Map:</b> Interactive simulation of lorry moving along the Kannur ↔ Wayanad ghat pass route.", bullet_style))

    story.append(Spacer(1, 10))

    story.append(Paragraph("2. Strategic 4-Phase Roadmap", h1_style))
    roadmap_data = [
        [Paragraph("<b>Phase</b>", body_style), Paragraph("<b>Target Focus</b>", body_style), Paragraph("<b>Milestones</b>", body_style)],
        [Paragraph("<b>Phase 1 (Active)</b>", body_style), Paragraph("Kannur ↔ Wayanad", body_style), Paragraph("Mobile-first Laterite stone app, Location Picker, WhatsApp sharing, Return-Load Optimizer.", body_style)],
        [Paragraph("<b>Phase 2</b>", body_style), Paragraph("Regional Kerala", body_style), Paragraph("Kozhikode, Malappuram, Kasaragod; adding M-sand, aggregates, red bricks.", body_style)],
        [Paragraph("<b>Phase 3</b>", body_style), Paragraph("Automation", body_style), Paragraph("WhatsApp bot ordering, dynamic pricing algorithms, automated e-way bills.", body_style)],
        [Paragraph("<b>Phase 4</b>", body_style), Paragraph("Enterprise Hub", body_style), Paragraph("Pan-South India procurement hub & fleet management SaaS.", body_style)]
    ]
    rm_table = Table(roadmap_data, colWidths=[90, 120, 294])
    rm_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(rm_table)

    doc.build(story, canvasmaker=NumberedCanvas)

if __name__ == "__main__":
    out_pdf = r"c:\Users\ALISHAN\Downloads\SideCFO\lorrio\LORRIO_MASTER_PROJECT_BRIEF.pdf"
    create_pdf(out_pdf)
