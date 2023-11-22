import { NextFunction, Request, Response } from "express";
import * as sessionService from "@/service/session.service";
import * as jwtService from "@/service/jwt.service";

export const authJwt = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.ssid

    if (!token) {
        return res.status(403).send({
            message: "No Token provided!",
        });
    }

    try {
        const decoded = jwtService.Validate(token);
        if (!decoded) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }

        req.email = decoded.email;
        req.uuid = decoded.uuid;

        const session = await sessionService.Validate(decoded.uuid)
        if (!session) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
    } catch (error) {
        console.log(error);
    }

    next();
};