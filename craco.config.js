const path = require("path");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  webpack: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@common": path.resolve(__dirname, "src/common/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@dummy": path.resolve(__dirname, "src/dummy/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@validate": path.resolve(__dirname, "src/validate/"),
    },
    configure: {
      entry: "./src/index.jsx",
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "static/js/bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
    },
    plugins: [new AntdDayjsWebpackPlugin()],
  },
};
