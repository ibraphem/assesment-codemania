import { createUser, fetchAllUsers, signIn } from "../controllers/users";
import express from "express"
import { validateCreateUser, validateSignin } from "../middlewares/payloadValidationMiddleware";
import { isAdmin } from "../utils/jwt";


const userRoutes = express.Router();
userRoutes.get('/', isAdmin, fetchAllUsers); 
userRoutes.post('/', validateCreateUser, createUser); 
userRoutes.post('/login', validateSignin, signIn); 

export default userRoutes;