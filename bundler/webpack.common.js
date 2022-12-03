const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';
module.exports = {
	entry: path.resolve(__dirname, '../src/index.ts'),
	output: {
		hashFunction: 'xxhash64',
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, '../dist'),
	},
	devtool: 'inline-source-map',
	plugins: [
		
		new CopyWebpackPlugin({
			patterns: [{ from: path.resolve(__dirname, '../public') }],
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html'),
			minify: true,
		}),
		new MiniCSSExtractPlugin(),
	],
	resolve: {
		modules: [path.resolve(__dirname, '../src'), 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
	},
	module: {
		rules: [
			// HTML
			{
				test: /\.(html)$/,
				use: ['html-loader'],
			},
			{
				test: /\.module\.s(a|c)ss$/,
				use: [
					isDevelopment ? 'style-loader' : MiniCSSExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: isDevelopment,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDevelopment,
						},
					},
				],
			},
			{
				test: /\.s(a|c)ss$/,
				exclude: /\.module.(s(a|c)ss)$/,
				use: [
					isDevelopment ? 'style-loader' : MiniCSSExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDevelopment,
						},
					},
				],
			},
			//TS
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},

			// Images
			{
				test: /\.(jpg|png|gif|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[hash][ext]',
				},
			},

			// Fonts
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[hash][ext]',
				},
			},

			// Shaders
			{
				test: /\.(glsl|vs|fs|vert|frag)$/,
				type: 'asset/source',
				generator: {
					filename: 'assets/images/[hash][ext]',
				},
			},
		],
	},
};
