const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const asyncChainable = require("async-chainable");
const subsController = require("./controllers/subsController.js");
const cors = require("cors");

import chalk from "chalk";

import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "./webpack.config.js";

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: "src",
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

(async function() {
  const app = express();
  app.use(bodyParser.json());
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");
  app.use(express.static("public"));
  app.use(cors());
  app.post("/api/:title/:language", subsController.handlePost);
  const isDeveloping = process.env.NODE_ENV !== "production";
  console.log(isDeveloping);
  if (isDeveloping) {
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get("*", function response(req, res) {
      res.write(
        middleware.fileSystem.readFileSync(
          path.join(__dirname, "../dist/index.html")
        )
      );
      res.end();
    });
  } else {
    app.use(compression());
    app.use(express.static(path.join(__dirname, "../dist")));
    app.get("*", function response(req, res) {
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    });
  }
  const port = 8000;
  app.listen(port, () => console.log(`Running on port ${port}`));
})();
