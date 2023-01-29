import * as dotenv from "dotenv";
import * as path from "path";
import * as pkg from "../package.json";

import { getOsEnv, normalizePort } from "./lib/env";

dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === "test" ? ".test" : ""}`
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
    port: normalizePort(process.env.PORT || getOsEnv("APP_PORT")),
  },
};
