import { NextFunction, Request as ExpressRequest, Response } from "express";
import APIKeyService from "../services/apikey.service";
import AppUtils from "../utils";

const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization",
};

interface APIKey {
    key: string;
    status: boolean;
    permissions: string[];
}

interface Request extends ExpressRequest {
    objKey: APIKey;
}

const findObjKey = async (key: string) => {
    return await APIKeyService.findById(key);
};

const apiKey = (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: "Forbidden Error",
            });
        }

        // check objKey
        const objKey = findObjKey(key).then((obj) => {
            req.objKey = AppUtils.getInfoData({
                fields: ["key", "status", "permissions"],
                object: obj || {},
            }) as APIKey;

            return next();
        });

        if (!objKey) {
            return res.status(403).json({
                message: "Forbidden Error",
            });
        }
    } catch (error) {
        throw Error;
    }
};

const permission = (permission: string) => {
    // Closure JS
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: "Permission Denied",
            });
        }

        const validPermission = req.objKey.permissions.includes(permission);
        if (!validPermission) {
            return res.status(403).json({
                message: "Permission Denied",
            });
        }

        return next();
    };
};

const CheckAuth = { apiKey, permission };

export default CheckAuth;
