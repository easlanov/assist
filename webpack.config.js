const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const MERCHANT_ID = 986142;

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./index.js",
  },
  output: {
    filename: "[name].[hash].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: `${MERCHANT_ID}/1_1.html`,
      template: `${MERCHANT_ID}/1_1.html`,
      templateParameters: {
        TITLE: "TITLE 1234",
        ORDERNUMBER: "sdsd",
        scripts: "sdsd",
        MERCHANTNAME: "sdsd",
        ordernumber: "fdf",
        AMOUNTORG: "AMOUNTORG",
        CURRENCYORG: "CURRENCYORG",
        TData: "TData",
      },
    }),
  ],
};
