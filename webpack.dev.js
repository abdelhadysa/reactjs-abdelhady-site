/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
require('dotenv').config({ path: './.env' }); 

const clientConfig = {
    entry: path.resolve(__dirname, 'src/client/index.js'),
    output: {
        libraryTarget: 'var',
        library: 'Client',
        filename: 'js/bundle.js',
    },
    resolve: {
        alias: {
            Resources: path.resolve(__dirname, 'src/client/resources'),
            Components: path.resolve(__dirname, 'src/client/components'),
            Styles: path.resolve(__dirname, 'src/client/styles'),
            Views: path.resolve(__dirname, 'src/client/views'),
            Client: path.resolve(__dirname, 'src/client'),
        }
    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'info',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: 
                {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                include: path.resolve(__dirname, 'src'),
                use: 
                {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[folder]/[name].[ext]',
                    },
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/client/views/index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectedWebpackAssets: false,
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/client/static'), to: path.join(__dirname, 'dist/static')}
            ]
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        devMiddleware: {
            writeToDisk: true
        },
    }
}

const serverConfig = {
    entry: './src/server/index.js',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                include: path.resolve(__dirname, 'src'),
                use: 
                {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[folder]/[name].[ext]',
                    },
                },
            },
        ],
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
        __dirname: false,
    },
    resolve: {
        alias: {
            Resources: path.resolve(__dirname, 'src/client/resources'),
            Components: path.resolve(__dirname, 'src/client/components'),
            Styles: path.resolve(__dirname, 'src/client/styles'),
            Views: path.resolve(__dirname, 'src/client/views'),
            Client: path.resolve(__dirname, 'src/client'),
        }
    },
}

module.exports = [clientConfig, serverConfig]