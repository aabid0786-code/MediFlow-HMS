const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://aabidshahnaj:2Kf29jVu7aPHsl3U@mediflow-cluster.k6qb3qr.mongodb.net/?appName=mediflow-cluster";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log(error.message);
  } finally {
    await client.close();
  }
}

run();