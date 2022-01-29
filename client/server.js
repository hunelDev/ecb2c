const express = require('express');
const http = require('http');
const next = require('next').default;
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
});
const handler = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  server.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '/' },
    })
  );
  server.all('*', (req, res) => {
    handler(req, res);
  });

  server.listen(80, () => {
    console.log('server listening...');
  });
});
