// TODO: implement the scraping

export interface Product {
  name: string;
  price?: number;
  site?: string;
  fullUrl?: string;
}

// NOTE: this is obtuse but don't care initially
function scrape() {
  console.log("I am scraping...");

  const products = Bun.file("./product.json");
  const writer = products.writer();

  // need to make this more generic
  const { resolver } = require("./resolvers/moonlander");
  const moonlander = resolver();

  const data = [...moonlander];
  writer.write(JSON.stringify(data, null, 2));
  writer.flush();
  writer.end();
}

scrape();
