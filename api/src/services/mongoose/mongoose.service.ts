import { config } from "dotenv";
import { Mongoose, connect } from "mongoose";
import { TrainingRoomService } from "./trainingRoom.service";
import { AddressService } from "./address.service";
import { DescriptionService } from "./description.service";
import { ExerciseService } from "./exercise.service";
import { UserService } from "./user.service";

config();
console.log("uri", process.env.MONGO_URI);
export class MongooseService {
  private static instance?: MongooseService;

  readonly mongoose: Mongoose;
  readonly addressService: AddressService;
  readonly descriptionService: DescriptionService;
  readonly exerciseService: ExerciseService;
  readonly trainingRoomService: TrainingRoomService;
  readonly userService: UserService;

  private constructor(mongoose: Mongoose) {
    this.mongoose = mongoose;
    this.addressService = new AddressService(this);
    this.descriptionService = new DescriptionService(this);
    this.exerciseService = new ExerciseService(this);
    this.trainingRoomService = new TrainingRoomService(this);
    this.userService = new UserService(this);
  }

  public static async get(): Promise<MongooseService> {
    if (this.instance !== undefined) {
      return this.instance;
    }
    const connection = await this.openConnection();
    this.instance = new MongooseService(connection);
    return this.instance;
  }
  private static async openConnection(): Promise<Mongoose> {
    const connection = await connect(process.env.MONGO_URI as string, {
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
      },
      authSource: "admin",
      dbName: process.env.MONGO_DB,
    });
    return connection;
  }
}
