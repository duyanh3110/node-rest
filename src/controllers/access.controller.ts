import { NextFunction, Request, RequestHandler, Response } from "express";
import AccessServices from "../services/access.services";

const signUp: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(`[P]::signUp:: `, req.body);
        return res.status(200).json(await AccessServices.signUp(req.body));
    } catch (error) {
        next(error);
    }
};

const AccessController = { signUp };

export default AccessController;
