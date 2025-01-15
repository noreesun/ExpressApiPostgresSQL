import { Request, Response, NextFunction } from 'express';
import * as JwtUtils from '../utils/jwtUtils';


interface AuthRequest extends Request {
    user? : {userId : number};
}

export const authMiddlewareJWT = (
    req: AuthRequest, 
    res: Response, 
    next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        //ถ้ามี token ให้แยก token ออกมา ฺBearer token
        const token = authHeader && authHeader.split(' ')[1];
        // Check if token is null or undefined and return 401 status code
        if (!token) {
            res.status(401).json({message: 'Unauthorized'});
            return
            
        }
        // Verify token
        try {
            //ถ้า token ถูกต้องจะได้ข้อมูล user ออกมา
            const user = JwtUtils.verifyAccessToken(token);
            /*if(!user) {
                throw new Error('Invalid token');
            }*/
            req.user = user as {userId : number}; //ถ้ามี user ให้เก็บข้อมูลไว้ใน req.user
            next();
        } catch (error) {      //ถ้า token ไม่ถูกต้องจะเกิด error และจะถูก catch ไว้  
            res.status(403).json({message: 'Invalid or expiration token'});
        }

}