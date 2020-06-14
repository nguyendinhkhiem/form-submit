import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
    filename: "app.css"
});

module.exports = {
    entry: {
        app: [
            "./src/app.js",
            "./statics/app.scss"
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/dist"
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
        contentBase: path.join(__dirname, 'template'),
        compress: true,
        port: 9098,
        host: "192.168.0.100"
    },
    module: {
        rules: [
            {
                // this is so that we can compile any React,
                // ES6 and above into normal ES5 syntax 
                test: /\.(js|jsx)$/,
                // we do not want anything from node_modules to be compiled 
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: extractPlugin.extract({
                    use: ["css-loader"]
                })
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ["css-loader", "sass-loader", "import-glob-loader"]
                })
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                loaders: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'template', 'index.html')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Popper: ["popper.js", "default"]
        }),
        extractPlugin
    ]
};