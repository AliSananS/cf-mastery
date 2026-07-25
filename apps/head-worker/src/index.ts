import { Hono } from "hono";
import { logger } from "@app/lib/logger/index.js"

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/hello", (c) => {
  logger.log("GET /hello")
  return c.text("Hello from head worker!");
});

app.get("/error", () => {
  // Some exceptions left uncaught
  throw new Error("Something went wrong! 😱", {cause: "We're still investigating."});
})

app.get("/log", async (c) => {

  const start = performance.now();

  setTimeout(() => {
  logger.log('Fetching Database...');
  logger.log(`Took ${performance.now() - start}ms`)
  }, 500);

  logger.log('Compiling data...');
  logger.log('Filtering duplicates...');

  return c.json({foo: "bar"})

})

export default app;


