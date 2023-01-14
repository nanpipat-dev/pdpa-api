import { CookiesType } from "../model/model";
import { cookieList } from "../model/cookiesList";
// import chromium from 'chrome-aws-lambda'
import puppeteer, { Browser } from "puppeteer";
import chromium from "chrome-aws-lambda";

export async function getCookieService(url: string): Promise<CookiesType[]> {
  try {
    if (process.env.IS_HEROKU) {
      const browser = await puppeteer.launch({
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

      const responseCookie = await getCoolies(browser, url);
      return responseCookie;
    } else {
      // const browser = await chromium.puppeteer.launch({
      //   args: chromium.args,
      //   defaultViewport: chromium.defaultViewport,
      //   executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
      //   headless: true,
      //   ignoreHTTPSErrors: true,
      // })
      // const responseCookie = await getCoolies(browser, url)
      // return responseCookie
      const browser = await puppeteer.launch({
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

      const responseCookie = await getCoolies(browser, url);
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
  } catch (error) {
    console.log(error, "errrr");
    throw new Error("Invalid url");
  }

  return [];
}

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

async function getCoolies(
  browser: any | any,
  url: string
): Promise<CookiesType[]> {
  const page = await browser.newPage();
  const withHttp = () =>
    url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) =>
      schemma ? match : `https://${nonSchemmaUrl}`
    );

    await page.setRequestInterception(true);

    page.on("request", (req: any) => {
      if (req.resourceType() === "image") {
        req.abort();
      } else {
        req.continue();
      }
    });

  await page.goto(withHttp(), { timeout: 0, waitUntil: 'domcontentloaded' });
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

  const client = await page.target().createCDPSession();
  const cookies = (await client.send("Network.getAllCookies")).cookies;

  console.log(cookies, "cookies");

  const responseCookie: CookiesType[] = [];

  if (cookies) {
    for (var i = 0; i < cookies?.length; i++) {
      const cookietype: CookiesType = {
        domain: cookies[i].domain,
        value: cookies[i].value,
        name: cookies[i].name,
        path: cookies[i].path,
        description: getDescription(cookies[i].name),
        expires: cookies[i].expires,
      };
      await responseCookie.push(cookietype);
    }
  }

  return responseCookie;
}

function getDescription(name: string): string {
  try {
    let resVal: string = "";
    const res = cookieList?.find((x) => name.includes(x.Cookie_Data_Key_name));
    // console.log(res, "nameeeeeeeeesss")
    resVal = res?.Description || "No Description";

    return resVal;
  } catch (error) {
    return "";
  }
}
