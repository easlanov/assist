const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const fs = require("fs");

const MERCHANT_ID = 986142;

const ASSIST_ROOT_PATH = `template/custom/reseller_1/${MERCHANT_ID}`;

const STYLES_PATH = `${ASSIST_ROOT_PATH}/styles/`;

const JS_PATH = `${ASSIST_ROOT_PATH}/scripts/`;

const IMAGES_PATH = `${ASSIST_ROOT_PATH}/img/`;

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const templateData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "src/assets/templatesData.json"))
);

const commonTemplateData = {
  minify: {
    collapseWhitespace: isProd,
  },
};

const assistHtmlWebpackPluginOptions = (templateName) => {
  let data = {};
  const key = templateName;
  if (isProd) {
    data = Object.keys(templateData[key]).reduce((result, current) => {
      result[current] = `<%${current}%>`;
      return result;
    }, {});
  } else {
    data = templateData[key];
  }

  return {
    filename: `${ASSIST_ROOT_PATH}/${templateName}.html`,
    template: `${MERCHANT_ID}/${templateName}.html`,
    templateParameters: {
      ...data,
      ...commonTemplateData,
    },
    inject: false,
  };
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./index.js",
  },
  output: {
    filename: "[name].[hash].js",
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.css$/i,
      }),
    ],
  },
  devServer: {
    port: 4200,
    hot: isDev,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./index.html",
    }),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("1_1")),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("3_1")),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("7_1")),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("25_1")),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("29_1")),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("76_1")),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `src/${MERCHANT_ID}/img`),
          to: path.resolve(__dirname, `dist/${IMAGES_PATH}`),
        },
        {
          from: path.resolve(__dirname, `src/${MERCHANT_ID}/scripts`),
          to: path.resolve(__dirname, `dist/${JS_PATH}`),
        },
        {
          from: path.resolve(__dirname, `src/${MERCHANT_ID}/styles`),
          to: path.resolve(__dirname, `dist/${STYLES_PATH}`),
        },
      ],
    }),
  ],
};
