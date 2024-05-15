import express from "express"
import { assignPackageToDispatcher, checkPackageCurrentStatus, fetchAllPackage, submitPackage } from "../controllers/package";
import { validateAssignPackagePayload, validatePackagePayload } from "../middlewares/payloadValidationMiddleware";
import { isAdmin, isCustomer } from "../utils/jwt";


const packageRoutes = express.Router();

packageRoutes.get('/', isAdmin, fetchAllPackage);

packageRoutes.post('/', isCustomer, validatePackagePayload, submitPackage); 

packageRoutes.post('/assign-to-dispatcher', isAdmin, validateAssignPackagePayload, assignPackageToDispatcher);

packageRoutes.get('/status/:packageId', isCustomer, checkPackageCurrentStatus);



export default packageRoutes;