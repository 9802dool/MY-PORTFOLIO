export type ServiceCategory =
  | "hotel"
  | "attraction"
  | "taxi"
  | "boat"
  | "dining"
  | "nightlife";

export type Listing = {
  id: string;
  category: ServiceCategory;
  name: string;
  shortDescription: string;
  location: string;
  /** Estimated price in TTD for display; packages sum these */
  priceFromTtd: number;
  imageHint: string;
};

export type BookingLine = {
  key: string;
  listingId: string;
  category: ServiceCategory;
  name: string;
  priceFromTtd: number;
};
