// prisma.config.ts (in your project root)
import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  // ✅ Correct: Just a string path
  schema: "./prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL,
  },
});
