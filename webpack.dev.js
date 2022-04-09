import path, { dirname } from 'path'
import webpack from 'webpack'
import dotenv from 'dotenv'
import { merge } from 'webpack-merge'
import common from './webpack.common.js'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config()

export default [merge(common.client, {
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