import express from 'express';
import cors from 'cors';
import log from './logger'
import routes from './routes';
import {getCookie, saveCompany} from "./controller/controller"
import {Express, Request, Response } from 'express';


const host = '0.0.0.0';
const port: number = parseInt(<string>process.env.PORT, 10) || 5055
const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.get("/api/healthz", (req: Request, res: Response) => res.status(200).send("ok"));
app.get("/api/conkies", getCookie);
app.post("/api/company", saveCompany);

app.listen(port, host, function () {
    console.log(`Server started.......${port}`);
    // routes(app);
});



module.exports = app;