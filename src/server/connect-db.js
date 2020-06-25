import { MongoClient } from "mongodb";

// This is the local test URL. Change when porting to production and to a domain.
const url = `mongodb://localhost:27017/myorganizer`;
let db = null;

export async function connectDB() {
  if (db) return db;
  let client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.info("Got DB", db);
  return db;
}
