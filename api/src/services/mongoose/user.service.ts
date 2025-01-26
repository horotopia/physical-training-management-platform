import { Model } from "mongoose";
import { User } from "../../models";
import { MongooseService } from "./mongoose.service";
import { userSchema } from "./schema";

export type CreateUser = Omit<
  User,
  | "_id"
  | "firstName"
  | "lastName"
  | "phone"
  | "address"
  | "createdAt"
  | "updatedAt"
>;
export type UpdateUser = Omit<User, "_id" | "createdAt" | "updatedAt">;

export class UserService {
  readonly mongooseService: MongooseService;
  readonly model: Model<User>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("users", userSchema);
  }

  async create(user: CreateUser): Promise<User> {
    const res = await this.model.create(user);
    return res;
  }

  async find(): Promise<User[]> {
    const res = await this.model.find().populate("address").exec();
    return res;
  }

  async findById(id: string): Promise<User | null> {
    const res = await this.model.findById(id);
    return res;
  }

  async findByEmail(email: string): Promise<User | null> {
    const res = await this.model.findOne({ email });
    return res;
  }

  async update(id: string, user: UpdateUser): Promise<User | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true, runValidators: true }
    );
    return res;
  }

  async delete(id: string): Promise<User | null> {
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }
}
