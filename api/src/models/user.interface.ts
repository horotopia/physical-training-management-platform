import { Schema } from "mongoose";
import { Address } from "./address.interface";

export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  address?: Address | Schema.Types.ObjectId;
}
