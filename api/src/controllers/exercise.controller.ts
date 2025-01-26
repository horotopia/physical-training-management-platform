import { Request, Response, NextFunction, Router } from "express";
import { MongooseService } from "../services/mongoose";
import { validateRoleAdminOwner } from "../middlewares/validateRole";

export class ExerciseController {
  /**
   * @swagger
   * /exercise:
   *   post:
   *     summary: Create a new exercise
   *     tags: [Exercises]
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
   *               - description
   *               - duration
   *               - repetitions
   *               - series
   *               - rest
   *               - difficulty
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the exercise
   *               description:
   *                 type: string
   *                 description: The description of the exercise
   *               duration:
   *                 type: number
   *                 description: The duration of the exercise
   *               repetitions:
   *                 type: number
   *                 description: The number of repetitions
   *               series:
   *                 type: number
   *                 description: The number of series
   *               rest:
   *                 type: number
   *                 description: The rest time between series
   *               difficulty:
   *                 type: string
   *                 description: The difficulty level of the exercise
   *     responses:
   *       201:
   *         description: The created exercise
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Exercise'
   *       400:
   *         description: Exercise data is required
   *       409:
   *         description: Exercise already exists
   *       500:
   *         description: Internal server error
   */
  async createExercise(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.name) {
        res.status(400);
        throw new Error("Name is required");
      }
      if (!req.body.description) {
        res.status(400);
        throw new Error("Description is required");
      }
      if (typeof req.body.duration !== "number") {
        res.status(400);
        throw new Error("Duration must be a number");
      }
      if (typeof req.body.repetitions !== "number") {
        res.status(400);
        throw new Error("Repetitions must be a number");
      }
      if (typeof req.body.series !== "number") {
        res.status(400);
        throw new Error("Series must be a number");
      }
      if (typeof req.body.rest !== "number") {
        res.status(400);
        throw new Error("Rest must be a number");
      }
      if (!req.body.difficulty) {
        res.status(400);
        throw new Error("Difficulty is required");
      }
      const mongooseService = await MongooseService.get();
      const exercise = await mongooseService.exerciseService.create(req.body);
      res.status(201).json(exercise);
      return;
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "MongooseError" &&
        error.message.startsWith("E11000 duplicate key")
      ) {
        res.status(409);
        new Error("Exercise already exists");
      }
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /exercise:
   *   get:
   *     summary: Retrieve a list of exercises
   *     tags: [Exercises]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of exercises
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Exercise'
   *       500:
   *         description: Internal server error
   */
  async getExercises(req: Request, res: Response, next: NextFunction) {
    try {
      const mongooseService = await MongooseService.get();
      const exercises = await mongooseService.exerciseService.find();
      res.status(200).json(exercises);
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
   * /exercise/{id}:
   *   get:
   *     summary: Retrieve a single exercise by ID
   *     tags: [Exercises]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The exercise ID
   *     responses:
   *       200:
   *         description: A single exercise
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Exercise'
   *       400:
   *         description: ID is required
   *       404:
   *         description: Exercise not found
   *       500:
   *         description: Internal server error
   */
  async getExercise(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      const mongooseService = await MongooseService.get();
      const exercise = await mongooseService.exerciseService.findById(
        req.params.id
      );
      if (!exercise) {
        res.status(404);
        throw new Error("Exercise not found");
      }
      res.status(200).json(exercise);
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
   * /exercise/{id}:
   *   put:
   *     summary: Update an exercise by ID
   *     tags: [Exercises]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The exercise ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Exercise'
   *     responses:
   *       200:
   *         description: The updated exercise
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Exercise'
   *       400:
   *         description: Exercise data is required
   *       404:
   *         description: Exercise not found
   *       500:
   *         description: Internal server error
   */
  async modifyExercise(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      if (!req.body.name) {
        res.status(400);
        throw new Error("Name is required");
      }
      if (!req.body.description) {
        res.status(400);
        throw new Error("Description is required");
      }
      if (typeof req.body.duration !== "number") {
        res.status(400);
        throw new Error("Duration must be a number");
      }
      if (typeof req.body.repetitions !== "number") {
        res.status(400);
        throw new Error("Repetitions must be a number");
      }
      if (typeof req.body.series !== "number") {
        res.status(400);
        throw new Error("Series must be a number");
      }
      if (typeof req.body.rest !== "number") {
        res.status(400);
        throw new Error("Rest must be a number");
      }
      if (!req.body.difficulty) {
        res.status(400);
        throw new Error("Difficulty is required");
      }
      const mongooseService = await MongooseService.get();
      const exerciseFound = await mongooseService.exerciseService.findById(
        req.params.id
      );
      if (!exerciseFound) {
        res.status(404);
        throw new Error("Exercise not found");
      }
      const exercise = await mongooseService.exerciseService.update(
        req.params.id,
        req.body
      );
      res.status(200).json(exercise);
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
   * /exercise/{id}:
   *   delete:
   *     summary: Delete an exercise by ID
   *     tags: [Exercises]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The exercise ID
   *     responses:
   *       204:
   *         description: Exercise deleted successfully
   *       404:
   *         description: Exercise not found
   *       500:
   *         description: Internal server error
   */
  async deleteExercise(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("ID is required");
      }
      const mongooseService = await MongooseService.get();
      const exercise = await mongooseService.exerciseService.findById(
        req.params.id
      );
      if (!exercise) {
        res.status(404);
        throw new Error("Exercise not found");
      }
      await mongooseService.exerciseService.delete(req.params.id);
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
    router.post("/", validateRoleAdminOwner, this.createExercise.bind(this));
    router.get("/", validateRoleAdminOwner, this.getExercises.bind(this));
    router.get("/:id", validateRoleAdminOwner, this.getExercise.bind(this));
    router.put("/:id", validateRoleAdminOwner, this.modifyExercise.bind(this));
    router.delete(
      "/:id",
      validateRoleAdminOwner,
      this.deleteExercise.bind(this)
    );
    return router;
  }
}
