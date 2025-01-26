import { Request, Response, NextFunction, Router } from "express";
import { MongooseService } from "../services/mongoose";
import {
  validateRoleAdmin,
  validateRoleAdminOwner,
} from "../middlewares/validateRole";

export class TrainingRoomController {
  /**
   * @swagger
   * /trainingRoom:
   *   post:
   *     summary: Create a new training room
   *     tags: [TrainingRooms]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - capacity
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the training room
   *               capacity:
   *                 type: number
   *                 description: The capacity of the training room
   *     responses:
   *       201:
   *         description: The created training room
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TrainingRoom'
   *       400:
   *         description: Name and capacity are required
   *       409:
   *         description: Address already exists
   *       500:
   *         description: Internal server error
   */
  async createTrainingRoom(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.name) {
        res.status(400);
        throw new Error("Name is required");
      }
      if (!req.body.capacity) {
        res.status(400);
        throw new Error("Capacity is required");
      }
      if (typeof req.body.name !== "string") {
        res.status(400);
        throw new Error("Name must be a string");
      }
      if (typeof req.body.capacity !== "number") {
        res.status(400);
        throw new Error("Capacity must be a number");
      }
      const mongooseService = await MongooseService.get();
      const trainingRoom = await mongooseService.trainingRoomService.create(
        req.body
      );
      res.status(201).json(trainingRoom);
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
   * /trainingRoom:
   *   get:
   *     summary: Retrieve a list of training rooms
   *     tags: [TrainingRooms]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of training rooms
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/TrainingRoom'
   *       500:
   *         description: Internal server error
   */
  async getTrainingRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const mongooseService = await MongooseService.get();
      const trainingRooms = await mongooseService.trainingRoomService.find();
      res.status(200).json(trainingRooms);
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
   * /trainingRoom/{id}:
   *   get:
   *     summary: Retrieve a single training room by ID
   *     tags: [TrainingRooms]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The training room ID
   *     responses:
   *       200:
   *         description: A single training room
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TrainingRoom'
   *       400:
   *         description: ID is required
   *       404:
   *         description: Training room not found
   *       500:
   *         description: Internal server error
   */
  async getTrainingRoom(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      const mongooseService = await MongooseService.get();
      const trainingRoom = await mongooseService.trainingRoomService.findById(
        req.params.id
      );
      if (!trainingRoom) {
        res.status(404);
        throw new Error("Training room not found");
      }
      res.status(200).json(trainingRoom);
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
   * /trainingRoom/{id}:
   *   put:
   *     summary: Update a training room by ID
   *     tags: [TrainingRooms]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The training room ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/TrainingRoom'
   *     responses:
   *       200:
   *         description: The updated training room
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TrainingRoom'
   *       400:
   *         description: Training room data is required
   *       404:
   *         description: Training room not found
   *       500:
   *         description: Internal server error
   */
  async modifyTrainingRoom(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      if (typeof req.body.name !== "string") {
        res.status(400);
        throw new Error("Name is required and must be a string");
      }
      if (typeof req.body.capacity !== "number") {
        res.status(400);
        throw new Error("Capacity is required and must be a number");
      }
      const mongooseService = await MongooseService.get();
      const trainingRoomfound =
        await mongooseService.trainingRoomService.findById(req.params.id);
      if (!trainingRoomfound) {
        res.status(404);
        throw new Error("Training room not found");
      }
      const trainingRoom = await mongooseService.trainingRoomService.update(
        req.params.id,
        req.body
      );
      res.status(200).json(trainingRoom);
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
   * /trainingRoom/{id}:
   *   delete:
   *     summary: Delete a training room by ID
   *     tags: [TrainingRooms]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The training room ID
   *     responses:
   *       204:
   *         description: No content
   *       400:
   *         description: ID is required
   *       404:
   *         description: Training room not found
   *       500:
   *         description: Internal server error
   */
  async deleteTrainingRoom(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      const mongooseService = await MongooseService.get();
      const trainingRoom = await mongooseService.trainingRoomService.findById(
        req.params.id
      );
      if (!trainingRoom) {
        res.status(404);
        throw new Error("Training room not found");
      }
      await mongooseService.trainingRoomService.delete(req.params.id);
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
    router.post("/", validateRoleAdmin, this.createTrainingRoom.bind(this));
    router.get("/", validateRoleAdmin, this.getTrainingRooms.bind(this));
    router.get("/:id", validateRoleAdminOwner, this.getTrainingRoom.bind(this));
    router.put(
      "/:id",
      validateRoleAdminOwner,
      this.modifyTrainingRoom.bind(this)
    );
    router.delete(
      "/:id",
      validateRoleAdminOwner,
      this.deleteTrainingRoom.bind(this)
    );
    return router;
  }
}
