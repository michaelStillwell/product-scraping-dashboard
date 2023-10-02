export enum Site {
  eBay,
  // NOTE: these aren't an easy implementation so need to do them later
  // Amazon,
  // BackMarket,
}

export interface Product {
  id: number;
  name: string;
  price: number;
  fullUrl: string;
  query: Query;
}

export interface Query {
  id: number;
  site: Site;
  value: string;
  active: boolean;
}
