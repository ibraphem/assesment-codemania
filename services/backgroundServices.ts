import { PackageAttributes } from "../utils/commonTypes";
import Package  from "../models/package";

export const updatePackagesStatus = async(): Promise<void> => {
  try {
    const packagesToUpdate: PackageAttributes[] = await Package.findAll({
      where: { status: "Ready for dispatch" },
    });

    const updatePromises: Promise<void>[] = packagesToUpdate.map(
      async (thePackage) => {
        thePackage.status = "Package in transit for delivery";
        await thePackage.save();
      }
    );

    await Promise.all(updatePromises);

    console.log(`${packagesToUpdate.length} packages updated successfully.`);
  } catch (error) {
    console.error("Error updating packages:", error);
  }
}


