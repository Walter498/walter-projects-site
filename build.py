from pathlib import Path
import re
import base64

root = Path(__file__).resolve().parent
text = (root / 'index.html').read_text()
text = re.sub(r'<link rel="stylesheet" href="style\.css[^\"]*">', '<style>\n' + (root / 'style.css').read_text() + '\n</style>', text)
for name in ('projects.js', 'app.js'):
    pattern = r'<script src="' + re.escape(name) + r'[^\"]*" defer></script>'
    script = (root / name).read_text().replace('</script', '<\\/script')
    text = re.sub(pattern, lambda _: '<script>document.addEventListener("DOMContentLoaded",()=>{\n' + script + '\n});</script>', text)
icon = base64.b64encode((root / 'favicon.svg').read_bytes()).decode()
text = text.replace('href="favicon.svg"', 'href="data:image/svg+xml;base64,' + icon + '"')
(root / 'standalone.html').write_text(text)
print('Generated standalone.html:', len(text.encode()), 'bytes')
