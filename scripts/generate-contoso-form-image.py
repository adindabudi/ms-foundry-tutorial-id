from __future__ import annotations

import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


OUT = Path("sample-data/contoso-indonesia/assets/FORM-reimburse-scan.png")
WIDTH, HEIGHT = 1240, 1754
MARGIN = 92


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size=size)
    return ImageFont.load_default()


def text(draw: ImageDraw.ImageDraw, xy: tuple[int, int], value: str, size: int = 28, fill: str = "#111827", bold: bool = False) -> None:
    draw.text(xy, value, font=font(size, bold), fill=fill)


def box(draw: ImageDraw.ImageDraw, xy: tuple[int, int, int, int], label: str, value: str = "", width: int = 2) -> None:
    draw.rectangle(xy, outline="#475569", width=width)
    text(draw, (xy[0] + 14, xy[1] + 10), label, size=22, fill="#334155", bold=True)
    if value:
        text(draw, (xy[0] + 14, xy[1] + 44), value, size=26, fill="#111827")


def generate() -> None:
    random.seed(42)
    image = Image.new("RGB", (WIDTH, HEIGHT), "#f5f5f0")
    draw = ImageDraw.Draw(image)

    # Paper with subtle shadow.
    paper = (54, 46, WIDTH - 54, HEIGHT - 46)
    draw.rounded_rectangle((paper[0] + 10, paper[1] + 12, paper[2] + 10, paper[3] + 12), radius=8, fill="#d6d3cc")
    draw.rounded_rectangle(paper, radius=8, fill="#ffffff", outline="#cbd5e1", width=2)

    x0, y = MARGIN, 92
    text(draw, (x0, y), "CONTOSO INDONESIA", size=34, bold=True, fill="#0f3b61")
    text(draw, (x0, y + 42), "FORM REIMBURSE KARYAWAN", size=44, bold=True)
    text(draw, (x0, y + 98), "Form internal reimbursement", size=22, fill="#64748b")
    draw.line((x0, y + 136, WIDTH - MARGIN, y + 136), fill="#0f3b61", width=4)

    y += 178
    half = (WIDTH - 2 * MARGIN - 24) // 2
    box(draw, (x0, y, x0 + half, y + 92), "Nama Karyawan", "Karyawan Contoso 014")
    box(draw, (x0 + half + 24, y, WIDTH - MARGIN, y + 92), "Nomor Karyawan", "CTO-ID-014")
    y += 116
    box(draw, (x0, y, x0 + half, y + 92), "Divisi", "Customer Operations")
    box(draw, (x0 + half + 24, y, WIDTH - MARGIN, y + 92), "Tanggal Klaim", "15 Januari 2026")
    y += 128

    text(draw, (x0, y), "Rincian Klaim", size=30, bold=True, fill="#0f3b61")
    y += 48
    columns = ["Tanggal", "Kategori", "Deskripsi", "Nominal"]
    widths = [160, 230, 430, 190]
    table_x = x0
    row_h = 68
    draw.rectangle((table_x, y, table_x + sum(widths), y + row_h), fill="#e7f0fb", outline="#475569", width=2)
    cx = table_x
    for idx, col in enumerate(columns):
        draw.rectangle((cx, y, cx + widths[idx], y + row_h), outline="#475569", width=2)
        text(draw, (cx + 12, y + 20), col, size=22, bold=True, fill="#0f3b61")
        cx += widths[idx]

    rows = [
        ("12 Jan", "Hotel", "Tier 1 - 1 malam", "Rp1.200.000"),
        ("12 Jan", "Transport lokal", "Taksi bandara dan tol", "Rp225.000"),
        ("13 Jan", "Internet perjalanan", "Paket data trip", "Rp150.000"),
        ("", "", "Total klaim", "Rp1.575.000"),
    ]
    y += row_h
    for ridx, row in enumerate(rows):
        fill = "#f8fafc" if ridx % 2 == 0 else "#ffffff"
        cx = table_x
        for idx, cell in enumerate(row):
            draw.rectangle((cx, y, cx + widths[idx], y + row_h), fill=fill, outline="#cbd5e1", width=2)
            text(draw, (cx + 12, y + 20), cell, size=21 if idx != 2 else 20, bold=(ridx == len(rows) - 1), fill="#111827")
            cx += widths[idx]
        y += row_h

    y += 46
    box(draw, (x0, y, WIDTH - MARGIN, y + 120), "Catatan Karyawan", "Perjalanan dinas ke Jakarta untuk workshop pelanggan.")
    y += 154
    box(draw, (x0, y, x0 + half, y + 122), "Persetujuan Manager", "Status: Disetujui")
    box(draw, (x0 + half + 24, y, WIDTH - MARGIN, y + 122), "Finance Review", "Status: Menunggu verifikasi")
    y += 164
    text(draw, (x0, y), "Checklist Dokumen", size=28, bold=True, fill="#0f3b61")
    y += 42
    for item in ["Struk hotel dilampirkan", "Bukti transport dilampirkan", "Tidak ada data pelanggan rahasia", "Klaim diajukan dalam 10 hari kerja"]:
        draw.rectangle((x0, y + 3, x0 + 24, y + 27), outline="#0f3b61", width=2)
        draw.line((x0 + 5, y + 16, x0 + 11, y + 23, x0 + 22, y + 6), fill="#0f3b61", width=3)
        text(draw, (x0 + 40, y), item, size=23)
        y += 40

    # Stamp and scan artifacts.
    text(draw, (WIDTH - 430, HEIGHT - 250), "RECEIVED", size=42, bold=True, fill="#b91c1c")
    draw.rectangle((WIDTH - 455, HEIGHT - 270, WIDTH - 155, HEIGHT - 190), outline="#b91c1c", width=4)
    text(draw, (WIDTH - 430, HEIGHT - 198), "FINANCE OPS", size=22, bold=True, fill="#b91c1c")

    pixels = image.load()
    for _ in range(4500):
        x = random.randrange(60, WIDTH - 60)
        y = random.randrange(60, HEIGHT - 60)
        r, g, b = pixels[x, y]
        delta = random.choice([-8, -5, 5, 8])
        pixels[x, y] = (max(0, min(255, r + delta)), max(0, min(255, g + delta)), max(0, min(255, b + delta)))

    image = image.filter(ImageFilter.GaussianBlur(radius=0.18))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    image.save(OUT, optimize=True)
    print(OUT)


if __name__ == "__main__":
    generate()