import { Request, Response } from "express";
export declare function getCookie(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
