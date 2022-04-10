const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const dotenv = require('dotenv')

dotenv.config()

const client = {
    name: 'client',
    entry: path.resolve(__dirname, 'src/client/index.js'),
    output: {
        filename: 'client.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: {
            keep: /uploads\//,
        },
    },
    resolve: {
        alias: {
            Resources: path.resolve(__dirname, 'src/client/resources'),
            Components: path.resolve(__dirname, 'src/client/components'),
            Styles: path.resolve(__dirname, 'src/client/styles'),
            Client: path.resolve(__dirname, 'src/client'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '/img/[folder]/[name].[ext]',
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/client/index.html'),
            filename: 'index.html',
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/client/resources/locales'), to: path.resolve(__dirname, 'dist', 'locales') },
                { from: path.resolve(__dirname, 'src/client/resources/manifest.json'), to: path.resolve(__dirname, 'dist') }
            ]
        }),
    ]
}

const server = {
    name: 'server',
    dependencies: ['client'],
    entry: path.resolve(__dirname, 'src/server/index.js'),
    output: {
        filename: 'server.bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '/img/[folder]/[name].[ext]',
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
            Client: path.resolve(__dirname, 'src/client'),
            Database: path.resolve(__dirname, 'src/db'),
        },
    },
}

module.exports = { client, server }