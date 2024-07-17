/**
 * Required External Modules
 */
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import instanceMongoDb from "./database/init.mongodb";
import { checkOverload } from "./helpers/check.connect";
import router from "./routes";

/**
 * App Variables
 */
const app = express();

/**
 * DB Initialization
 */
const db = instanceMongoDb;
// checkOverload();

/**
 *  App Configuration
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes Definitions
 */
app.use("/", router);

export default app;
