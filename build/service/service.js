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
        try {
            if (process.env.IS_HEROKU) {
                const browser = yield puppeteer_1.default.launch({
                    // headless: true,
                    args: [
                        "--autoplay-policy=user-gesture-required",
                        "--disable-background-networking",
                        "--disable-background-timer-throttling",
                        "--disable-backgrounding-occluded-windows",
                        "--disable-breakpad",
                        "--disable-client-side-phishing-detection",
                        "--disable-component-update",
                        "--disable-default-apps",
                        "--disable-dev-shm-usage",
                        "--disable-domain-reliability",
                        "--disable-extensions",
                        "--disable-features=AudioServiceOutOfProcess",
                        "--disable-hang-monitor",
                        "--disable-ipc-flooding-protection",
                        "--disable-notifications",
                        "--disable-offer-store-unmasked-wallet-cards",
                        "--disable-popup-blocking",
                        "--disable-print-preview",
                        "--disable-prompt-on-repost",
                        "--disable-renderer-backgrounding",
                        "--disable-setuid-sandbox",
                        "--disable-speech-api",
                        "--disable-sync",
                        "--hide-scrollbars",
                        "--ignore-gpu-blacklist",
                        "--metrics-recording-only",
                        "--mute-audio",
                        "--no-default-browser-check",
                        "--no-first-run",
                        "--no-pings",
                        "--no-sandbox",
                        "--no-zygote",
                        "--password-store=basic",
                        "--use-gl=swiftshader",
                        "--use-mock-keychain",
                    ],
                });
                const responseCookie = yield getCoolies(browser, url);
                return responseCookie;
            }
            else {
                // const browser = await chromium.puppeteer.launch({
                //   args: chromium.args,
                //   defaultViewport: chromium.defaultViewport,
                //   executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
                //   headless: true,
                //   ignoreHTTPSErrors: true,
                // })
                // const responseCookie = await getCoolies(browser, url)
                // return responseCookie
                const browser = yield puppeteer_1.default.launch({
                    // headless: true,
                    args: [
                        "--autoplay-policy=user-gesture-required",
                        "--disable-background-networking",
                        "--disable-background-timer-throttling",
                        "--disable-backgrounding-occluded-windows",
                        "--disable-breakpad",
                        "--disable-client-side-phishing-detection",
                        "--disable-component-update",
                        "--disable-default-apps",
                        "--disable-dev-shm-usage",
                        "--disable-domain-reliability",
                        "--disable-extensions",
                        "--disable-features=AudioServiceOutOfProcess",
                        "--disable-hang-monitor",
                        "--disable-ipc-flooding-protection",
                        "--disable-notifications",
                        "--disable-offer-store-unmasked-wallet-cards",
                        "--disable-popup-blocking",
                        "--disable-print-preview",
                        "--disable-prompt-on-repost",
                        "--disable-renderer-backgrounding",
                        "--disable-setuid-sandbox",
                        "--disable-speech-api",
                        "--disable-sync",
                        "--hide-scrollbars",
                        "--ignore-gpu-blacklist",
                        "--metrics-recording-only",
                        "--mute-audio",
                        "--no-default-browser-check",
                        "--no-first-run",
                        "--no-pings",
                        "--no-sandbox",
                        "--no-zygote",
                        "--password-store=basic",
                        "--use-gl=swiftshader",
                        "--use-mock-keychain",
                    ],
                });
                const responseCookie = yield getCoolies(browser, url);
                return responseCookie;
            }
            // const browser = await puppeteer.launch({
            //   headless: true,
            //   executablePath: '/usr/bin/chromium-browser',
            //   args: [
            //     "--disable-gpu",
            //     "--disable-dev-shm-usage",
            //     "--disable-setuid-sandbox",
            //     "--no-sandbox",
            //   ],
            // });
        }
        catch (error) {
            console.log(error, "errrr");
            throw new Error("Invalid url");
        }
        return [];
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
        const page = yield browser.newPage();
        const withHttp = () => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);
        yield page.setRequestInterception(true);
        page.on("request", (req) => {
            if (req.resourceType() === "image") {
                req.abort();
            }
            else {
                req.continue();
            }
        });
        yield page.goto(withHttp(), { timeout: 0, waitUntil: 'domcontentloaded' });
        // await page.waitForTimeout(3000);
        // const findLinks = await page.evaluate(() => {
        //   console.log(document.querySelectorAll("a"), "href")
        //   let arr = []
        //   if (document.querySelectorAll("a")) {
        //     for (let i = 0; i < document.querySelectorAll("a").length && i < 5; i++) {
        //       console.log(document.querySelectorAll("a")[i].href, "href")
        //       arr.push(document.querySelectorAll("a")[i].href)
        //     }
        //     return arr
        //   }
        // })
        // console.log(findLinks, "findLinks")
        // for (let j = 0; j < 5 && j < (findLinks as string[]).length; j++) {
        //   if ((findLinks as string[])[j]) {
        //     console.log((findLinks as string[])[j], "findLinks")
        //     await page.goto((findLinks as string[])[j]);
        //     //  await page.waitForTimeout(1000)
        //   }
        // }
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
