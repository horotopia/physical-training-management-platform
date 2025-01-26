import { Schema } from "mongoose";
import { Address } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - street
 *         - city
 *         - country
 *         - zipCode
 *       properties:
 *         street:
 *           type: string
 *           description: The street of the address
 *         city:
 *           type: string
 *           description: The city of the address
 *         country:
 *           type: string
 *           description: The country of the address
 *         zipCode:
 *           type: string
 *           description: The postal code of the address
 */
export const addressSchema = new Schema<Address>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "addresses",
    versionKey: false,
  }
);
