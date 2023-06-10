import { Router } from "express";
import filesRouter from "./files.js";
import usersRouter from "./users.js";

const router = Router();

router.use("/files", filesRouter);
router.use("/users", usersRouter);

export default router;
