import React from 'react';
import { renderToReadableStream } from 'react-dom/server';
import { Component } from './app.tsx';

const server = Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;
    if (path !== "/") {
      return new Response("404");
    }

    const file = Bun.file("./scraping/products-example.json");
    const json = await file.json();

    const stream = await renderToReadableStream(<Component products={json} />);
    return new Response(stream, { headers: { "Content-Type": "text/html" } })
  }
});

console.log(`Listening on ${server.port} radio...`);
