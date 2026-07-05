from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ASSET_DIR = Path("labs/foundry-101a-corpus-foundry-iq/assets")

LABELS = {
    "portal-storage-containers.jpg": "Storage account | Containers",
    "portal-knowledge-sources-list.jpg": "Search service | Knowledge sources",
    "portal-add-knowledge-source-menu.jpg": "Search service | Knowledge sources",
    "portal-create-knowledge-source-form.jpg": "Create knowledge source",
    "portal-knowledge-bases-list.jpg": "Search service | Knowledge bases",
    "portal-add-knowledge-base-menu.jpg": "Search service | Knowledge bases",
    "portal-create-knowledge-base-form.jpg": "Create knowledge base",
}


def font(size: int, bold: bool = False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size=size)
    return ImageFont.load_default()


def redact_header(path: Path, label: str) -> None:
    img = Image.open(path).convert("RGB")
    draw = ImageDraw.Draw(img)
    width, _ = img.size

    # Azure portal blade headings sit near the top of the focused crop. Cover
    # the resource-specific title band while keeping toolbar/body controls visible.
    draw.rectangle((0, 0, width, 124), fill="#ffffff")
    draw.rounded_rectangle((18, 12, min(width - 18, 720), 78), radius=8, fill="#ffffff", outline="#d0d7de", width=2)
    draw.text((36, 28), label, font=font(24, True), fill="#1f2937")
    draw.text((36, 56), "Sanitized portal screenshot", font=font(13), fill="#64748b")

    # Lightly blur the far top-right corner in case tenant/resource breadcrumbs
    # are present in a crop from a wider desktop viewport.
    if width > 760:
        region = img.crop((760, 0, width, 96)).filter(ImageFilter.GaussianBlur(radius=10))
        img.paste(region, (760, 0))

    img.save(path, quality=88, optimize=True)


if __name__ == "__main__":
    for filename, label in LABELS.items():
        path = ASSET_DIR / filename
        if path.exists():
            redact_header(path, label)
            print(path)
