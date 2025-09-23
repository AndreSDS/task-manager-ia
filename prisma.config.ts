import { PrismaLibSQL } from '@prisma/adapter-libsql';
import 'dotenv/config';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  experimental: {
    adapter: true,
  },
  schema: path.join('prisma', 'schema.prisma'),
  async adapter() {
    return new PrismaLibSQL({
      url: process.env.TURSO_DATABASE_URL as string,
      authToken: process.env.TURSO_AUTH_TOKEN as string,
    });
  },
});
