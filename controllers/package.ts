import { Request, Response, NextFunction } from "express";
import Package from "../models/package";
import PackageDeliveryLog from "../models/packageDeliveryLog";
import User from "../models/user";



export const submitPackage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(req.body);
  
  const {
    packageName,
    packageDescription,
    receiverAddress,
    receiverName,
    receiverPhoneNumber,
  } = req.body;
  try {
    const status = "Pending delivery request"
    const thePackage = await Package.create({
      packageName,
      packageDescription,
      receiverAddress,
      receiverName,
      status,
      receiverPhoneNumber,
      customerId: req.user._id,
    });

    await PackageDeliveryLog.create({
      packageId: thePackage?.id,
      status,
    });
    res.status(200).json({
      status: true,
      message: "Package submitted successfully!",
    });
  } catch (error: any) {
    console.log("kdkdk", error);
    
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

export const assignPackageToDispatcher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { packageId, dispatcherId } = req.body;
  const status = "Ready for dispatch";
  try {
    // Check if package exists
    const thePackage = await Package.findByPk(packageId);
    if (!thePackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Check if dispatcher exists
    const user = await User.findByPk(dispatcherId);
    if (!user || user?.role !== "dispatcher") {
      return res.status(404).json({ message: "Dispatcher not found" });
    }

    thePackage.status = status;
    thePackage.dispatcherId = dispatcherId;
    await thePackage.save();

    await PackageDeliveryLog.create({
      packageId,
      status,
    });
    res.status(200).json({
      status: true,
      message: "Package assigned to dispatcher successfully!",
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

export const checkPackageCurrentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPackages = await Package.findAll()
    console.log(allPackages);
    
    // Check if package exists
    const thePackage = await Package.findByPk(req.params.packageId);
    if (!thePackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({
      status: true,
      message: "current status fetched",
      data: {
        id: thePackage.id,
        packageName: thePackage.packageName,
        status: thePackage.status,
      },
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

export const fetchAllPackage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPackages = await Package.findAll()
    res.status(200).json({
      status: true,
      message: "Packages fetched",
      data: allPackages
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
