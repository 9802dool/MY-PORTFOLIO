import type { Listing, ServiceCategory } from "./types";

export const listings: Listing[] = [
  {
    id: "h-coco",
    category: "hotel",
    name: "Coco Reef Resort & Spa",
    shortDescription: "Beachfront rooms, pool, and spa near Crown Point.",
    location: "Crown Point",
    priceFromTtd: 890,
    imageHint: "resort",
  },
  {
    id: "h-blue",
    category: "hotel",
    name: "Blue Waters Inn",
    shortDescription: "Quiet cove, diving dock, and reef access at Speyside.",
    location: "Speyside",
    priceFromTtd: 720,
    imageHint: "cove",
  },
  {
    id: "h-castara",
    category: "hotel",
    name: "Castara Retreats",
    shortDescription: "Eco-lodges overlooking the bay and rainforest.",
    location: "Castara",
    priceFromTtd: 650,
    imageHint: "eco",
  },
  {
    id: "a-nering",
    category: "attraction",
    name: "Nylon Pool & Buccoo Reef",
    shortDescription: "Glass-bottom boats to shallow sandbar and coral gardens.",
    location: "Buccoo",
    priceFromTtd: 180,
    imageHint: "reef",
  },
  {
    id: "a-argyle",
    category: "attraction",
    name: "Argyle Waterfall",
    shortDescription: "Guided rainforest hike to Tobago’s highest waterfall.",
    location: "Roxborough",
    priceFromTtd: 120,
    imageHint: "waterfall",
  },
  {
    id: "a-fort",
    category: "attraction",
    name: "Fort King George",
    shortDescription: "Historic fort, museum, and panoramic Scarborough views.",
    location: "Scarborough",
    priceFromTtd: 40,
    imageHint: "fort",
  },
  {
    id: "t-airport",
    category: "taxi",
    name: "Airport ↔ hotel transfer",
    shortDescription: "Licensed taxi, meet-and-greet, fixed route pricing.",
    location: "Islandwide",
    priceFromTtd: 150,
    imageHint: "taxi",
  },
  {
    id: "t-day",
    category: "taxi",
    name: "Full-day island tour (8 hrs)",
    shortDescription: "Driver-guide: beaches, villages, and viewpoints.",
    location: "Custom route",
    priceFromTtd: 1200,
    imageHint: "tour",
  },
  {
    id: "b-charter",
    category: "boat",
    name: "Private fishing charter",
    shortDescription: "Half or full day with gear and crew from Charlotteville.",
    location: "Charlotteville",
    priceFromTtd: 2200,
    imageHint: "fishing",
  },
  {
    id: "b-sunset",
    category: "boat",
    name: "Sunset catamaran cruise",
    shortDescription: "Drinks, music, and west-coast golden hour.",
    location: "Store Bay area",
    priceFromTtd: 350,
    imageHint: "sunset",
  },
  {
    id: "f-jemma",
    category: "dining",
    name: "Jemma’s Tree House",
    shortDescription: "Signature creole and seafood in a treetop setting.",
    location: "Speyside",
    priceFromTtd: 200,
    imageHint: "dining",
  },
  {
    id: "f-shore",
    category: "dining",
    name: "Shore Things Café & Craft",
    shortDescription: "Beach café, local breakfast, and craft market bites.",
    location: "Pigeon Point",
    priceFromTtd: 120,
    imageHint: "cafe",
  },
  {
    id: "n-shade",
    category: "nightlife",
    name: "Shade Nightclub",
    shortDescription: "DJs, soca nights, and weekend events in Crown Point.",
    location: "Crown Point",
    priceFromTtd: 80,
    imageHint: "club",
  },
  {
    id: "n-karaoke",
    category: "nightlife",
    name: "Bonkers Karaoke & Bar",
    shortDescription: "Late bar, karaoke, and cocktails near the strip.",
    location: "Crown Point",
    priceFromTtd: 60,
    imageHint: "bar",
  },
];

/** One curated item per category for the “all services” package */
export const ALL_IN_ONE_LISTING_IDS: string[] = [
  "h-coco",
  "a-nering",
  "t-airport",
  "b-sunset",
  "f-jemma",
  "n-shade",
];

export function getListingById(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function listingsByCategory(cat: ServiceCategory): Listing[] {
  return listings.filter((l) => l.category === cat);
}

export const categoryLabels: Record<ServiceCategory, string> = {
  hotel: "Hotels & stays",
  attraction: "Attractions",
  taxi: "Taxi & transfers",
  boat: "Boats & sea",
  dining: "Food & dining",
  nightlife: "Nightlife",
};

export const categoryPaths: Record<ServiceCategory, string> = {
  hotel: "/hotels",
  attraction: "/attractions",
  taxi: "/taxis",
  boat: "/boats",
  dining: "/dining",
  nightlife: "/nightlife",
};
