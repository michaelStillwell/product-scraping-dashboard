import { html } from "@elysiajs/html";
import {
  getProductsResolver,
  getSitesResolver,
  postQueryResolver,
} from "./resolvers";
import Elysia from "elysia";
import { CreateQuery, Modal } from "./components";

const app = new Elysia()
  .use(html())
  .get("/", () => (
    <html lang="en" data-theme="dracula">
      <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@2.6.0/dist/full.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          src="https://unpkg.com/htmx.org@1.9.6"
          integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni"
          crossorigin="anonymous"
        ></script>
      </head>
      <body>
        <main className="container m-auto">
          <h1 className="text-xl">Products I am interested in</h1>

          <CreateQuery />

          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>URL</th>
              </tr>
            </thead>

            <tbody id="table-data" hx-get="/products" hx-trigger="load"></tbody>
          </table>
        </main>
      </body>
    </html>
  ))
  .get("/products", getProductsResolver)
  .get("/sites", getSitesResolver)
  .post("/query", postQueryResolver)
  .listen(3000);

console.log(`Listening on port ${app.server?.port} radio`);
