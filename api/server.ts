import express, { Express, Request, Response, NextFunction } from "express";
import configureCORS from "./config/cors";
import configureHelmet from "./config/helmet";
import swaggerSpec from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import { config } from "dotenv";
import { Logger } from "./config/logger";
import connectDB from "./config/database";
import errorHandler from "./middlewares/errorHandler";
import {
  AddressController,
  AuthController,
  DescriptionController,
  ExerciseController,
  TrainingRoomController,
  UserController,
} from "./controllers";

config();
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configureCORS(app);
configureHelmet(app);
const logger = Logger.get();

app.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.MODE_ENV === "development") {
    logger.http(
      `${req.method} ${req.url} - ${req.ip} - ${req.headers["user-agent"]}`
    );
  }
  next();
});
app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const addressController = new AddressController();
app.use("/address", addressController.buildRouter());
const authController = new AuthController();
app.use("/auth", authController.buildRouter());
const descriptionController = new DescriptionController();
app.use("/description", descriptionController.buildRouter());
const exerciseController = new ExerciseController();
app.use("/exercise", exerciseController.buildRouter());
const trainingRoomController = new TrainingRoomController();
app.use("/training-room", trainingRoomController.buildRouter());
const userController = new UserController();
app.use("/user", userController.buildRouter());

app.use(errorHandler());

const host = process.env.API_HOST || "localhost";
const port = process.env.API_PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
  console.log(`Server is running on http://${host}:${port}/doc`);

  connectDB();
});
