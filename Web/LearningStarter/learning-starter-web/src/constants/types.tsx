//This type uses a generic (<T>).  For more information on generics see: https://www.typescriptlang.org/docs/handbook/2/generics.html

import { NumberLiteralType } from "typescript";

//You probably wont need this for the scope of this class :)
export type ApiResponse<T> = {
  data: T;
  errors: Error[];
  hasErrors: boolean;
};

export type Error = {
  property: string;
  message: string;
};

export type AnyObject = {
  [index: string]: any;
};

export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  address: string;
  zipCode: number;
  rewardPoints: number;
  password: string;

};

export type UserCreateDto = {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  address: string;
  zipCode: number;
};

export type UserGetDto = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  address: string;
  zipCode: number;
  rewardPoints: number;

};


export type MenuItemsCreateDto = {
  name: string;
  price: number;
  description: string;
};

export type MenuItemsGetDto = {
  id: number;
  name: string;
  price: number;
  description: string;
};



export type OrdersCreateDto = {
  customer: number;
  dateTime: String;
  total: number;
  tipAmount: number;
  status: number;
  type: number;
  customerComments: string;

  
}
