import express from 'express';
import log from './logger'
import routes from './routes';
import {getCookie} from "./controller/controller"
import {Express, Request, Response } from 'express';


const host = '0.0.0.0';
const port: number = parseInt(<string>process.env.PORT, 10) || 5000
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/healthcheck", (req: Request, res: Response) => res.status(200).send("ok"));
app.get("/api/cookies", getCookie);

app.listen(port, host, function () {
    console.log(`Server started.......${port}`);
    // routes(app);
});



module.exports = app;