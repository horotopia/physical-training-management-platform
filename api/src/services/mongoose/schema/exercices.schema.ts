import { Schema } from "mongoose";
import { Exercise } from "../../../models";
import { TrainingDifficulty } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - duration
 *         - repetitions
 *         - series
 *         - rest
 *         - difficulty
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the exercise
 *         description:
 *           type: string
 *           description: The description of the exercise
 *         duration:
 *           type: number
 *           description: The duration of the exercise
 *         repetitions:
 *           type: number
 *           description: The number of repetitions
 *         series:
 *           type: number
 *           description: The number of series
 *         rest:
 *           type: number
 *           description: The rest time between series
 *         difficulty:
 *           type: string
 *           enum: [Easy, Medium, Hard]
 *           description: The difficulty level of the exercise
 */
export const exerciseSchema = new Schema<Exercise>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    repetitions: { type: Number, required: true },
    series: { type: Number, required: true },
    rest: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: Object.values(TrainingDifficulty),
      default: TrainingDifficulty.Medium,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "exercises",
    versionKey: false,
  }
);
