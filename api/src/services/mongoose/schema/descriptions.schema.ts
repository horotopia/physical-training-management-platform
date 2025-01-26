import { Schema } from "mongoose";
import { Description } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     Description:
 *       type: object
 *       required:
 *         - installations
 *         - equipments
 *         - activities
 *       properties:
 *         installations:
 *           type: array
 *           items:
 *             type: string
 *           description: List of installations
 *         equipments:
 *           type: array
 *           items:
 *             type: string
 *           description: List of equipments
 *         activities:
 *           type: array
 *           items:
 *             type: string
 *           description: List of activities
 */
export const descriptionSchema = new Schema<Description>(
  {
    installations: { type: [String], required: true },
    equipments: { type: [String], required: true },
    activities: { type: [String], required: true },
  },
  {
    timestamps: true,
    collection: "descriptions",
    versionKey: false,
  }
);
