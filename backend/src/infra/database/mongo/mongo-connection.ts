import mongoose from "mongoose";
import { env } from "@/infra/env/env";

mongoose.set("strictQuery", true);

export async function mongoConnection() {
  await mongoose.connect(env.MONGO_URL);

  console.log("Banco de dados conectado");
}

mongoConnection().catch((err) => console.log(err));
