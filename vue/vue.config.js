require = require('esm')(module)
const { routes } = require('./src/routes.js')

module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    outputDir: '../express/public',
    "transpileDependencies": [
        "vuetify"
    ]
}