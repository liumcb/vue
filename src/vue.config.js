const model = 'dev' // dev 为开发环境 build 为测试环境  product 为生产环境
let host = 'https://biz-dev.aibiyag.com';
if (model == 'build') {
    host = 'https://biz.aibiyag.com'
}else if (model == 'dev') {
    host = 'https://biz-dev.aibiyag.com'
}
 
module.exports = {
    runtimeCompiler: true ,
    publicPath:"./",
    outputDir:'dist',
    assetsDir: 'static',
    devServer: {
        port: 8088,
        proxy: {
            '/api': {
                target: host, //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
