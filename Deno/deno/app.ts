import { Application } from "https://deno.land/x/oak/mod.ts";

import todoRoutes from './routes/todos.ts';
import { connect } from './helpers/db_client.ts';

connect();

const app = new Application();

// the async and await here to make sure the response that is sent
// back from every middleware doesn't generate a response too fast
app.use(async (ctx, next) => {
  console.log('middleware!');
  await next();
})

app.use(async (ctx, next) => {
  // the * is a wildcard to say all domains are allowed 
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  // this needs to be await due to routes being asynchronous
  await next();
});

app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

await app.listen({ port: 8000 });