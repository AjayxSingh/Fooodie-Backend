import { auth } from "express-oauth2-jwt-bearer";
import { Request , Response , NextFunction } from "express";
import jwt from 'jsonwebtoken'
import User from "../models/user";

declare global {
    namespace Express {
        interface Request {
            userId:String;
            auth0Id:String;
        }
    }
}

export const jwtCheck = auth({
    audience: 'Foodie-Food-Ordering-API',
    issuerBaseURL: 'https://dev-64w3dj2wdr0nhgvx.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});


export const jwtParse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;
  
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.sendStatus(401);
    }
    const token = authorization.split(" ")[1];
  
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      const auth0Id = decoded.sub;
  
      const user = await User.findOne({auth0Id:auth0Id});
      if (!user) {
        return res.sendStatus(401);
      }
  
      req.auth0Id = auth0Id as string;
      req.userId = user._id.toString();
      next();
    } catch (error) {
      return res.sendStatus(401);
    }
  };
  