import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void) {
        const authJwtToken = req.headers.authorization;
        if (!authJwtToken) {
            next();
            return;
        }

        try {
            const token = authJwtToken.replace('Bearer', '').trim();
            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            if (user) {
                console.log("Found user details in JWT: ", user);
                req["user"] = user;
            }
        } catch (err) {
            console.log("Error handling authentication JWT: ", err);
            return res.status(401).json({ message: "Invalid token" }); // Send 401 Unauthorized response
        }
        next();
    }
}
