
import {CookiesType} from "../model/model"
// import chromium from 'chrome-aws-lambda'
import puppeteer, { Browser } from 'puppeteer';
import chromium from 'chrome-aws-lambda'

export async function getCookieService(url: string): Promise<CookiesType[]> {
    try {
      if(process.env.IS_HEROKU) {
        const browser = await puppeteer.launch({
          args:[
            '--no-sandbox',
            '--disable-setuid-sandbox',
          ]
        })

        const page = await browser.newPage();

        // let encoded = encodeURI(url);
        const withHttp = () => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);

        console.log(url,withHttp(),"url")

        await page.goto(withHttp());

        // const element = await page.waitForTimeout(5000)

      const findLinks = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a")).map((info) => ({
          url: info.href
        }))
      );

      // const fl: string[] = []
      // await page.evaluate(() => {
      //   if(document.querySelectorAll("a")) {
      //     for(let d =0; (d < document.querySelectorAll("a").length && d < 10); d++){
      //       console.log(document.querySelectorAll("a")[d])
      //     }
      //   }
      // })

      console.log(findLinks?.length,"findLinks?.length")

      for(let j=0; j< 5 && j < findLinks?.length; j++) {
        if(findLinks[j]?.url){
          console.log(findLinks[j]?.url,"findLinks")
          await page.goto(findLinks[j]?.url);
          // await page.waitForTimeout(1000)
        }
      }


        // const element = await page.waitForTimeout(20000)

        const cookies = await page.cookies()

        console.log(cookies,"cookies")

        const responseCookie: CookiesType[] = []

        if (cookies) {

            for (var i = 0; i < cookies?.length; i++) {
                const cookietype: CookiesType = {
                    domain: cookies[i].domain,
                    value: cookies[i].value,
                    name: cookies[i].name,
                }
                await responseCookie.push(cookietype)
            }

        }

      return responseCookie
      } else {
        const browser = await chromium.puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
          headless: true,
          ignoreHTTPSErrors: true,
        })
        const page = await browser.newPage();

         // let encoded = encodeURI(url);
         const withHttp = () => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);

         console.log(url,withHttp(),"url")
 
         await page.goto(withHttp());
 
        //  const element = await page.waitForTimeout(5000)
 
      //  const findLinks = await page.evaluate(() =>
      //    Array.from(document.querySelectorAll("a")).map((info) => ({
      //      url: info.href
      //    }))
      //  );
 
       // const fl: string[] = []
       // await page.evaluate(() => {
       //   if(document.querySelectorAll("a")) {
       //     for(let d =0; (d < document.querySelectorAll("a").length && d < 10); d++){
       //       console.log(document.querySelectorAll("a")[d])
       //     }
       //   }
       // })
 
      //  console.log(findLinks?.length,"findLinks?.length")
 
      //  for(let j=0; j< 5 && j < findLinks?.length; j++) {
      //    if(findLinks[j]?.url){
      //      console.log(findLinks[j]?.url,"findLinks")
      //      await page.goto(findLinks[j]?.url);
      //     //  await page.waitForTimeout(1000)
      //    }
      //  }
 
 
         // const element = await page.waitForTimeout(20000)
 
         const cookies = await page.cookies()
 
         console.log(cookies,"cookies")
 
         const responseCookie: CookiesType[] = []
 
         if (cookies) {
 
             for (var i = 0; i < cookies?.length; i++) {
                 const cookietype: CookiesType = {
                     domain: cookies[i].domain,
                     value: cookies[i].value,
                     name: cookies[i].name,
                 }
                 await responseCookie.push(cookietype)
             }
 
         }
 
       return responseCookie
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
        console.log(error,"errrr")
      throw new Error("Invalid url");
    }

    return []
  }
