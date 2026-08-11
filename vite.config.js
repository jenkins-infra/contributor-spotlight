import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

const contributorsDir = path.resolve('src/contributors');

const dynamicRoutes = fs
  .readdirSync(contributorsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.adoc'))
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((entry) => `/contributors/${entry.name.replace(/\.adoc$/, '')}`);

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://contributors.jenkins.io',
      dynamicRoutes,
      readable: true,
      priority: {
        '/': 1.0,
        '*': 0.8,
      },
      changefreq: {
        '/': 'daily',
        '*': 'weekly',
      },
    }),
  ],
});
