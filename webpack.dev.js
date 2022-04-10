const path = require ('path')
const webpack = require ('webpack')
const dotenv = require ('dotenv')
const { merge } = require ('webpack-merge')
const common = require ('./webpack.common.js')

dotenv.config()

module.exports = [merge(common.client, {
        mode: 'development',
        devtool: 'inline-source-map',
        stats: 'detailed',
        devServer: {
            static: path.resolve(__dirname, 'dist'),
            compress: true,
            port: 8080,
            devMiddleware: {
                writeToDisk: true,
            },
        }
    }), common.server
]