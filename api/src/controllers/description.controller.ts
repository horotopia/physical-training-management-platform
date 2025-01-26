import { Request, Response, NextFunction, Router } from "express";
import { MongooseService } from "../services/mongoose";
import {
  validateRoleAdmin,
  validateRoleAdminOwner,
  validateRoleOwner,
} from "../middlewares/validateRole";

export class DescriptionController {
  /**
   * @swagger
   * /description:
   *   post:
   *     summary: Create a new description
   *     tags: [Descriptions]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - installations
   *               - equipments
   *               - activities
   *             properties:
   *               installations:
   *                 type: array
   *                 items:
   *                   type: string
   *                 description: List of installations
   *               equipments:
   *                 type: array
   *                 items:
   *                   type: string
   *                 description: List of equipments
   *               activities:
   *                 type: array
   *                 items:
   *                   type: string
   *                 description: List of activities
   *     responses:
   *       201:
   *         description: The created description
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Description'
   *       400:
   *         description: Description data is required
   *       409:
   *         description: Address already exists
   *       500:
   *         description: Internal server error
   */
  async createDescription(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.installations) {
        res.status(400);
        throw new Error("Installations are required");
      }
      if (!req.body.equipments) {
        res.status(400);
        throw new Error("Equipments are required");
      }
      if (!req.body.activities) {
        res.status(400);
        throw new Error("Activities are required");
      }
      const mongooseService = await MongooseService.get();
      const description = await mongooseService.descriptionService.create(
        req.body
      );
      res.status(201).json(description).send();
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
   * /description:
   *   get:
   *     summary: Retrieve a list of descriptions
   *     tags: [Descriptions]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of descriptions
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Description'
   *       500:
   *         description: Internal server error
   */
  async getDescriptions(req: Request, res: Response, next: NextFunction) {
    try {
      const mongooseService = await MongooseService.get();
      const descriptions = await mongooseService.descriptionService.find();
      res.status(200).json(descriptions);
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
   * /description/{id}:
   *   get:
   *     summary: Retrieve a single description by ID
   *     tags: [Descriptions]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The description ID
   *     responses:
   *       200:
   *         description: A single description
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Description'
   *       400:
   *         description: ID is required
   *       404:
   *         description: Description not found
   *       500:
   *         description: Internal server error
   */
  async getDescription(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      const mongooseService = await MongooseService.get();
      const description = await mongooseService.descriptionService.findById(
        req.params.id
      );
      if (!description) {
        res.status(404);
        throw new Error("Description not found");
      }
      res.status(200).json(description);
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
   * /description/{id}:
   *   put:
   *     summary: Update a description by ID
   *     tags: [Descriptions]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The description ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Description'
   *     responses:
   *       200:
   *         description: The updated description
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Description'
   *       400:
   *         description: Description data is required
   *       404:
   *         description: Description not found
   *       500:
   *         description: Internal server error
   */
  async modifyDescription(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      if (!req.body.installations) {
        res.status(400);
        throw new Error("Installations are required");
      }
      if (!req.body.equipments) {
        res.status(400);
        throw new Error("Equipments are required");
      }
      if (!req.body.activities) {
        res.status(400);
        throw new Error("Activities are required");
      }
      const mongooseService = await MongooseService.get();
      const descriptionFound =
        await mongooseService.descriptionService.findById(req.params.id);
      if (!descriptionFound) {
        res.status(404);
        throw new Error("Description not found");
      }
      const description = await mongooseService.descriptionService.update(
        req.params.id,
        req.body
      );
      res.status(200).json(description);
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
   * /description/{id}:
   *   delete:
   *     summary: Delete a description by ID
   *     tags: [Descriptions]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The description ID
   *     responses:
   *       204:
   *         description: No content
   *       400:
   *         description: ID is required
   *       404:
   *         description: Description not found
   *       500:
   *         description: Internal server error
   */
  async deleteDescription(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      const mongooseService = await MongooseService.get();
      const description = await mongooseService.descriptionService.findById(
        req.params.id
      );
      if (!description) {
        res.status(404);
        throw new Error("Description not found");
      }
      await mongooseService.descriptionService.delete(req.params.id);
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
    router.post("/", validateRoleOwner, this.createDescription.bind(this));
    router.get("/", validateRoleAdmin, this.getDescriptions.bind(this));
    router.get("/:id", validateRoleAdminOwner, this.getDescription.bind(this));
    router.put(
      "/:id",
      validateRoleAdminOwner,
      this.modifyDescription.bind(this)
    );
    router.delete(
      "/:id",
      validateRoleAdminOwner,
      this.deleteDescription.bind(this)
    );
    return router;
  }
}
