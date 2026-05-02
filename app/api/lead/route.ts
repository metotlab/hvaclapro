import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const LeadSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(7).max(30),
  email: z.string().email().optional().or(z.literal("")),
  service: z.string().max(80).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  // Honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
  // Time-trap — must be at least 2 seconds since render
  ts: z.coerce.number().optional(),
});

const ipHits = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.reset < now) {
    ipHits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, skipped: true as const };
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
  return { ok: res.ok };
}

async function sendWebhook(payload: object) {
  const url = process.env.WEBHOOK_URL;
  if (!url) return { ok: false, skipped: true as const };
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { ok: res.ok };
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const data = parsed.data;
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
  if (data.ts && Date.now() - data.ts < 2000) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const text =
    `<b>New HVAC LA Pro Lead</b>\n` +
    `<b>Name:</b> ${escapeHtml(data.name)}\n` +
    `<b>Phone:</b> ${escapeHtml(data.phone)}\n` +
    (data.email ? `<b>Email:</b> ${escapeHtml(data.email)}\n` : "") +
    (data.service ? `<b>Service:</b> ${escapeHtml(data.service)}\n` : "") +
    (data.message ? `<b>Message:</b> ${escapeHtml(data.message)}\n` : "") +
    `<b>IP:</b> ${escapeHtml(ip)}`;

  const [telegram, webhook] = await Promise.all([
    sendTelegram(text),
    sendWebhook({ ...data, ip, ts: Date.now() }),
  ]);

  if (
    !telegram.ok &&
    !("skipped" in telegram && telegram.skipped) &&
    !webhook.ok &&
    !("skipped" in webhook && webhook.skipped)
  ) {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
}
