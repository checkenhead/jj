const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        // target: 'http://3.34.13.181:8070',
        target: 'http://localhost:8070',
        changeOrigin: true
    }));
}