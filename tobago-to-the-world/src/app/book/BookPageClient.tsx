"use client";

import { useState } from "react";
import Link from "next/link";
import { useBooking } from "@/context/BookingProvider";
import { categoryLabels } from "@/lib/data";

export function BookPageClient() {
  const {
    lines,
    removeLine,
    clear,
    loadAllInOnePackage,
    totalTtd,
    count,
  } = useBooking();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [arrival, setArrival] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (count === 0) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-tt-palm/30 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tt-palm/15 text-2xl">
          ✓
        </div>
        <h2 className="mt-6 font-display text-2xl font-bold text-tt-ink">
          Request received
        </h2>
        <p className="mt-3 text-tt-ink-muted">
          Thanks{ name ? `, ${name}` : ""}. This demo records your selection locally only.
          For production, connect this form to email, a CRM, or a payments API.
        </p>
        <p className="mt-4 text-sm text-tt-ink-muted">
          Estimated total (illustrative):{" "}
          <strong className="text-tt-ocean">TTD {totalTtd}</strong>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              clear();
            }}
            className="rounded-full border border-tt-sand-dark/30 px-5 py-2.5 text-sm font-semibold text-tt-ink hover:bg-tt-sand/50"
          >
            New booking
          </button>
          <Link
            href="/"
            className="rounded-full bg-tt-ocean px-5 py-2.5 text-sm font-semibold text-white hover:bg-tt-ocean/90"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-5 lg:gap-10">
      <div className="lg:col-span-2">
        <h2 className="font-display text-xl font-bold text-tt-ink">
          How do you want to book?
        </h2>
        <p className="mt-2 text-sm text-tt-ink-muted">
          Use the curated package for every service type in one tap, or browse categories
          and add only what you need.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => loadAllInOnePackage()}
            className="rounded-2xl border-2 border-tt-ocean bg-tt-ocean/5 px-5 py-4 text-left transition hover:bg-tt-ocean/10"
          >
            <span className="font-semibold text-tt-ocean">All-in-one package</span>
            <span className="mt-1 block text-sm text-tt-ink-muted">
              Loads hotel, attraction, taxi, boat, dining, and nightlife picks into your
              cart. Adjust below.
            </span>
          </button>
          <Link
            href="/hotels"
            className="rounded-2xl border border-tt-sand-dark/30 px-5 py-4 text-left text-sm font-semibold text-tt-ink transition hover:border-tt-ocean/40 hover:bg-white"
          >
            Tailor my trip — browse categories →
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-tt-sand-dark/20 bg-white p-5 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-tt-ink">
            Your cart ({count})
          </h3>
          {count === 0 ? (
            <p className="mt-3 text-sm text-tt-ink-muted">
              Nothing here yet. Add from category pages or load the package.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="flex items-start justify-between gap-3 border-b border-tt-sand-dark/15 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-tt-ink">{line.name}</p>
                    <p className="text-xs text-tt-ink-muted">
                      {categoryLabels[line.category]} · TTD {line.priceFromTtd}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.key)}
                    className="shrink-0 text-xs font-semibold text-tt-coral hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          {count > 0 ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-tt-sand-dark/20 pt-4">
              <p className="text-sm font-semibold text-tt-ocean">
                Est. total TTD {totalTtd}
              </p>
              <button
                type="button"
                onClick={() => clear()}
                className="text-xs font-semibold text-tt-ink-muted hover:text-tt-coral"
              >
                Clear cart
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="lg:col-span-3">
        <h2 className="font-display text-xl font-bold text-tt-ink">
          Trip details
        </h2>
        <p className="mt-2 text-sm text-tt-ink-muted">
          Send one request with every line item. Operators would confirm dates and final
          pricing in a real deployment.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-tt-ink">
              Full name
            </label>
            <input
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-tt-sand-dark/30 bg-white px-4 py-2.5 text-tt-ink shadow-sm focus:border-tt-ocean focus:outline-none focus:ring-2 focus:ring-tt-ocean/20"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-tt-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-tt-sand-dark/30 bg-white px-4 py-2.5 text-tt-ink shadow-sm focus:border-tt-ocean focus:outline-none focus:ring-2 focus:ring-tt-ocean/20"
            />
          </div>
          <div>
            <label htmlFor="arrival" className="block text-sm font-medium text-tt-ink">
              Arrival date
            </label>
            <input
              id="arrival"
              name="arrival"
              type="date"
              required
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-tt-sand-dark/30 bg-white px-4 py-2.5 text-tt-ink shadow-sm focus:border-tt-ocean focus:outline-none focus:ring-2 focus:ring-tt-ocean/20"
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-tt-ink">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Dietary needs, pickup times, room preferences…"
              className="mt-1.5 w-full rounded-xl border border-tt-sand-dark/30 bg-white px-4 py-2.5 text-tt-ink shadow-sm focus:border-tt-ocean focus:outline-none focus:ring-2 focus:ring-tt-ocean/20"
            />
          </div>
          <button
            type="submit"
            disabled={count === 0}
            className="w-full rounded-full bg-tt-coral py-3 text-sm font-semibold text-white shadow-md transition hover:bg-tt-coral/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit booking request
          </button>
        </form>
      </div>
    </div>
  );
}
