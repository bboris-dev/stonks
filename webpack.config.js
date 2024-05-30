const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        bundle: ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: isProduction ? '[name].[contenthash].js' : '[name].js',
        chunkFilename: '[id].js',
        assetModuleFilename: "media/[hash][ext][query]",
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.js', '.jsx'],
        alias: {
            '@assets': path.join(__dirname, 'src', 'assets'),
            '@components': path.join(__dirname, 'src', 'components'),
            '@containers': path.join(__dirname, 'src', 'containers'),
            '@layouts': path.join(__dirname, 'src', 'layouts'),
            '@helpers': path.join(__dirname, 'src', 'helpers'),
            '@lib': path.join(__dirname, 'src', 'lib'),
            '@styles': path.join(__dirname, 'src', 'styles'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/react', '@babel/env']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    ...(isProduction ? [MiniCssExtractPlugin.loader] : ['style-loader']),
                    'css-loader',
                ],
            },
            {
                test: /\.svg$/,
                exclude: [path.join(__dirname, 'node_modules')],
                oneOf: [
                    {
                        resourceQuery: /jsx/,
                        use: ['@svgr/webpack'],
                    },
                    {type: 'asset/inline'},
                ],
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.pdf$|\.png$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.webp$|\.mp4$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Boris Stonks',
            template: './src/public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name].[contenthash].css' : '[name].css',
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        port: 3000,
        hot: true,

    },
    mode: isProduction ? 'production' : 'development',
};