const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({ // Client(포트 3000)에서 Server(포트 5000)으로 주겠다
            target: 'http://localhost:5000',
            changeOrigin: true
        })
    )
}
