import { Model } from "mongoose";
import { Description } from "../../models";
import { MongooseService } from "./mongoose.service";
import { descriptionSchema } from "./schema";

export type CreateOrUpdateDescription = Omit<
  Description,
  "_id" | "createdAt" | "updatedAt"
>;

export class DescriptionService {
  readonly mongooseService: MongooseService;
  readonly model: Model<Description>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("descriptions", descriptionSchema);
  }

  async create(description: CreateOrUpdateDescription): Promise<Description> {
    const res = await this.model.create(description);
    return res;
  }

  async find(): Promise<Description[]> {
    const res = await this.model.find();
    return res;
  }

  async findById(id: string): Promise<Description | null> {
    const res = await this.model.findById(id);
    return res;
  }

  async update(
    id: string,
    description: CreateOrUpdateDescription
  ): Promise<Description | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: description },
      {
        new: true,
        runValidators: true,
      }
    );
    return res;
  }

  async delete(id: string): Promise<Description | null> {
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }
}
