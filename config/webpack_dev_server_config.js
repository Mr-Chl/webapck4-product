
const local_path = require('./path_config.js');
const path = require('path');

function server_fun() {
    const server_config = {
        contentBase: local_path['DIST_HTML_PATH'] ,
        port: 8090, // 本地服务器端口号
        hot: true, // 热重载
        // open: true, // 自动打开浏览器
        stats: {
            timings: true,
            modules: false,
            assets: false,
            entrypoints: false,
            assetsSort: 'field',
            builtAt: false,
            cached: false,
            cachedAssets: false,
            children: false,
            chunks: false,
            chunkGroups: false,
            chunkModules: false,
            chunkOrigins: false,
            performance: true,
            errors: true,
            warnings: true,
        },
        // openPage: '/html/index.html',
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        proxy: {
          // 跨域代理转发
          "/mini_get_car_branch": {
            target: "https://api.chenhelong.cn",
            changeOrigin: true,
          }
        },
        historyApiFallback: {
          // HTML5 history模式
          rewrites: [{ from: /.*/, to: "/html/index.html" }]
        }
    }

    return server_config;
}
module.exports = server_fun;