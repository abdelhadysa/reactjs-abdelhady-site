import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin'
import WorkboxPlugin from 'workbox-webpack-plugin'
import dotenv from 'dotenv'
import { merge } from 'webpack-merge'
import common from './webpack.common.js'

dotenv.config()

export default [merge(common.client, {
        mode: 'production',
        stats: true,
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.min.css'
            }),
            new WorkboxPlugin.GenerateSW(),
        ],
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin(), new CSSMinimizerPlugin()],
        }
    }), common.server
]