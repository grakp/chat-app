import jwt from "jsonwebtoken";
import { Response } from "express";
import { ObjectId } from "mongoose";

export const generateToken = (userId: string, res: Response): string => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn: "7d"
    });

    // Send token in cookie
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true, // Prevent XSS (cross-site scripting) attacks
        sameSite: "strict", // Prevent CSRF (cross-site request forgery) attacks
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}
