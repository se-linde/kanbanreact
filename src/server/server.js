import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";

let port = 8888;
let app = express();

app.listen(port, console.log("Server listening on port: ", port));

/* app.get("/", (req, res) => {
  res.send(" Hello, world!!1111");
}); */

// Used to add a new Kanban task.

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json);

authenticationRoute(app);

export const addNewTask = async (task) => {
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  await collection.insertOne(task);
};

export const updateTask = async (task) => {
  let { id, group, isComplete, name } = task;
  let db = await connectDB();
  let collection = db.collection(`tasks`);

  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }

  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }

  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};

// Making a new task.
app.post("/task/new", async (req, res) => {
  await addNewTask(req.body.task);
  res.status(200).send();
});

// Updating a current task.
app.post("/task/update", async (req, res) => {
  let db = await connectDB();
  await updateTask(req.body.task);
  res.status(200).send();
});
