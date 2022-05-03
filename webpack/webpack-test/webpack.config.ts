import * as webpack from 'webpack';

const config: webpack.Configuration = {
    entry: {
        foo: './src/foo.js',
        bar: './src/bar.js',
    },
    plugins: [
    ],
    output: {
        filename: '[name].[chunkhash].js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            exclude: /node_modules/,
        }]
    },
    optimization: {
        splitChunks: {

        }
    }
};

export default config;