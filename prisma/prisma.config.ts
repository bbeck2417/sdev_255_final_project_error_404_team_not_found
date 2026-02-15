import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    // This connects the CLI (npx prisma migrate) to Supabase
    url: process.env.DATABASE_URL,
  },
});
