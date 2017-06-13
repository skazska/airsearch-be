/**
 * Created by ska on 6/7/17.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: process.env.NODE_ENV === "development"?'[name].css':"[name].[contenthash].css"
});

const uglify = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        drop_console: false,
    },
    test: process.env.NODE_ENV === "development"?/.uglify.me/:/.js($|\?)/i
});

const vendors = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
    }
})


console.log(process.env.NODE_ENV);

var webpackConfig = {
    entry: path.resolve(__dirname, 'public_src/index.js'),
    output: {
        filename: process.env.NODE_ENV === "development"?'[name].js':'[name][chunkhash].js',
        path: path.resolve(__dirname, process.env.NODE_ENV === "development"?'public_dev':'public')
    },
    devtool: process.env.NODE_ENV === "development"?"source-map":false,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV === "development",
                            alias: {
                                "../fonts/bootstrap": "bootstrap-sass/assets/fonts/bootstrap"
                            },
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV === "development",
                            includePaths: [
                                path.resolve("./node_modules/bootstrap-sass/assets")
                            ]
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: process.env.NODE_ENV !== "development",
                        removeComments: process.env.NODE_ENV !== "development",
                        collapseWhitespace: process.env.NODE_ENV !== "development"
                    }
                }],
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                use: [{
                    loader: "file-loader",
                    query: {
//                        useRelativePath: true, //process.env.NODE_ENV === "production"
                        name:process.env.NODE_ENV === "development"?'[name].[ext]':null
                    }
                }]
            },
            { test: /node_modules\/bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery&$=jquery' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            file: 'index.html',
            title: 'Flight Search',
            template: path.resolve(__dirname, 'public_src/index.ejs')
        }),
        extractSass,
        uglify,
        vendors,
        new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' })
    ]
};
module.exports = webpackConfig;
