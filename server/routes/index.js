import Router from "express";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import authorRouter from "./authorRouter.js";

const router = new Router();

router.use("/user", userRouter);
router.use("/author", authorRouter);
router.use("/product", productRouter);


export default router;
