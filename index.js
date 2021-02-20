const youtube = require("./youtube");
const header = require("./header");

(async () => {
  process.setMaxListeners(0);
  
  header.headerLists().forEach((h) => {
    console.log("watch using ", h);
    youtube.watch(h);
  });

})();
