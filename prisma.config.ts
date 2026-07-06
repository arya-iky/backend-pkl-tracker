import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    // Ubah ekstensinya dari .js menjadi .ts di sini
    seed: 'npx tsx ./prisma/seed.ts', 
  },
});