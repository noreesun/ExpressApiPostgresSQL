import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import * as userService from "../services/userService";
import * as jwtUtils from "../utils/jwtUtils";
import exp from "constants";


//สร้าง Function สำหรับการสร้าง User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    //Get data from body
    const { username, password, fullname, email, tel }: any = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 8); //ทำการเข้ารหัส password
        const user = await userService.registerUser(username, hashedPassword, fullname, email, tel);
        res.status(201).json(user);

    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

//สร้าง Function สำหรับการ Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    //Get data from body
    const { username, password }: any = req.body;
    try {
        const user = await userService.loginUser(username);
        if (!user) {
            throw new Error("Invalid username or password");
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password); //เปรียบเทียบ password ที่ login กับ password ที่เข้ารหัส
            if (isMatch) {
                const token = await jwtUtils.generateAccessToken(user.id); //สร้าง token
                const refreshToken = await jwtUtils.generateRefreshToken(user.id); //สร้าง refresh token
                res.status(200).json({
                    user,
                    token,
                    refreshToken
                });
            } else {
                throw new Error("Invalid username or password");
            }
        }

    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

//function สำหรับการ Refresh Token
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(401).json({ message: "Refresh Token is required" });
        return
    }
    if (!jwtUtils.validateRefreshToken(refreshToken)) {
        res.status(403).json({ message: "Invalid refresh token" });
        return
    }
    try {
        const decoded = jwtUtils.verifyRefreshToken(refreshToken);
        const userId = decoded?.userId;
        if (!userId) {
            res.status(403).json({ message: "Invalid refresh token" });
            return 
        }
        const newAccessToken = jwtUtils.generateAccessToken(userId);
        res.status(200).json({
            accessToken: newAccessToken
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: 'Error refreshing token',Error: err.message
        });
    }
}

//Function สำหรับการ Logout
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
        res.status(401).json({ message: "Refresh Token is required" });
        return
    }

    jwtUtils.revokeRefreshToken(refreshToken);
    res.status(200).json({ message: "Logout successfully" });
}