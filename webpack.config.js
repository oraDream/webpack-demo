/**
 * CSS Tree Shaking:
 * './src/index.css'中没有被使用的css样式不会被打包, 例如, .item:nth-child(odd)
 * 安装： webpack4下安装purgecss-webpack-plugin
 * 配置步骤如： https://www.npmjs.com/package/purgecss-webpack-plugin
 * 
 */
/**
 * Js Tree Shaking:
 * optimization: {
 *		usedExports: true,// js treeShaking 
 *	}
 * 1、在测试环境中，即使用了treeShaking，也不会把代码直接从打包后的js文件里剔除掉，但是会提示exports uesed
 * 2、在正式环境中，会自动进行
 * 
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, 'src')
}

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath:"http://xiaoludemo.esmartwave.com/Web2019/webpack/"
	},
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',// 只提示哪一行出错不提示列，只针对业务代码不针对loader(第三方模块)生成sourcemap，可以提升打包性能
	optimization: {
		usedExports: true,// js treeShaking
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},

	devServer: {
		contentBase: path.join(__dirname, 'public'),
		open: true, //在启动webpack是自动打开浏览器，自动打开链接地址
		proxy: {//跨域代理
			'/api': 'http://localhost:3000'
		},
		port: 8080,//端口号
		hot: true,
		hotOnly: true,// hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
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
				MiniCssExtractPlugin.loader,
				'css-loader'
			]

		}, { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
		new PurgecssPlugin({
			paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
		}),
		new webpack.HotModuleReplacementPlugin({
			// Options...
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'template.html'
		}),//Gernerate default index.html
		new CleanWebpackPlugin() //在打包之前,先清空打包目录
	]

}