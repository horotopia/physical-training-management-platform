import { Schema } from "mongoose";
import { TrainingRoom } from "./trainingRoom.interface";
import { User } from "./user.interface";

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}
