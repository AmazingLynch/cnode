var path = require('path')
var webpack = require('webpack');
var OpenBrowserPlugin = require('html-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'./public/'),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','react']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000
                    }
                }
            },
            {
                test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.temp.html',
            filename: './index.html'
        }),
        new OpenBrowserPlugin({
            url: 'http:localhost:8080'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: "#eval-source-map",
    devServer: {
        inline: true,
        noInfo: true,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api/*': {
                target: 'https://cnodejs.org',
                changeOrigin: true,
                secure: false
            }
        }
    }
}