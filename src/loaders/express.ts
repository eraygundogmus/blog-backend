import { MicroframeworkSettings } from "microframework-w3tec";
import express from "express";

export function expressLoader(settings: MicroframeworkSettings) {
  const app = express();
  const port = 3000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });
}
