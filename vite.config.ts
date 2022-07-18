import { defineConfig } from 'vite';

if (
  process.env.npm_lifecycle_event === 'build' &&
  !process.env.CI &&
  !process.env.SHOPIFY_API_KEY
) {
  console.warn(
    '\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n',
  );
}

const proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};

const host = process.env.HOST
  ? process.env.HOST.replace(/https:\/\//, '')
  : undefined;

let hmrConfig;
if (process.env.SHOPIFY_VITE_HMR_USE_WSS) {
  hmrConfig = {
    protocol: host ? 'wss' : 'ws',
    host: host || 'localhost',
    port: process.env.FRONTEND_PORT,
    clientPort: 443,
  };
} else {
  hmrConfig = {
    protocol: 'ws',
    host: 'localhost',
    port: 64999,
    clientPort: 64999,
  };
}

export default defineConfig({
  define: {
    'process.env.SHOPIFY_API_KEY': JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    host: process.env.SHOPIFY_VITE_HMR_USE_WSS ? '0.0.0.0' : 'localhost',
    port: process.env.FRONTEND_PORT
      ? Number.parseInt(process.env.FRONTEND_PORT as string)
      : undefined,
    hmr: hmrConfig,
    proxy: {
      '^/(\\?.*)?$': proxyOptions,
      '^/api(/|(\\?.*)?$)': proxyOptions,
      '^/oauth(/|(\\?.*)?$)': proxyOptions,
    },
  },
});
