import { app } from "./app";
import { env } from "./infra/env/env";

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("🚀 Server running");
  });
