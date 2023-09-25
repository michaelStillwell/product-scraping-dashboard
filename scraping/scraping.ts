// TODO: implement the scraping

export interface Product {
  name: string;
  price?: number;
  site?: string;
  fullUrl?: string;
}

// NOTE: this is obtuse but don't care initially
async function scrape() {
  console.log("I am scraping...");

  const products = Bun.file("./products.json");

  // need to make this more generic
  const { resolver } = require("./resolvers/Ebay");
  const ebay = await resolver();

  const data = [...ebay];
  Bun.write(products, JSON.stringify(data, null, 2));
}

scrape();
