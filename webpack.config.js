const path = require('path')

module.exports = {
    entry: './components/WebComponents.tsx',
    output: {
        filename: 'web-components.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {'next/font/google': path.resolve(__dirname, 'mocks/fonts.ts')},
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