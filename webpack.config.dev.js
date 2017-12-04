import path from 'path';
import Webpack from 'webpack';
import Visualizer from 'webpack-visualizer-plugin';

import config from './webpack.config.base';

config.devtool = 'cheap-eval-source-map';

config.output.publicPath = 'http://0.0.0.0:3000/';

config.module.rules.push({
    test: /\.scss$/,
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
                includePaths: [
                    path.join(__dirname, 'node_modules', 'bulma')
                ],
                sourceMap: true
            }
        }
    ]
});

config.plugins = config.plugins.concat([
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Visualizer()
]);

config.devServer = {
    hot: true,
    host: 'localhost',
    port: 3000,
    inline: true,
    publicPath: config.output.publicPath,
    stats: 'minimal',
    headers: { 'Access-Control-Allow-Origin': '*' }
};

export default config;
