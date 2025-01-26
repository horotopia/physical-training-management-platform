import { Types } from "mongoose";
import { Address } from "./address.interface";
import { User } from "./user.interface";
import { Description } from "./description.interface";
import { Exercise } from "./exercise.interface";

export interface TrainingRoom {
  name: string;
  capacity: number;
  specializations?: string[];
  address?: Address | Types.ObjectId;
  responsible?: User | Types.ObjectId;
  exercises?: Exercise[] | Types.ObjectId[];
  description?: Description | Types.ObjectId;
}
