import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { UserAttributes } from "./commonTypes";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const generateToken = (user: UserAttributes): string => {
  return jwt.sign(
    {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "3h" }
  );
};

export const isCustomer = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); 
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decode) => {
      if (err) {
        res.status(401).send({status: false, message: "Invalid Token" });
      } else {
        if ((decode as any).role === "customer") { 
          req.user = decode;
          next();
        } else {
          res.status(401).send({ status: false, message: "Unauthorized" }); 
        }
      }
    });
  } else {
    res.status(401).send({ status: false, message: "Unauthorized" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); 
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        if ((decode as any).role === "admin") { 
          req.user = decode;
          next();
        } else {
          res.status(401).send({ status: false, message: "Unauthorized" });
        }
      }
    });
  } else {
    res.status(401).send({ status: false, message: "Unauthorized" });
  }
};