import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { generateToken } from "../utils/jwt";


interface CreateUserRequest extends Request {
  body: {
    id?: number
    name: string;
    email: string;
    role: string;
    password: string;
  };
}

export const createUser = async (req: CreateUserRequest, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, role, password } = req.body;
  try {
    await User.create({
      name,
      email,
      role,
      password: bcrypt.hashSync(password)
    });
    res.status(200).json({
      status: true,
      message: "User created successfully!",
    });
  } catch (error: any) {
    if(error?.errors[0]?.message) {
      res.status(400).json({
        status: false,
        message: error?.errors[0]?.message,
      });
    }else{
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
    
  
  }
};


export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let lEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ where: {  email: lEmail } });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }

    // Generate token
    const response ={
      status: true,
      message: "User signed in succesfully",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user),
      },
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const fetchAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allusers = await User.findAll()
    res.status(200).json({
      status: true,
      message: "users fetched",
      data: allusers
    });
  } catch (error: any) {
    if (error?.errors[0]?.message) {
      res.status(400).json({
        status: false,
        message: error?.errors[0]?.message,
      });
    } else {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
};