/**
 * Required External Modules
 */
import express, { Request, Response } from "express";
import loginRouter from "./routes/login";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

/**
 * App Variables
 */
const app = express();

/**
 *  App Configuration
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

/**
 * Routes Definitions
 */
app.get("/", (req: Request, res: Response) => {
    const strCompress = "Hello World";
    return res.status(200).json({
        message: "Welcome to WSV",
        metadata: strCompress,
    });
});
app.use("/login", loginRouter);

export default app;
