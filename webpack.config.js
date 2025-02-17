const path = require('path')

module.exports = {
    entry: './components/InputWebComponent.tsx',
    output: {
        filename: 'input-component.js',
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
};