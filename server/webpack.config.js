var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "eval-source-map",

  //   entry: [
  //     "webpack-hot-middleware/client?reload=true",
  //     path.join(__dirname, "client/src/index.jsx")
  //   ],

  output: {
    path: path.join(__dirname, "dist/"),
    filename: "main.js",
    publicPath: "/"
  },

  plugins: [
    new HtmlWebpackPlugin({
      //   template: "client/public/index.html",
      template: "views/index.pug",
      inject: "body",
      filename: "index.pug"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel"
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
