const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const fs = require("fs");

const MERCHANT_ID = 986142;

const STYLES_PATH = `/template/custom/reseller_1/${MERCHANT_ID}/styles/`;
const STYLES_PATH_MOBILE = `/template/custom/reseller_1/${MERCHANT_ID}/mobile/styles/`;

const JS_PATH = `/template/custom/reseller_1/${MERCHANT_ID}/scripts/`;
const JS_PATH_MOBILE = `/template/custom/reseller_1/${MERCHANT_ID}/mobile/scripts/`;

const IMAGES_PATH = `/template/custom/reseller_1/${MERCHANT_ID}/img/`;
const IMAGES_PATH_MOBILE = `/template/custom/reseller_1/${MERCHANT_ID}/mobile/img/`;

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

const assistHtmlWebpackPluginOptions = (templateName, isMobile = false) => {
  let data = {};
  const key = isMobile ? `mobile_${templateName}` : templateName;
  if (isProd) {
    data = Object.keys(templateData[key]).reduce((result, current) => {
      result[current] = `<%${current}%>`;
      return result;
    }, {});
  } else {
    data = templateData[key];
  }

  return {
    filename: isMobile
      ? `${MERCHANT_ID}/mobile/${templateName}.html`
      : `${MERCHANT_ID}/${templateName}.html`,
    template: isMobile
      ? `${MERCHANT_ID}/mobile/${templateName}.html`
      : `${MERCHANT_ID}/${templateName}.html`,
    templateParameters: {
      ...data,
      ...commonTemplateData,
    },
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
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("1_1", true)),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("1_2", true)),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("2_1", true)),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("2_2", true)),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("3_1", true)),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("3_2", true)),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("25_1", true)),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("25_2", true)),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("29_1", true)),
    new HTMLWebpackPlugin(assistHtmlWebpackPluginOptions("29_2", true)),
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
          from: path.resolve(__dirname, `src/${MERCHANT_ID}/mobile/img`),
          to: path.resolve(__dirname, `dist/${IMAGES_PATH_MOBILE}`),
        },
        {
          from: path.resolve(__dirname, `src/${MERCHANT_ID}/styles`),
          to: path.resolve(__dirname, `dist/${STYLES_PATH}`),
        },
        {
          from: path.resolve(__dirname, `src/${MERCHANT_ID}/mobile/scripts`),
          to: path.resolve(__dirname, `dist/${JS_PATH_MOBILE}`),
        },
        {
          from: path.resolve(__dirname, `src/${MERCHANT_ID}/mobile/styles`),
          to: path.resolve(__dirname, `dist/${STYLES_PATH_MOBILE}`),
        },
      ],
    }),
  ],
};
