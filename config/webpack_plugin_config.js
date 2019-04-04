
const fs = require('fs');
const path = require('path');
const local_path = require('./path_config.js');
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const html_plugin = [];
const src_html_dir = local_path['SRC_HTML_PATH'];
const dist_html_path = local_path['DIST_HTML_PATH'];
const dist_css_path = local_path['DIST_CSS_PATH'];
const src_js_path = local_path['SRC_JS_PATH'];


const html_dir_files = fs.readdirSync(src_html_dir);

let js_dir_files = fs.readdirSync(src_js_path);

//获取文件名 (不带格式后缀)
function getType(file){
	var filename=file || '';
	var index1=filename.lastIndexOf(".");
	var type=filename.substring(index1,-1);
	return type;
}

js_dir_files = js_dir_files.map((item)=>{
	return getType(item);
})
for (let i=0; i < html_dir_files.length; i++){
	let file_name = getType(html_dir_files[i]);
	let chunks = [file_name];
	if (js_dir_files.includes(file_name)) {
		chunks.push('commons');
	}
	html_plugin.push(
		new htmlWebpackPlugin({
			filename: path.join(dist_html_path, html_dir_files[i]),
			templateParameters: true,
			template: path.join(src_html_dir , html_dir_files[i]),
			chunks : chunks,
			hash:true,
		}),
	)	
}


function plugins_fn () {
	const plugin_arr = [
		new CleanWebpackPlugin(), // 清除dist文件
        new webpack.HotModuleReplacementPlugin(), // HMR
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,       //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
            cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
            canPrint: true,                    //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
       }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
	]
	return [...html_plugin, ...plugin_arr];
}
module.exports = plugins_fn;