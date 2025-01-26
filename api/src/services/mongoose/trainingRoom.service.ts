import { Model } from "mongoose";
import { TrainingRoom } from "../../models";
import { MongooseService } from "./mongoose.service";
import { trainingRoomSchema } from "./schema";

export type CreateOrUpdateTrainingRoom = Omit<
  TrainingRoom,
  "_id" | "createdAt" | "updatedAt"
>;

export class TrainingRoomService {
  readonly mongooseService: MongooseService;
  readonly model: Model<TrainingRoom>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("trainingRooms", trainingRoomSchema);
  }

  async create(
    trainingRoom: CreateOrUpdateTrainingRoom
  ): Promise<TrainingRoom> {
    const res = await this.model.create(trainingRoom);
    return res;
  }

  async find(): Promise<TrainingRoom[]> {
    const res = await this.model
      .find()
      .populate("address")
      .populate("responsible", "firstName lastName phone email")
      .populate("exercises")
      .populate("description")
      .exec();
    return res;
  }

  async findById(id: string): Promise<TrainingRoom | null> {
    const res = await this.model.findById(id);
    return res;
  }

  async update(
    id: string,
    trainingRoom: CreateOrUpdateTrainingRoom
  ): Promise<TrainingRoom | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: trainingRoom },
      {
        new: true,
        runValidators: true,
      }
    );
    return res;
  }

  async delete(id: string): Promise<TrainingRoom | null> {
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }
}
