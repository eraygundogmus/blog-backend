import { bootstrapMicroframework } from "microframework-w3tec";
import { expressLoader } from "./loaders/express";

bootstrapMicroframework({
  loaders: [expressLoader],
})
  .then(() => console.log("Application is up and running!"))
  .catch((error) => console.error("Application is crashed: " + error));
