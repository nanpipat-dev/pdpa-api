import {Express, Request, Response } from 'express';
import {getCookie} from "./controller/controller"

export default function (app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.status(200).send("ok"));
    app.get("/api/cookies", getCookie);
}