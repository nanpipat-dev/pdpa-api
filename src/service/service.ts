import { CookiesType } from "../model/model";
import { cookieList } from "../model/cookiesList";
// import chromium from 'chrome-aws-lambda'
import puppeteer, { Browser } from "puppeteer";
import chromium from "chrome-aws-lambda";

export async function getCookieService(url: string): Promise<CookiesType[]> {
  let browser = null;
  try {

      browser = await puppeteer.launch({
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

    const responseCookie = await getCoolies(browser, url);
    return responseCookie;

  } catch (error) {
    console.log(error, "errrr");
    throw new Error("Invalid url");
  }finally{
    if (browser) browser.close();
  }
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
 
  const withHttp = () =>
    url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) =>
      schemma ? match : `https://${nonSchemmaUrl}`
    );
    
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on("request", (req: any) => {
      if (req.resourceType() === "image") {
        req.abort();
      } else {
        req.continue();
      }
    });

    console.time("start")

  await page.goto(withHttp(), { waitUntil: 'domcontentloaded' });
  
  

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

  console.timeEnd("start")

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
