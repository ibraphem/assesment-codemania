import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/*******************User Payload Validations***************/

export const validateCreateUser = (req: Request, res: Response, next:NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
    password: Joi.string().min(6).alphanum().required()
  }).options({ allowUnknown: true });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({ status: false, message: error.message });
  }

  next();
};

export const validateSignin = (req: Request, res: Response, next:NextFunction) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }).options({ allowUnknown: true });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    }
  
    next();
  };


/*******************Package Payload Validations***************/

export const validatePackagePayload = (req: Request, res: Response, next:NextFunction) => {

  const schema = Joi.object({
    packageName: Joi.string().required(),
    receiverName: Joi.string().required(),
    receiverAddress: Joi.string().required(),
    receiverPhoneNumber: Joi.number().required()
  }).options({ allowUnknown: true });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({ status: false, message: error.message });
  }

  next();
};

export const validateAssignPackagePayload = (req: Request, res: Response, next:NextFunction) => {
  const schema = Joi.object({
    packageId: Joi.number().required(),
    dispatcherId: Joi.number().required(),
  }).options({ allowUnknown: true });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
  next();
};




