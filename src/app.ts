import { bootstrapMicroframework } from "microframework-w3tec";
import { expressLoader } from "./loaders/expressLoader";
import { typeormLoader } from "./loaders/typeormLoader";
import * as env from "./env";

bootstrapMicroframework({
  loaders: [expressLoader, typeormLoader],
})
  .then(() => {
    console.log("Application is up and running!");
    console.log(env);
  })
  .catch((error) => console.error("Application is crashed: " + error));
