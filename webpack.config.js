const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');


module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		open:true, //在启动webpack是自动打开浏览器，自动打开链接地址
		proxy:{//跨域代理
		'/api':'http://localhost:3000'
		},
		port:8080,//端口号
		hot:true,
		hotOnly:true,// hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			}
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]

		}]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin({
			// Options...
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'template.html'
		}),//Gernerate default index.html
		new CleanWebpackPlugin() //在打包之前,先清空打包目录
	],
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	}
}