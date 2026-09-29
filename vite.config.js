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
  .map((entry) => `/pages/contributors/${entry.name.replace(/\.adoc$/, '')}`);

// Set by the pipeline. Falls back to main for local builds, which is where
// the published site is served from.
const githubBranch = process.env.GITHUB_BRANCH || 'main';

export default defineConfig({
  define: {
    'import.meta.env.GITHUB_BRANCH': JSON.stringify(githubBranch),
  },
  ssgOptions: {
    dirStyle: 'nested',
  },
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
