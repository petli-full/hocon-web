const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: 'hocon',
        libraryTarget: 'commonjs2',
        libraryExport: 'default',
    },
    module: {
        rules: [
            {
                test: /\.wasm$/,
                exclude: /node_modules/,
                type: 'webassembly/experimental',
            }
        ]
    },
    resolve: {
        fallback: {
            fs: false,
            path: false,
            ws: false,
            child_process: false,
            crypto: false,
        }
    }
};