import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-tt-sand-dark/20 bg-tt-ocean text-tt-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">Tobago To The World</p>
            <p className="mt-2 max-w-sm text-sm text-tt-cream/80">
              One place to explore stays, tours, transport, sea trips, dining, and
              nightlife — then book everything together or tailor your trip.
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="font-semibold text-white">Plan</p>
              <ul className="mt-2 space-y-1 text-tt-cream/80">
                <li>
                  <Link href="/book" className="hover:text-white">
                    Book &amp; cart
                  </Link>
                </li>
                <li>
                  <Link href="/hotels" className="hover:text-white">
                    Hotels
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Deploy</p>
              <p className="mt-2 max-w-[200px] text-tt-cream/80">
                Ready for{" "}
                <a
                  href="https://vercel.com"
                  className="underline hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vercel
                </a>
                . Connect this folder as a new project.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-tt-cream/60">
          Demo listings and prices are illustrative. Confirm with operators before travel.
        </p>
      </div>
    </footer>
  );
}
