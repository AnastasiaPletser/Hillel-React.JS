import Router from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);

// router.get("/auth", (req, res)=> {
//     res.json({message: 'ALL WORKING'})
// });

export default router;
