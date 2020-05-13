/**
 * splitChunksPlugin:代码分割
 * 1、配置optimizaiton
 * 2、同步代码需要配置：
 * optimization:{
 * splitChunks:{
 *  chunks:'all'
 *}
 * 3、异步代码不需要配置optimation,
 * 之前的动态引入模块插件是非官方的，不支持这种语法，需要更换插件：（现在不需要了）
 * 动态引入语法需安装 npm install babel-plugin-dynamic-import-webpack --save-dev
 * .bebelrc 添加配置："plugins": ["dynamic-import-webpack"]
 * */ 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',// 只提示哪一行出错不提示列，只针对业务代码不针对loader(第三方模块)生成sourcemap，可以提升打包性能
	optimization:{
		splitChunks: {
			chunks: "all",// // async 只对异步代码生效， all同步异步都生效， initial对同步生效，默认是async
			minSize: 30000,// 体积大于30KB的模块才会代码分割
			minChunks: 1,// 当一个模块至少被引用了几次后才做代码分割
			maxAsyncRequests: 5,// 最多分割几个js文件，超出后后面的不会再进行分割
			maxInitialRequests: 3,// 入口文件引入的库最多能分割成几个包
			automaticNameDelimiter: '~', // 生成文件名字中间的连接符
			name: true,// // 使cacheGroups中设置的文件名有效
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/, // 类库是从node_modules中引入的话就进行代码分割
					priority: -10, // 优先级，同时满足vendors和default，使用优先级高的
					filename: 'vendors.js', // 重命名分割文件
				},
			default: {
				  // 没有设置test参数，所有的都符合
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true // 如果引入的模块已经被打包，复用，不再打包
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
		}, { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
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
	]

}