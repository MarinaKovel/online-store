const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');

const baseConfig = {
    entry: './src/index.ts',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '',
        // assetModuleFilename: 'images/[name][ext]',
    },
    devServer: {
        port: 9000,
        static: path.resolve(__dirname, 'dist'),
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true,
        },
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Demo',
            //template: "src/page-template.hbs",
            template: './src/index.hbs', // шаблон
            filename: 'index.html', // название выходного файла
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: 'ts-loader',
            },
            {
                test: /\.ttf$/,
                type: 'asset/resource',
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp|mp3)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/pics/[contenthash][ext]',
                },
            },
            {
                test: /\.mp3$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/audio/[name][ext]',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.hbs$/,
                use: ['handlebars-loader'],
            },
        ],
    },
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'dev';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
    return merge(baseConfig, envConfig);
};
