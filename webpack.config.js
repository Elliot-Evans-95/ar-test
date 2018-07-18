const path = require('path');

module.exports = {
    entry: [
        './src/Main.js'
    ],
    output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' },
    cache: false,
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src')
                ],
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
