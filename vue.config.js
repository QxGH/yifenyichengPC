/*
 * @Description: 
 * @Date: 2021-02-18 17:08:21
 * @LastEditTime: 2021-02-24 11:17:22
 */

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

module.exports = config;