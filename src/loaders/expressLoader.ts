import { Application } from "express";
import {
  MicroframeworkLoader,
  MicroframeworkSettings,
} from "microframework-w3tec";
import { createExpressServer } from "routing-controllers";

import { env } from "../env";

export const expressLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    const connection = settings.getData("connection");

    const expressApp: Application = createExpressServer({
      cors: true,
      classTransformer: true,
      defaultErrorHandler: false,
      controllers: env.app.dirs.controllers,
      middlewares: env.app.dirs.middlewares,
      interceptors: env.app.dirs.interceptors,
    });

    if (!env.isTest) {
      const server = expressApp.listen(env.app.port);

      settings.setData("express_server", server);
    }

    // Here we can set the data for other loaders
    settings.setData("express_app", expressApp);
  }
};
