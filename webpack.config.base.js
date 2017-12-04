import path from 'path';
import Webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    context: __dirname,

    entry: './src/index.jsx',

    output: {
        path: __dirname,
        filename: 'dist/js/[name].js',
        sourceMapFilename: 'dist/js/[name].js.map'
    },

    node: {
        fs: 'empty'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/,
                loader: 'file-loader?name=dist/images/[name].[ext]'
            },
            {
                test: /\.woff$/,
                loader: 'url-loader?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2$/,
                loader: 'url-loader?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
            },
            {
                test: /\.ttf$/,
                loader: 'url-loader?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot$/,
                loader: 'file-loader?name=dist/fonts/[name].[ext]'
            },
            {
                test: /\.otf$/,
                loader: 'file-loader?name=dist/fonts/[name].[ext]&mimetype=application/font-otf'
            },
            {
                test: /\.svg$/,
                loader: 'url-loader?name=dist/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.csv(\?.*)?$/,
                loader: 'file-loader?name=dist/files/[name].[ext]'
            }
        ]
    },

    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new Webpack.optimize.CommonsChunkPlugin('common'),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
