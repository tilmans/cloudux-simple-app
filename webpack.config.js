const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: "inline-source-map",
    mode: "development",
    externals: [
        'avid-drag-data'
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|build)/,
            use: 'babel-loader'
        }]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "index.js",
        libraryTarget: "amd"
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        // new CopyPlugin([
        //         'src/package.json'
        //     ]),
    ],
}
