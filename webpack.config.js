const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		bundle: './app/main.js',
		vendors: './app/vendors.js',
		'routes-en': './app/jlg-route/en/jlg-route.module.js',
		'routes-fr': './app/jlg-route/fr/jlg-route.module.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './app/wpk')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
			}]
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader?minimize&sourceMap'
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader?minimize&sourceMap!sass-loader?sourceMap'
			})
		}, {
			test: /\.html$/,
			use: [{
				loader: 'html-loader',
				options: {
					minimize: true,
					attrs: ['img:src', 'jlg-parallax:src']
				}
			}],
		}, {
			test: /\.jpg$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					publicPath: '../wpk/'
				}
			}]
		}, {
			test: /\.png$/,
			use: ['url-loader?mimetype=image/png']
		}, {
			test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					name: '[name].[ext]',
					// publicPath: './wpk/',
					limit: 10000,
					mimetype: 'application/font-woff'
				}
			}]
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					name: '[name].[ext]',
					// publicPath: './wpk/',
					limit: 10000,
					mimetype: 'application/octet-stream'
				}
			}]
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					publicPath: './wpk/'
				}
			}]
		}, {
			test: /(fontawesome-webfont|glyphicons-halflings-regular)\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					name: '[name].[ext]',
					// publicPath: './wpk/',
					limit: 10000,
					mimetype: 'image/svg+xml'
				}
			}]
		}]
	},
	devtool: 'source-map',
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new webpack.ProvidePlugin({
			'THREE': 'three'
		}),
		new webpack.optimize.CommonsChunkPlugin('vendors'),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
		}),
	]
};
