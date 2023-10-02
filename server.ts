import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import { actions } from "./actions/*";

const app = new Elysia()
  .use(staticPlugin({ assets: "./public" }))
  .use(html())
  .use(actions)
  .get("/", () => Bun.file("public/index.html"))
  .listen(3000);

console.log(`Listening on port ${app.server?.port} radio...`);
