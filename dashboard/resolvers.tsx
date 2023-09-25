import { CreateQuery, ProductList } from "./components";
import type { Product } from "./models";
import productsJson from "../db/products.json";
import sitesJson from "../db/sites.json";
import queriesJson from "../db/queries.json";

export const getProductsResolver = () => {
  let products: Product[] = [...productsJson];

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export const getSitesResolver = () => {
  let sites: string[] = [...sitesJson];

  return (
    <>
      {sites.map((site) => (
        <option value={site}>{site}</option>
      ))}
    </>
  );
};

export const postQueryResolver = async ({ body }: any) => {
  let msg = "Query added";

  try {
    if (queriesJson.some(({ query }) => query === body.query)) {
      throw new Error("Query already exists numb nuts");
    }

    queriesJson.push(body);
    await Bun.write("./db/queries.json", JSON.stringify(queriesJson, null, 4));
  } catch (e: any) {
    console.error(e);
    msg = e.message;
  }

  return (
    <>
      <CreateQuery msg={msg} />
    </>
  );
};
