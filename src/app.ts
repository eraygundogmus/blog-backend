import "es6-shim";
import "reflect-metadata";

import { bootstrapMicroframework } from "microframework-w3tec";
import { expressLoader } from "./loaders/expressLoader";
import { typeormLoader } from "./loaders/typeormLoader";
import { swaggerLoader } from "./loaders/swaggerLoader";
import { homeLoader } from "./loaders/homeLoader";
import { iocLoader } from "./loaders/iocLoader";

bootstrapMicroframework({
  loaders: [iocLoader, expressLoader, typeormLoader, homeLoader, swaggerLoader],
})
  .then((app) => {
    console.log("Application is up and running!");
  })
  .catch((error) => console.error("Application is crashed: " + error));
