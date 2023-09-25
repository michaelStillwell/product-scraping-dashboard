import { Product } from "../scraping";
import cheerio from "cheerio";

export async function resolver(): Promise<Product[]> {
  const query = "ZSA Moonlander";
  const searchUrl = `https://www.ebay.com/sch/i.html?_nkw=${query}`;
  const response = await fetch(searchUrl);
  const $ = cheerio.load(await response.text());

  const results: Product[] = [];

  $("#srp-river-results .s-item").each((index, element) => {
    const productName = $(element).find(".s-item__title").text();
    const productPrice = $(element).find(".s-item__price").text();
    const productUrl = $(element).find(".s-item__link").attr("href");

    results.push({
      name: productName.trim(),
      price: parseFloat(productPrice.replace("$", "").trim()),
      site: "Ebay",
      fullUrl: productUrl,
    });
  });

  return results;
}
