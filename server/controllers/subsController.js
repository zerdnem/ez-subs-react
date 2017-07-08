const openSubs = require("../lib/opensubs");
const asyncChainable = require("async-chainable");

const subsController = {};
subsController.handlePost = (req, res, next) => {
  let SUBTITLE = [];
  let title = req.params.title;
  let language = req.params.language;
  asyncChainable()
    .then(next => {
      openSubs.get(language, title).then(data => {
        if (data.data) {
          res.json({ data: data.data });
        }
        if (!data) {
          return next();
        }
        data.forEach(subs => {
          let file_num = subs.file_num;
          let filename = subs.filename;
          let link = subs.link;
          SUBTITLE.push({ file_num, filename, link });
          next();
        });
      });
    })
    .then(next => {
      console.log("Next function");
      next();
    })
    .end(err => {
      if (err) {
        res.status(400).json({ data: SUBTITLE });
      }
      res.json({ data: SUBTITLE });
    });
};

module.exports = subsController;
