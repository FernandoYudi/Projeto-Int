const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/api/main.js', 
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],

                test: /\.js$/,
                use: 'babel-loader',
                type: 'javascript/auto',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new HtmlWebpackPlugin({
            template: './pages/detalhes_produto.html',
            filename: 'detalhes_produto.html',
          }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
          },
        port: 8080, 
        open: true, 
        historyApiFallback: true, 
    },
};
