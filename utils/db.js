import "dotenv/config";
import mongoose from "mongoose";

async function database() {
  await mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  console.log("Database Connected");
}

export default database;
