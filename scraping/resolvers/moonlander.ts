import { Product } from "../scraping";

export function resolver(): Product[] {
  return [
    {
      name: "Moonlander",
      price: 300.9,
      site: "Ebay",
      fullUrl: "http://ebay.com",
    },
  ];
}
