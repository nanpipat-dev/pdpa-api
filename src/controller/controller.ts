import { Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb"
import log from "../logger";
import {getCookieService} from "../service/service"
import { CompanyRequest } from "../model/model";

const uri = process.env.MONGOURL || "mongodb+srv://admin:1234@conkies.i0g3ymq.mongodb.net/?retryWrites=true&w=majority";

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

  export async function saveCompany(req: Request, res: Response) {
    try {
      const company: CompanyRequest = req?.body;
      const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
      await client.connect();
      let getforCheck = await client.db('conkies_db').collection<CompanyRequest>('companies').findOne({ companyName: company.companyName })
      if (getforCheck) {
          await client.db('conkies_db').collection<CompanyRequest>('companies').updateOne({ _id: getforCheck._id },{$set : company})
      } else {
          await client.db('conkies_db').collection<CompanyRequest>('companies').insertOne(company);
      }

      await client.close();
      res.status(200).send({
          "status": "OK",
          "company": company
      });

  } catch (error) {
      console.log(error, "errorerrorerrorerrorerror")
  }
  }