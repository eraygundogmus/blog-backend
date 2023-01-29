import "reflect-metadata";

import { bootstrapMicroframework } from "microframework-w3tec";
import { expressLoader } from "./loaders/expressLoader";
import { typeormLoader } from "./loaders/typeormLoader";

import { homeLoader } from "./loaders/homeLoader";
bootstrapMicroframework({
  loaders: [expressLoader, typeormLoader, homeLoader],
})
  .then((app) => {
    console.log("Application is up and running!");
  })
  .catch((error) => console.error("Application is crashed: " + error));
