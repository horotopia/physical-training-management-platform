import { Schema } from "mongoose";
import { TrainingRoom } from "../../../models";
import { TrainingDifficulty } from "../../../models/trainingDifficulty.enum";

/**
 * @swagger
 * components:
 *   schemas:
 *     TrainingRoom:
 *       type: object
 *       required:
 *         - name
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the training room
 *         capacity:
 *           type: number
 *           description: The capacity of the training room
 *         specializations:
 *           type: array
 *           items:
 *             type: string
 *           description: List of specializations
 *         address:
 *           type: string
 *           description: The address ID of the training room
 *         responsible:
 *           type: string
 *           description: The user ID of the responsible person
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           description: List of exercise IDs
 *         description:
 *           type: string
 *           description: The description ID
 */
export const trainingRoomSchema = new Schema<TrainingRoom>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    capacity: {
      type: Number,
      min: 1,
      required: true,
    },
    specializations: {
      type: [String],
      required: false,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "addresses",
      required: false,
    },
    responsible: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    exercises: {
      type: [Schema.Types.ObjectId],
      ref: "exercises",
      required: false,
    },
    description: {
      type: Schema.Types.ObjectId,
      ref: "descriptions",
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "trainingRooms",
    versionKey: false,
  }
);
