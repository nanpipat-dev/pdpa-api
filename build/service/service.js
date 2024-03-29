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
const cookiesList_1 = require("../model/cookiesList");
// import chromium from 'chrome-aws-lambda'
const puppeteer_1 = __importDefault(require("puppeteer"));
function getCookieService(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let browser = null;
        try {
            browser = yield puppeteer_1.default.launch({
                // executablePath: "/usr/bin/chromium-browser",
                headless: false,
                args: [
                    '--headless',
                    '--hide-scrollbars',
                    '--mute-audio',
                    '--no-sandbox',
                    '--disable-dev-shm-usage', // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
                ],
            });
            const responseCookie = yield getCoolies(browser, url);
            return responseCookie;
        }
        catch (error) {
            console.log(error, "errrr");
            throw new Error("Invalid url");
        }
        finally {
            if (browser)
                browser.close();
        }
    });
}
exports.getCookieService = getCookieService;
// async function getCoolies(browser: Browser | any, url: string): Promise<CookiesType[]> {
//   const page = await browser.newPage();
//   const withHttp = () => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);
//   console.log(url, withHttp(), "url")
//   await page.goto(withHttp());
//   const findLinks = await page.evaluate(() => {
//     console.log(document.querySelectorAll("a"), "href")
//     let arr = []
//     if (document.querySelectorAll("a")) {
//       for (let i = 0; i < document.querySelectorAll("a").length && i < 5; i++) {
//         console.log(document.querySelectorAll("a")[i].href, "href")
//         arr.push(document.querySelectorAll("a")[i].href)
//       }
//       return arr
//     }
//   })
//   console.log(findLinks, "findLinks")
//   for (let j = 0; j < 5 && j < (findLinks as string[]).length; j++) {
//     if ((findLinks as string[])[j]) {
//       console.log((findLinks as string[])[j], "findLinks")
//       await page.goto((findLinks as string[])[j]);
//       //  await page.waitForTimeout(1000)
//     }
//   }
//   const client = await page.target().createCDPSession();
//   const cookies = (await client.send('Network.getAllCookies')).cookies;
//   console.log(cookies, "cookies")
//   const responseCookie: CookiesType[] = []
//   if (cookies) {
//     for (var i = 0; i < cookies?.length; i++) {
//       const cookietype: CookiesType = {
//         domain: cookies[i].domain,
//         value: cookies[i].value,
//         name: cookies[i].name,
//       }
//       await responseCookie.push(cookietype)
//     }
//   }
//   return responseCookie
// }
function getCoolies(browser, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const withHttp = () => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);
        const page = yield browser.newPage();
        yield page.setRequestInterception(true);
        page.on("request", (req) => {
            if (req.resourceType() === "image") {
                req.abort();
            }
            else {
                req.continue();
            }
        });
        console.time("start");
        yield page.goto(withHttp(), { waitUntil: 'domcontentloaded' });
        const client = yield page.target().createCDPSession();
        const cookies = (yield client.send("Network.getAllCookies")).cookies;
        console.log(cookies, "cookies");
        const responseCookie = [];
        if (cookies) {
            for (var i = 0; i < (cookies === null || cookies === void 0 ? void 0 : cookies.length); i++) {
                const cookietype = {
                    domain: cookies[i].domain,
                    value: cookies[i].value,
                    name: cookies[i].name,
                    path: cookies[i].path,
                    description: getDescription(cookies[i].name),
                    expires: cookies[i].expires,
                };
                yield responseCookie.push(cookietype);
            }
        }
        console.timeEnd("start");
        return responseCookie;
    });
}
function getDescription(name) {
    try {
        let resVal = "";
        const res = cookiesList_1.cookieList === null || cookiesList_1.cookieList === void 0 ? void 0 : cookiesList_1.cookieList.find((x) => name.includes(x.Cookie_Data_Key_name));
        // console.log(res, "nameeeeeeeeesss")
        resVal = (res === null || res === void 0 ? void 0 : res.Description) || "No Description";
        return resVal;
    }
    catch (error) {
        return "";
    }
}
