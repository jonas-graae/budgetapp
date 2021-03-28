const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production', // set to production to minify everything
    entry: './app/assets/scripts/App.js',
    stats: {
        children: true
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[name][ext]'
    },

    plugins:[
        new MiniCssExtractPlugin({
            filename: './css/[name].[contenthash].css'
        }),

        new HtmlWebpackPlugin({
            template: './app/index.html',
            filename: 'index.html',
            inject: true,
            minify: {
                collapseWhitespace: false, //set true to minify and save space
                removeComments: true //set true to remove comments and save space           
            }
        }),

        new HtmlWebpackInlineSVGPlugin({
            img: path.resolve(__dirname, 'app/assets/images'),
            inlineAll: true,
            svgoConfig: [
                {
                    removeXMLNS: true
                },
                {
                    cleanupIDs: true,
                }    
            ]
        }),

        new CleanWebpackPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"
                        },
                    },
                    'css-loader',
                    'group-css-media-queries-loader',
                    'sass-loader'
                ]    
            },
            {
                test: /\.html$/i,
                use: ['html-loader']
            },
            {
                test: /\.svg$/i,
                type: "asset/inline"
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource"
            }
        ]
    },

    resolve: {
        extensions: [".js", ".jsx"]
    }
}
            