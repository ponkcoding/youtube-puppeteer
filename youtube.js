const puppeteer = require("puppeteer");

module.exports = {
  watch: async (header) => {
    let launchOptions = {
      executablePath:
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      headless: true,
      defaultViewport: null,
      devtools: false,
      //args: ['--window-size=1920,1170','--window-position=0,0']
      args: ["--window-size=1920,1080", "--window-position=1921,0"],
    };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // set viewport and user agent (just in case for nice viewing)
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent(header);
    // await page.setExtraHTTPHeaders({ referer: 'http://www.ponkcoding.com/2021/02/tutorial-bikin-web-live-count-fiki.html' });
    // await page.setExtraHTTPHeaders({
    //   referer:
    //     "http://www.ponkcoding.com/2021/02/review-monitor-dell-ultrasharp-u2719d.html",
    // });

    // watch
    await page.goto("https://www.youtube.com/watch?v=T5200AmCYxo", {waitUntil: 'load', timeout: 0});

    await delay(4000);

    // play video
    await page.keyboard.press(" ");

    const intv = setInterval(() => {
      console.log("capturing from " + header);
      page.screenshot({    
        path:
          "capture/" +
          header.replace(/[^a-z0-9]/gi, "_").toLowerCase() +
          ".png",
      });
    }, 5000);

    // 47 min
    await delay(2820000);

    clearInterval(intv);

    // close the browser
    await browser.close();
  },
};

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
