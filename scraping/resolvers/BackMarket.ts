import { Product } from "../scraping";
import cheerio from "cheerio";

export async function resolver(): Promise<Product[]> {
  const query = "ZSA Moonlander";
  const searchUrl = `https://www.backmarket.com/en-us/search?q=${encodeURIComponent(
    query,
  )}`;
  const response = await fetch(searchUrl);
  console.log(response);
  const $ = cheerio.load(await response.text());

  const results: Product[] = [];
  console.log($("div.productCard").text());

  $("div.productCard").each((index, element) => {
    const productName = $(element).find("h2").text();
    console.log("product", index, productName);
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
