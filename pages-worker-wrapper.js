import app from './index.js';

export default {
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname;
    if (env.ASSETS && (path.startsWith('/_next/') || path === '/favicon.svg' || path === '/ocean.png')) {
      return env.ASSETS.fetch(request);
    }
    return app.fetch(request, env, ctx);
  },
};
