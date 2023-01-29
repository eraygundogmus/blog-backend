import { bootstrapMicroframework } from "microframework-w3tec";
import { expressLoader } from "./loaders/express";
import * as env from "./env";
bootstrapMicroframework({
  loaders: [expressLoader],
})
  .then(() => {
    console.log("Application is up and running!");
    console.log(env);
  })
  .catch((error) => console.error("Application is crashed: " + error));
