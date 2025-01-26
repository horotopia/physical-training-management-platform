import { Schema } from "mongoose";
import { User } from "../../../models";
import { Role } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 *         role:
 *           type: string
 *           enum: [Customer, Admin, Owner]
 *           description: The user's role
 *         phone:
 *           type: string
 *           description: The user's phone number
 *         address:
 *           type: string
 *           description: The user's address ID
 */
export const userSchema = new Schema<User>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
      default: Role.Customer,
    },
    phone: { type: String, required: false },
    address: { type: Schema.Types.ObjectId, ref: "Address", required: false },
  },
  {
    timestamps: true,
    collection: "users",
    versionKey: false,
  }
);
