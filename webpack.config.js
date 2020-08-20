// Boiler Plate webpack configuration script
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader:"ts-loader"
            }
        ]
    }
};