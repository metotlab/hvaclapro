"use client";
import { useState, useRef, useEffect } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const tsRef = useRef<number>(0);
  useEffect(() => {
    tsRef.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      service: String(fd.get("service") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      ts: tsRef.current,
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Failed to send");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="font-semibold text-primary mb-1">Got it — thank you.</div>
        <p className="text-muted text-sm">
          We&apos;ll call you back within business hours. For faster response, please call us directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-accent hover:underline text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 bg-white border border-border rounded-lg p-6"
      aria-label="Contact form"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px"
      />
      <label className="grid gap-1">
        <span className="text-sm font-medium text-primary">Name</span>
        <input className="border border-border rounded-md px-3 py-2" name="name" type="text" required minLength={2} />
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium text-primary">Phone</span>
        <input className="border border-border rounded-md px-3 py-2" name="phone" type="tel" required />
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium text-primary">Email (optional)</span>
        <input className="border border-border rounded-md px-3 py-2" name="email" type="email" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium text-primary">Service Type</span>
        <select name="service" className="border border-border rounded-md px-3 py-2" defaultValue="AC Repair">
          <option>AC Repair</option>
          <option>AC Installation</option>
          <option>Furnace Repair</option>
          <option>Heat Pump Service</option>
          <option>AC Tune-Up / Maintenance</option>
          <option>Duct Repair</option>
          <option>Smart Thermostat</option>
          <option>Emergency Service</option>
          <option>Other</option>
        </select>
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium text-primary">Message (optional)</span>
        <textarea
          name="message"
          rows={4}
          className="border border-border rounded-md px-3 py-2"
          placeholder="What's going on with your system?"
        />
      </label>
      {status === "error" && (
        <p role="alert" className="text-red-600 text-sm">
          {errorMsg || "Something went wrong. Please call us instead."}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-semibold rounded-lg px-5 py-3"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
      <p className="text-xs text-muted">
        By submitting, you agree to be contacted about your service request. We do not share your information.
      </p>
    </form>
  );
}
