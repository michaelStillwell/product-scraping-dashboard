// TODO: implement the scraping

import { deleteProducts, insertProducts, selectProducts } from "db";
import { resolver as ebayResolver } from "./resolvers/Ebay";
import { resolver as backmarketResolver } from "./resolvers/BackMarket";

export interface Product {
  name: string;
  price?: number;
  site?: string;
  fullUrl?: string;
}

// NOTE: this is obtuse but don't care initially
async function scrape() {
  console.log("I am scraping...");

  // TODO: figure a better way to clear
  const products = await selectProducts();
  for (let product of products) {
    await deleteProducts(product.id);
  }

  // need to make this more generic
  // const ebay = await ebayResolver();
  // const amazon = await amazonResolver();
  const backmarket = await backmarketResolver();

  const data = [
    //...ebay, //...amazon,
    ...backmarket,
  ];
  for (let product of data) {
    await insertProducts(product);
  }
}

scrape();
