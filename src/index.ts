/**
 * Required External Modules
 */
import express, {Request, Response} from 'express';
import loginRouter from "./routes/login";
import bodyParser from 'body-parser';
import morgan from 'morgan';

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "3000";

/**
 *  App Configuration
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

/**
 * Routes Definitions
 */

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the Express");
})
app.use("/login", loginRouter)

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})