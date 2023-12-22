// server.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();


const apiProxy = createProxyMiddleware('/api/auth/login', {
  target: 'https://carapi.app',
  changeOrigin: true,
});

app.use('/api/auth/login', apiProxy);

// To Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
