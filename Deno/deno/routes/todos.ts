import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

import { getDb } from "../helpers/db_client.ts";

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

router.get("/todos", async (ctx) => {
  // {_id: ObjectId(), text: '...'}[] individual documents
  const todos = await getDb().collection("todos").find();
  const transformedTodos = todos.map(
    (todo: { _id: ObjectId; text: string }) => {
      // the $oid converts the ObjectId into a string
      return { id: todo._id.$oid, text: todo.text };
    }
  );
  // For Deno/Oak, you set the response body and if you set it
  // as an object, Oak will know to treat it as json and will send
  // the response correctly
  ctx.response.body = { todos: transformedTodos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body();
  const newTodo: Todo = {
    // id: new Date().toISOString(),
    text: data.value.text,
  };

  const id = await getDb().collection("todos").insertOne(newTodo);
  newTodo.id = id.$oid;

  ctx.response.body = { message: "Created Todo", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  // the exclamation informs ts that it will never be undefined
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body();
  await getDb().collection('todos').updateOne({_id: ObjectId(tid)}, { $set: { text: data.value.text } });
  ctx.response.body = { message: "Updated Todo"};
});
router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;

  await getDb().collection('todos').deleteOne({_id: ObjectId(tid)});

  ctx.response.body = { message: "Deleted Todo"};
});

export default router;
