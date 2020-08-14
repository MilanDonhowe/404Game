// Boiler Plate webpack configuration script
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: '/\.ts$/',
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ],
    },
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "development"
};