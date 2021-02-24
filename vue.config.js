/*
 * @Description: 
 * @Date: 2021-02-18 17:08:21
 * @LastEditTime: 2021-02-24 11:17:22
 */
// const JavaScriptObfuscator = require('webpack-obfuscator');

let config = {
	publicPath: "/",
	outputDir: "dist",
	assetsDir: "static",
	lintOnSave: false,
	runtimeCompiler: false,
	productionSourceMap: false,
	devServer: {
		host: "0.0.0.0",
		port: 8088,
		https: false,
		disableHostCheck: true
	},
	configureWebpack: {
		resolve: {
			alias: {
				'views': '@/views',
				'components': '@/components',
				'tools': '@/tools',
				'api': '@/api',
				'images': '@/assets/images',
				'style': '@/assets/style',
				'request': '@/request',
				'store': '@/store'
			},
		},
		devtool: 'source-map',
		externals: {
			"echarts": "echarts"
		}
	}
};

// if(process.env.NODE_ENV === 'production') {
// 	config.configureWebpack.plugins = [
// 		new JavaScriptObfuscator({
// 			rotateUnicodeArray: true, // 必须为true
// 			disableConsoleOutput: true,  // 通过用空函数替换它们来禁用console
// 			sourceMap: false,
// 			compact: true, // 紧凑 从输出混淆代码中删除换行符。
// 			controlFlowFlattening: false, // 此选项极大地影响了运行速度降低1.5倍的性能。 启用代码控制流展平。控制流扁平化是源代码的结构转换，阻碍了程序理解。
// 			unicodeEscapeSequence: false, // 将所有字符串转换为其unicode表示形式。例如，字符串“Hello World！”将被转换为“'\ x48 \ x65 \ x6c \ x6c \ x6f \ x20 \ x57 \ x6f \ x72 \ x6c \ x64 \ x21”。
// 		})
// 	]
// };

module.exports = config;