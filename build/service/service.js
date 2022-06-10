"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieService = void 0;
// import chromium from 'chrome-aws-lambda'
const puppeteer_1 = __importDefault(require("puppeteer"));
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
function getCookieService(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.IS_HEROKU) {
                const browser = yield puppeteer_1.default.launch({
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                    ]
                });
                const responseCookie = yield getCoolies(browser, url);
                return responseCookie;
                //   const page = await browser.newPage();
                //   // let encoded = encodeURI(url);
                //   const withHttp = () => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);
                //   console.log(url,withHttp(),"url")
                //   await page.goto(withHttp());
                //   // const element = await page.waitForTimeout(5000)
                // const findLinks = await page.evaluate(() =>
                //   Array.from(document.querySelectorAll("a")).map((info) => ({
                //     url: info.href
                //   }))
                // );
                // // const fl: string[] = []
                // // await page.evaluate(() => {
                // //   if(document.querySelectorAll("a")) {
                // //     for(let d =0; (d < document.querySelectorAll("a").length && d < 10); d++){
                // //       console.log(document.querySelectorAll("a")[d])
                // //     }
                // //   }
                // // })
                // console.log(findLinks?.length,"findLinks?.length")
                // for(let j=0; j< 5 && j < findLinks?.length; j++) {
                //   if(findLinks[j]?.url){
                //     console.log(findLinks[j]?.url,"findLinks")
                //     await page.goto(findLinks[j]?.url);
                //     // await page.waitForTimeout(1000)
                //   }
                // }
                //   // const element = await page.waitForTimeout(20000)
                //   const cookies = await page.cookies()
                //   console.log(cookies,"cookies")
                //   const responseCookie: CookiesType[] = []
                //   if (cookies) {
                //       for (var i = 0; i < cookies?.length; i++) {
                //           const cookietype: CookiesType = {
                //               domain: cookies[i].domain,
                //               value: cookies[i].value,
                //               name: cookies[i].name,
                //           }
                //           await responseCookie.push(cookietype)
                //       }
                //   }
                // return responseCookie
            }
            else {
                const browser = yield chrome_aws_lambda_1.default.puppeteer.launch({
                    args: chrome_aws_lambda_1.default.args,
                    defaultViewport: chrome_aws_lambda_1.default.defaultViewport,
                    executablePath: process.env.CHROME_EXECUTABLE_PATH || (yield chrome_aws_lambda_1.default.executablePath),
                    headless: true,
                    ignoreHTTPSErrors: true,
                });
                const responseCookie = yield getCoolies(browser, url);
                return responseCookie;
                //   const page = await browser.newPage();
                //    // let encoded = encodeURI(url);
                //    const withHttp = () => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);
                //    console.log(url,withHttp(),"url")
                //    await page.goto(withHttp());
                //   //  const element = await page.waitForTimeout(5000)
                // //  const findLinks = await page.evaluate(() =>
                // //    Array.from(document.querySelectorAll("a")).map((info) => ({
                // //      url: info.href
                // //    }))
                // //  );
                //  // const fl: string[] = []
                //  // await page.evaluate(() => {
                //  //   if(document.querySelectorAll("a")) {
                //  //     for(let d =0; (d < document.querySelectorAll("a").length && d < 10); d++){
                //  //       console.log(document.querySelectorAll("a")[d])
                //  //     }
                //  //   }
                //  // })
                // //  console.log(findLinks?.length,"findLinks?.length")
                // //  for(let j=0; j< 5 && j < findLinks?.length; j++) {
                // //    if(findLinks[j]?.url){
                // //      console.log(findLinks[j]?.url,"findLinks")
                // //      await page.goto(findLinks[j]?.url);
                // //     //  await page.waitForTimeout(1000)
                // //    }
                // //  }
                //    // const element = await page.waitForTimeout(20000)
                //    const cookies = await page.cookies()
                //    console.log(cookies,"cookies")
                //    const responseCookie: CookiesType[] = []
                //    if (cookies) {
                //        for (var i = 0; i < cookies?.length; i++) {
                //            const cookietype: CookiesType = {
                //                domain: cookies[i].domain,
                //                value: cookies[i].value,
                //                name: cookies[i].name,
                //            }
                //            await responseCookie.push(cookietype)
                //        }
                //    }
                //  return responseCookie
                // }
                //   // const browser = await puppeteer.launch({
                //   //   headless: true,
                //   //   executablePath: '/usr/bin/chromium-browser',
                //   //   args: [
                //   //     "--disable-gpu",
                //   //     "--disable-dev-shm-usage",
                //   //     "--disable-setuid-sandbox",
                //   //     "--no-sandbox",
                //   //   ],
                //   // });
            }
        }
        catch (error) {
            console.log(error, "errrr");
            throw new Error("Invalid url");
        }
    });
}
exports.getCookieService = getCookieService;
function getCoolies(browser, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield browser.newPage();
        const withHttp = () => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);
        console.log(url, withHttp(), "url");
        yield page.goto(withHttp());
        const findLinks = yield page.evaluate(() => {
            console.log(document.querySelectorAll("a"), "href");
            let arr = [];
            if (document.querySelectorAll("a")) {
                for (let i = 0; i < document.querySelectorAll("a").length && i < 5; i++) {
                    console.log(document.querySelectorAll("a")[i].href, "href");
                    arr.push(document.querySelectorAll("a")[i].href);
                }
                return arr;
            }
        });
        console.log(findLinks, "findLinks");
        for (let j = 0; j < 5 && j < findLinks.length; j++) {
            if (findLinks[j]) {
                console.log(findLinks[j], "findLinks");
                yield page.goto(findLinks[j]);
                //  await page.waitForTimeout(1000)
            }
        }
        const client = yield page.target().createCDPSession();
        const cookies = (yield client.send('Network.getAllCookies')).cookies;
        console.log(cookies, "cookies");
        const responseCookie = [];
        if (cookies) {
            for (var i = 0; i < (cookies === null || cookies === void 0 ? void 0 : cookies.length); i++) {
                const cookietype = {
                    domain: cookies[i].domain,
                    value: cookies[i].value,
                    name: cookies[i].name,
                };
                yield responseCookie.push(cookietype);
            }
        }
        return responseCookie;
    });
}
