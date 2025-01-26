import { Model } from "mongoose";
import { Address } from "../../models";
import { MongooseService } from "./mongoose.service";
import { addressSchema } from "./schema";

export type CreateOrUpdateAddress = Omit<
  Address,
  "_id" | "createdAt" | "updatedAt"
>;

export class AddressService {
  readonly mongooseService: MongooseService;
  readonly model: Model<Address>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("addresses", addressSchema);
  }

  async create(address: CreateOrUpdateAddress): Promise<Address> {
    const res = await this.model.create(address);
    return res;
  }

  async find(): Promise<Address[]> {
    const res = await this.model.find();
    return res;
  }

  async findById(id: string): Promise<Address | null> {
    const res = await this.model.findById(id);
    return res;
  }

  async update(
    id: string,
    address: CreateOrUpdateAddress
  ): Promise<Address | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: address },
      {
        new: true,
        runValidators: true,
      }
    );
    return res;
  }

  async delete(id: string): Promise<Address | null> {
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }
}
