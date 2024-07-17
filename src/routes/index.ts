import { Response, Router } from "express";
import accessRouter from "./access";

const router = Router();

router.use("/v1/api", accessRouter);

// router.get("/", (_, res: Response) => {
//     return res.status(200).json({
//         message: "Welcome to WSV",
//     });
// });

export default router;
