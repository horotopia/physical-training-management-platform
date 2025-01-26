import { Request, Response, NextFunction, Router } from "express";
import { MongooseService } from "../services/mongoose";
import {
  validateRoleAdmin,
  validateRoleAdminCustomer,
  validateRoleAdminOwner,
  validateRoleAll,
} from "../middlewares/validateRole";

export class AddressController {
  /**
   * @swagger
   * /address:
   *   post:
   *     summary: Create a new address
   *     tags: [Addresses]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - street
   *               - city
   *               - zipCode
   *               - country
   *             properties:
   *               street:
   *                 type: string
   *                 description: The street of the address
   *               city:
   *                 type: string
   *                 description: The city of the address
   *               zipCode:
   *                 type: string
   *                 description: The zip code of the address
   *               country:
   *                 type: string
   *                 description: The country of the address
   *     responses:
   *       201:
   *         description: The created address
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Address'
   *       400:
   *         description: Address data is required
   *       409:
   *         description: Address already exists
   *       500:
   *         description: Internal server error
   */
  async createAddress(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !req.body ||
        !req.body.street ||
        !req.body.city ||
        !req.body.zipCode
      ) {
        res.status(400);
        throw new Error("Address data is required");
      }
      const mongooseService = await MongooseService.get();
      const address = await mongooseService.addressService.create(req.body);
      res.status(201).json(address).send();
      return;
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "MongooseError" &&
        error.message.startsWith("E11000 duplicate key")
      ) {
        res.status(409);
        new Error("Address already exists");
      }
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /address:
   *   get:
   *     summary: Retrieve a list of addresses
   *     tags: [Addresses]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of addresses
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Address'
   *       500:
   *         description: Internal server error
   */
  async getAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const mongooseService = await MongooseService.get();
      const addresses = await mongooseService.addressService.find();
      res.status(200).json(addresses);
      return;
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /address/{id}:
   *   get:
   *     summary: Retrieve a single address by ID
   *     tags: [Addresses]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The address ID
   *     responses:
   *       200:
   *         description: A single address
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Address'
   *       404:
   *         description: Address not found
   *       500:
   *         description: Internal server error
   */
  async getAddress(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      const mongooseService = await MongooseService.get();
      const address = await mongooseService.addressService.findById(
        req.params.id
      );
      if (!address) {
        res.status(404);
        throw new Error("Address not found");
      }
      res.status(200).json(address);
      return;
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /address/{id}:
   *   put:
   *     summary: Update an address by ID
   *     tags: [Addresses]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The address ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Address'
   *     responses:
   *       200:
   *         description: The updated address
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Address'
   *       400:
   *         description: Address data is required
   *       404:
   *         description: Address not found
   *       500:
   *         description: Internal server error
   */
  async modifyAddress(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      if (typeof req.body.street !== "string") {
        res.status(400);
        throw new Error("street is required and must be a string");
      }
      if (typeof req.body.city !== "string") {
        res.status(400);
        throw new Error("city is required and must be a string");
      }
      if (typeof req.body.zipCode !== "string") {
        res.status(400);
        throw new Error("zipCode is required and must be a string");
      }
      if (typeof req.body.country !== "string") {
        res.status(400);
        throw new Error("country is required and must be a string");
      }
      const mongooseService = await MongooseService.get();
      const addressFound = await mongooseService.addressService.findById(
        req.params.id
      );
      if (!addressFound) {
        res.status(404);
        throw new Error("Address not found");
      }
      const address = await mongooseService.addressService.update(
        req.params.id,
        req.body
      );
      res.status(200).json(address);
      return;
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /address/{id}:
   *   delete:
   *     summary: Delete an address by ID
   *     tags: [Addresses]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The address ID
   *     responses:
   *       204:
   *         description: No content
   *       400:
   *         description: ID is required
   *       404:
   *         description: Address not found
   *       500:
   *         description: Internal server error
   */
  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      const mongooseService = await MongooseService.get();
      const address = await mongooseService.addressService.findById(
        req.params.id
      );
      if (!address) {
        res.status(404);
        throw new Error("Address not found");
      }
      await mongooseService.addressService.delete(req.params.id);
      res.status(204).send();
      return;
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  buildRouter(): Router {
    const router = Router();
    router.post("/", validateRoleAdminCustomer, this.createAddress.bind(this));
    router.get("/", validateRoleAll, this.getAddresses.bind(this));
    router.get("/:id", validateRoleAll, this.getAddress.bind(this));
    router.put("/:id", validateRoleAdminOwner, this.modifyAddress.bind(this));
    router.delete(
      "/:id",
      validateRoleAdminOwner,
      this.deleteAddress.bind(this)
    );
    return router;
  }
}
