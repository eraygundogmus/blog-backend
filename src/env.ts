import * as dotenv from "dotenv";
import * as path from "path";
import * as pkg from "../package.json";

import {
  getOsEnv,
  normalizePort,
  getOsPaths,
  getOsPath,
  getOsEnvOptional,
  toBool,
  toNumber,
} from "./lib/env";

dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV && `.${process.env.NODE_ENV}`}`
  ),
});

export const env = {
  node: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  app: {
    name: getOsEnv("APP_NAME"),
    version: (pkg as any).version,
    description: (pkg as any).description,
    host: getOsEnv("APP_HOST"),
    schema: getOsEnv("APP_SCHEMA"),
    port: normalizePort(process.env.PORT || getOsEnv("APP_PORT")),
    routePrefix: getOsEnv("APP_ROUTE_PREFIX"),
    dirs: {
      migrations: getOsPaths("TYPEORM_MIGRATIONS"),
      migrationsDir: getOsPath("TYPEORM_MIGRATIONS_DIR"),
      entities: getOsPaths("TYPEORM_ENTITIES"),
      entitiesDir: getOsPath("TYPEORM_ENTITIES_DIR"),
      controllers: getOsPaths("CONTROLLERS"),
      middlewares: getOsPaths("MIDDLEWARES"),
      interceptors: getOsPaths("INTERCEPTORS"),
      subscribers: getOsPaths("SUBSCRIBERS"),
      resolvers: getOsPaths("RESOLVERS"),
    },
  },
  db: {
    type: getOsEnv("TYPEORM_CONNECTION"),
    host: getOsEnvOptional("TYPEORM_HOST"),
    port: toNumber(getOsEnvOptional("TYPEORM_PORT")),
    username: getOsEnvOptional("TYPEORM_USERNAME"),
    password: getOsEnvOptional("TYPEORM_PASSWORD"),
    database: getOsEnv("TYPEORM_DATABASE"),
    synchronize: toBool(getOsEnvOptional("TYPEORM_SYNCHRONIZE")),
    logging: getOsEnv("TYPEORM_LOGGING"),
  },
  swagger: {
    enabled: toBool(getOsEnv("SWAGGER_ENABLED")),
    route: getOsEnv("SWAGGER_ROUTE"),
    username: getOsEnv("SWAGGER_USERNAME"),
    password: getOsEnv("SWAGGER_PASSWORD"),
  },
};
