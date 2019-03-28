const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function loaders(ENV){
	const module_loader = {
		rules: [{
			test: /\.js$/,
			include: [
				path.resolve(__dirname, 'src')
			],
			exclude: /(node_modules|bower_components)/,
			loader: "babel-loader",
		}, { // loader sass and css
			test: /\.(scss|css)$/,
			use: [
				ENV ? 'style-loader' : MiniCssExtractPlugin.loader, {
					loader: 'css-loader',
				}, {
					loader: 'postcss-loader',
				},
				"sass-loader",
			]
		}, {
			test: /\.less$/,
			use: [
				MiniCssExtractPlugin.loader, {
					loader: 'css-loader',
				}, {
					loader: 'postcss-loader',
				},
				"less-loader"
			]
		}, {
			test: /\.(jpg|png|ico|jpeg|gif)$/,
			use: [{
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
					publicPath: "../images/",
					outputPath: "images/"
				}
			}]
		}, {
			test: /\.(eot|svg|ttf|woff)$/,
			use: [{
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
					publicPath: "../fonts/",
					outputPath: "fonts/"
				}
			}]
		}]
	}

	return module_loader;
}

module.exports = loaders;