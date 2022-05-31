import { Request, Response } from "express";
import log from "../logger";
import {getCookieService} from "../service/service"

export async function getCookie(req: Request, res: Response) {
    try {
    
    console.log(req.query.url, "req.query.url")
      const user = await getCookieService(req.query.url as string);
      return res.status(200).send({data:user})
    } catch (e: any) {
      log.error(e);
      return res.status(400).send(e.message);
    }
  }