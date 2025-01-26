import { Model } from "mongoose";
import { Exercise } from "../../models";
import { MongooseService } from "./mongoose.service";
import { exerciseSchema } from "./schema";

export type CreateOrUpdateExercise = Omit<
  Exercise,
  "_id" | "createdAt" | "updatedAt"
>;

export class ExerciseService {
  readonly mongooseService: MongooseService;
  readonly model: Model<Exercise>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("exercises", exerciseSchema);
  }

  async create(exercise: CreateOrUpdateExercise): Promise<Exercise> {
    const res = await this.model.create(exercise);
    return res;
  }

  async find(): Promise<Exercise[]> {
    const res = await this.model.find();
    return res;
  }

  async findById(id: string): Promise<Exercise | null> {
    const res = await this.model.findById(id);
    return res;
  }

  async update(
    id: string,
    exercise: CreateOrUpdateExercise
  ): Promise<Exercise | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: exercise },
      {
        new: true,
        runValidators: true,
      }
    );
    return res;
  }

  async delete(id: string): Promise<Exercise | null> {
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }
}
