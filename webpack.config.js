const path = require('path')

module.exports = {
    entry: './components/WebComponents.tsx',
    output: {
        filename: 'web-components.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {"allowTsInNodeModules": true}
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
            },
        ],
    },
    optimization: {
        minimize: false
    }
};