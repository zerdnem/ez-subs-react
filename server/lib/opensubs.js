const openSubtitles = require("subtitler");
const Q = require("q");

module.exports = {
  get: (subtitle_language, subtitle) => {
    let subs = [];
    let count = 0;
    let deferred = Q.defer();
    openSubtitles.api.login().done(token => {
      openSubtitles.api
        .searchForTitle(token, subtitle_language, subtitle)
        .done(results => {
          if (typeof results[0] != "undefined") {
            results.forEach(subtitles => {
              if (count < 5) {
                count++;
                let file_num = count;
                let filename = subtitles.SubFileName;
                let link = subtitles.SubDownloadLink.split(".gz").join(".srt");
                subs.push({ file_num, filename, link });
                deferred.resolve(subs);
              }
            });
          } else {
            deferred.resolve({ data: "No data" });
          }
        });
    });
    return deferred.promise;
  }
};
