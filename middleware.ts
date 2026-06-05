import { type NextRequest, NextResponse } from "next/server";

/**
 * Subdomain routing — Midlej Capital.
 *
 * Vercel project serve 3 domínios apontando pra mesma build:
 *   - midlejcapital.com.br        → hub principal, /investimentos, /plenomed
 *   - www.midlejcapital.com.br    → mesmo que acima (tratado como root)
 *   - education.midlejcapital.com.br → APENAS /mentoria/*
 *
 * Este middleware reescreve a URL internamente quando o host é o
 * subdomínio education:
 *   - education.midlejcapital.com.br/           → rewrite /mentoria
 *   - education.midlejcapital.com.br/raio-x     → rewrite /mentoria/raio-x
 *   - education.midlejcapital.com.br/ebook      → rewrite /mentoria/ebook
 *
 * A URL na barra do navegador permanece limpa (sem o prefixo /mentoria) —
 * é rewrite, não redirect. Para o usuário, education é uma propriedade
 * independente da mentoria.
 *
 * Os outros domínios (midlejcapital.com.br + www) seguem o roteamento
 * nativo do Next: /, /investimentos, /mentoria/*, /plenomed continuam
 * acessíveis para devs e fallback. A canonicalização SEO entre os
 * domínios deve ser feita via `metadataBase` + `alternates.canonical`
 * por rota, em iteração futura.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Skip assets e API — middleware não deve interceptar isso.
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname === "/favicon.ico" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // education.* → reescreve para /mentoria{path}.
  if (host.startsWith("education.")) {
    // Se já vier prefixado por algum motivo, deixa fluir.
    if (pathname.startsWith("/mentoria")) {
      return NextResponse.next();
    }
    url.pathname = pathname === "/" ? "/mentoria" : `/mentoria${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Outros hosts: passa direto. /mentoria, /investimentos, /plenomed
  // seguem disponíveis no domínio principal por enquanto.
  return NextResponse.next();
}

/**
 * Matcher: roda em tudo exceto rotas internas do Next e assets.
 * O check de extensão dentro do middleware é defensivo (matcher
 * regex ignora muitos casos mas não todos).
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
