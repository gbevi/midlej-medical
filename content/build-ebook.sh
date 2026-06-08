#!/usr/bin/env bash
# Gera todos os PDFs dos materiais da mentoria a partir dos markdowns + CSS editorial.
# Requer: pandoc + weasyprint.
# Os PDFs gerados ficam em ./ e são copiados para ../public/guias/ pra entrega na LP.

set -euo pipefail

cd "$(dirname "$0")"

# WeasyPrint (Anaconda) precisa achar pango/glib do Homebrew.
export DYLD_FALLBACK_LIBRARY_PATH="/opt/homebrew/lib:${DYLD_FALLBACK_LIBRARY_PATH:-}"

CSS="ebook.css"
PUBLIC_DIR="../public/guias"
mkdir -p "$PUBLIC_DIR"

build_pdf() {
  local src="$1"
  local out="$2"
  local title="$3"

  pandoc "$src" \
    --from gfm \
    --to html5 \
    --standalone \
    --css "$CSS" \
    --metadata title="$title" \
    --pdf-engine=weasyprint \
    -o "$out" 2>&1 | grep -vE "GLib|^$" || true

  cp "$out" "$PUBLIC_DIR/"
  echo "✓ $out  →  $PUBLIC_DIR/$(basename "$out")"
}

build_pdf "ebook-5-erros.md"     "ebook-5-erros.pdf"     "5 erros que o médico PJ comete na carteira"
build_pdf "memoria-calculo.md"   "memoria-calculo.pdf"   "Memória do cálculo — Simulador Midlej Capital"
build_pdf "laudo-raio-x.md"      "laudo-raio-x.pdf"      "Laudo do raio-x da carteira — template"
