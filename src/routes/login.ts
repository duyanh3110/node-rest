import express from "express";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
    res.send("This is the login request");
});

export default loginRouter;
