import Router from "express";
import authorController from "../controllers/authorController.js";

const router = new Router();

router.post("/", authorController.create); 
router.get("/", authorController.getAll);  

export default router;
