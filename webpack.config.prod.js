import path from 'path';
import Webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import config from './webpack.config.base';

config.devtool = 'source-map';

config.module.rules.push({
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        use: [
            'css-loader',
            {
                loader: 'sass-loader', // compiles Sass to CSS
                options: {
                    includePaths: [
                        path.join(__dirname, 'node_modules', 'bulma')
                    ]
                }
            }
        ],
        publicPath: '../dist/css'
    })
});

config.plugins = config.plugins.concat([
    new Webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),

    new Webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compressor: {
            warnings: false
        }
    }),

    new ExtractTextPlugin('dist/css/styles.css')

]);

config.module.rules.forEach((module) => {
    if (module.loader === 'babel-loader') {
        module.options.plugins = [
            // remove all propType checking in production
            ['transform-react-remove-prop-types', { mode: 'remove', removeImport: true }]
        ];
    }
});

export default config;
