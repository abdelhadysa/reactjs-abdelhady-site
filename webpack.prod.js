const path = require ('path')
const webpack = require ('webpack')
const MiniCssExtractPlugin = require ('mini-css-extract-plugin')
const TerserPlugin = require ('terser-webpack-plugin')
const CSSMinimizerPlugin = require ('css-minimizer-webpack-plugin')
const WorkboxPlugin = require ('workbox-webpack-plugin')
const dotenv = require ('dotenv')
const { merge } = require ('webpack-merge')
const common = require ('./webpack.common.js')

dotenv.config()

module.exports = [merge(common.client, {
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