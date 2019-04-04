const path = require("path");
const webpack = require("webpack");
const module_loader = require('./config/all_loader_config.js');
const webpack_plugin_config = require('./config/webpack_plugin_config.js');
const entry_config = require('./config/entry_config.js');
const webpack_dev_server_config = require('./config/webpack_dev_server_config.js');
const get_env_config = require('./config/get_env_config.js');

const ENV = get_env_config() === 'development';

module.exports = {
    entry: entry_config(ENV),
    output: {
        path: path.resolve(__dirname + '/dist/'),
        filename: 'js/[name].js',
    },
    module: module_loader(ENV),
    mode: ENV ? "development" : "production",
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                restCss: {  // 提取 公共css文件
                    name: 'commons',    //提取出来的文件命名
                    chunks: 'initial',  //initial表示提取入口文件的公共部分
                    minChunks: 2,       //表示提取公共部分最少的文件数
                    minSize: 0,       //表示提取公共部分最小的大小
                }
            }
        },
    },
    devServer: webpack_dev_server_config(),
    plugins: webpack_plugin_config(),
}