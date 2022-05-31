
import {CookiesType} from "../model/model"
import puppeteer from 'puppeteer';

export async function getCookieService(url: string): Promise<CookiesType[]> {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // let encoded = encodeURI(url);
        const withHttp = () => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);

        console.log(url,withHttp(),"url")

        await page.goto(withHttp());


        const element = await page.waitForTimeout(15000)

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
    } catch (error) {
        console.log(error,"errrr")
      throw new Error("Invalid url");
    }
  }