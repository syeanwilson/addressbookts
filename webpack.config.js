const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        app: [
            './src/main.ts',
            'babel-polyfill'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env']
                    }
                },
                {
                    loader: 'ts-loader'
                }
                
            ]    
        }]
    }
}