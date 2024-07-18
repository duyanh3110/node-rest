import { RequestHandler, Router } from "express";
import accessRouter from "./access";
import CheckAuth from "../auth/checkAuth";

const router = Router();

router.use(CheckAuth.apiKey as RequestHandler);
router.use(CheckAuth.permission("0000") as RequestHandler);

router.use("/v1/api", accessRouter);

// router.get("/", (_, res: Response) => {
//     return res.status(200).json({
//         message: "Welcome to WSV",
//     });
// });

export default router;
