import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";

const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            res.status(401).json({ error: "Unauthorized -No Token Provided" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if (!decoded) {
            res.status(401).json({ error: "Unauthorized -Invalid Token" });
            return;
        }

        const user = await User.findById(decoded.userId).select("password");

        if (!user) {
            res.status(404).json({ error: "User not Found" });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectroute middleware:", (error as Error).message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;