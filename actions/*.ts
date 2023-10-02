import { html } from "@elysiajs/html";
import Elysia from "elysia";
import { insertQueries as insertQuery, selectQueries } from "db";
import { selectProducts } from "db";
import { Site } from "db/models";

const getProducts = async () => {
  try {
    const products = await selectProducts();
    const productHtml = [];
    if (products?.length) {
      for (let product of products) {
        productHtml.push(`
        <tr class="mx-8">
          <td>${product?.name}</td>
          <td>$${product?.price.toFixed(2)}</td>
          <td><a class="link" href="${product?.fullUrl}">Visit</a></td>
        </td>`);
      }
    }

    return productHtml.join("");
  } catch (e) {
    console.error(e);
    return "<tr />";
  }
};

const getQueries = async () => {
  try {
    const queries = await selectQueries();
    const queriesHtml = [];

    return queries
      .map(
        (query) => `
          <tr>
            <td>${query?.value}</td>
            <td>${query?.site}</td>
            <td><input class="checkbox" type="checkbox" checked="${query?.active}" /></td>
          </tr>`,
      )
      .join("");
  } catch (e) {
    console.log(e);
    return "<tr />";
  }
};

const createQuery = async ({ body }: any) => {
  // TODO: should this return something? pretty jarring that there is feedback
  const queries = await selectQueries();
  if (body.value === "" || body.site === "") {
    return;
  }

  if (queries.some((q) => q.value == body.query && q.site == body.site)) {
    return;
  }

  await insertQuery(body);
  return;
};

const getSites = () => {
  const values = Object.keys(Site).filter((i) => isNaN(Number(i)));
  return values.map((val) => `<option value=${val}>${val}</option>`).join("");
};

export const actions = new Elysia({ prefix: "/actions" })
  .use(html())
  .get("/products", getProducts)
  .get("/sites", getSites)
  .get("/queries", getQueries)
  .post("/queries", createQuery);
