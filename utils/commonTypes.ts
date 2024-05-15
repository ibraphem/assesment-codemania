
export type CustomErrorType = {
    statusCode?: number,
    message?: string,
  }
  
  export type UserType = {
    id: number;
    name: string;
    email: string;
    role: string;
    password?: string 
  };

  export interface PackageAttributes {
    id?: number;
    packageName: string;
    packageDescription?: string;
    status?: string;
    receiverName: string;
    receiverAddress: string;
    receiverPhoneNumber: string;
    customerId?: number,
    dispatcherId?: number,
    deliveryCode?: number,
    save?: any
  }

  export interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: string;
  }


  export interface PackageDeliveryLogAttributes {
    id?: number;
    packageId: number;
    status: string;
  }
