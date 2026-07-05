from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT_DIR = Path("sample-data/contoso-indonesia/assets")
OUT_DIR.mkdir(parents=True, exist_ok=True)


def font(size: int, bold: bool = False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size=size)
    return ImageFont.load_default()


def header() -> None:
    img = Image.new("RGBA", (1400, 150), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((0, 0, 1400, 140), radius=14, fill=(248, 250, 252, 235), outline=(203, 213, 225, 255), width=2)
    draw.rectangle((0, 0, 16, 140), fill=(15, 59, 97, 255))
    draw.ellipse((44, 35, 114, 105), fill=(219, 234, 254, 255), outline=(37, 99, 235, 255), width=3)
    draw.arc((58, 49, 100, 91), 35, 315, fill=(37, 99, 235, 255), width=4)
    draw.text((140, 38), "Contoso Indonesia", font=font(30, True), fill=(15, 23, 42, 255))
    draw.text((140, 80), "Internal Policy Document", font=font(20), fill=(100, 116, 139, 255))
    draw.text((1120, 54), "Internal", font=font(24, True), fill=(15, 59, 97, 255))
    draw.text((1120, 88), "Controlled copy", font=font(18), fill=(100, 116, 139, 255))
    img = img.filter(ImageFilter.GaussianBlur(radius=0.08))
    img.save(OUT_DIR / "document-header.png", optimize=True)


def footer() -> None:
    img = Image.new("RGBA", (1400, 86), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    draw.line((0, 14, 1400, 14), fill=(203, 213, 225, 255), width=3)
    draw.rectangle((0, 18, 1400, 86), fill=(248, 250, 252, 220))
    draw.text((42, 38), "Contoso Indonesia", font=font(18, True), fill=(71, 85, 105, 255))
    draw.text((245, 38), "Internal distribution only", font=font(18), fill=(100, 116, 139, 255))
    draw.text((1090, 38), "Policy Operations", font=font(18), fill=(100, 116, 139, 255))
    img = img.filter(ImageFilter.GaussianBlur(radius=0.08))
    img.save(OUT_DIR / "document-footer.png", optimize=True)


if __name__ == "__main__":
    header()
    footer()
    print(OUT_DIR / "document-header.png")
    print(OUT_DIR / "document-footer.png")
