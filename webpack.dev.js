const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',

    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app')
    },

    devServer: {
        before: function(app, server) {
            server._watch('./app/**/*.html')
        },

        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'

        // For using webpack sync on smartphone:
        // 1. run "npm run dev"
        // 2. localhost:3000 on laptop
        // 3. Find your ip adress in system Preferences > network (192.168.x.x)
        // 4. add url "ip adresss:3000" on smartphone browser
    },

    plugins:[
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
    ],

    module: {
        rules: [
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: [ 
                    'style-loader',
                    'css-loader?url=false',   
                    {
                        loader: 'group-css-media-queries-loader'
                    },
                    'sass-loader'
                ],
            }
            
        ]
    },
}