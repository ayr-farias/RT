/**
 * Cloudflare Pages Function — POST /api/quote
 *
 * Keeps the form on our own domain, which matters for the procurement
 * audience (§8). Delivers by email via Resend. Nothing is persisted.
 *
 * Required environment variables (Pages → Settings → Environment variables):
 *   RESEND_API_KEY   Resend API key
 *   QUOTE_TO         inbox that receives the lead
 *   QUOTE_FROM       verified sender, e.g. "site@recifetranslators.com.br"
 */

interface Env {
  RESEND_API_KEY: string;
  QUOTE_TO: string;
  QUOTE_FROM: string;
}

const FIELDS = [
  'dates', 'city', 'venue', 'roomFormat', 'duration', 'listeners',
  'hasEquipment', 'clientType', 'name', 'email', 'whatsapp', 'notes',
] as const;

const REQUIRED = [
  'dates', 'city', 'roomFormat', 'duration', 'listeners',
  'hasEquipment', 'clientType', 'name', 'email',
] as const;

/** Minimum plausible time for a human to complete the form. */
const MIN_FILL_MS = 3000;

const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );

function reply(accept: string | null, ok: boolean, lang: string, status = ok ? 200 : 400) {
  if (accept?.includes('application/json')) {
    return new Response(JSON.stringify({ ok }), {
      status,
      headers: { 'content-type': 'application/json' },
    });
  }
  // No-JS fallback: the native POST lands on a real confirmation page.
  const pt = lang !== 'en';
  const title = ok
    ? (pt ? 'Pedido recebido' : 'Request received')
    : (pt ? 'Não foi possível enviar' : 'Could not send');
  const body = ok
    ? (pt
        ? 'Respondemos em até 4 horas em dias úteis. Se a data for urgente, chame no WhatsApp.'
        : 'We reply within 4 hours on business days. If the date is urgent, WhatsApp is faster.')
    : (pt
        ? 'Algo falhou no envio. Volte e tente de novo, ou fale direto no WhatsApp.'
        : 'Something failed on the way out. Go back and try again, or message us on WhatsApp.');
  const home = pt ? '/' : '/en/';
  return new Response(
    `<!doctype html><html lang="${pt ? 'pt-BR' : 'en'}"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>${esc(title)}</title>
<body style="font-family:Georgia,serif;background:#F0F2F0;color:#1B1E1E;padding:3rem 1.5rem;line-height:1.6">
<main style="max-width:34rem;margin:0 auto">
<h1 style="font-family:system-ui,sans-serif">${esc(title)}</h1>
<p>${esc(body)}</p>
<p><a href="${home}" style="color:#143D38">← ${pt ? 'Voltar ao site' : 'Back to the site'}</a></p>
</main>`,
    { status, headers: { 'content-type': 'text/html; charset=utf-8' } },
  );
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const accept = request.headers.get('accept');
  let lang = 'pt';

  try {
    const form = await request.formData();
    lang = String(form.get('lang') ?? 'pt');

    // Spam trap 1: honeypot. Silently accept so the bot does not retry.
    if (String(form.get('website') ?? '').trim() !== '') {
      return reply(accept, true, lang);
    }

    // Spam trap 2: submitted implausibly fast.
    const loadedAt = Number(form.get('loadedAt') ?? 0);
    if (loadedAt > 0 && Date.now() - loadedAt < MIN_FILL_MS) {
      return reply(accept, true, lang);
    }

    if (String(form.get('consent') ?? '') !== 'yes') {
      return reply(accept, false, lang, 422);
    }

    const data: Record<string, string> = {};
    for (const key of FIELDS) data[key] = String(form.get(key) ?? '').trim();
    const pairs = form.getAll('pairs').map(String);

    const missing = REQUIRED.filter((k) => !data[k]);
    if (missing.length > 0 || pairs.length === 0) {
      return reply(accept, false, lang, 422);
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      return reply(accept, false, lang, 422);
    }

    const rows = [...FIELDS.map((k) => [k, data[k]] as const), ['pairs', pairs.join(', ')] as const]
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${esc(k)}</th><td>${esc(v)}</td></tr>`)
      .join('');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.QUOTE_FROM,
        to: [env.QUOTE_TO],
        reply_to: data.email,
        subject: `Orçamento — ${data.city} — ${data.dates} — ${data.name}`,
        html: `<h2>Novo pedido de orçamento</h2><table>${rows}</table>`,
      }),
    });

    if (!res.ok) return reply(accept, false, lang, 502);
    return reply(accept, true, lang);
  } catch {
    return reply(accept, false, lang, 500);
  }
};
