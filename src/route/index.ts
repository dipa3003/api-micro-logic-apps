import * as express from "express";
import BlogControllers from "../controllers/BlogControllers";

const router = express.Router();

router.get("/blogs", BlogControllers.find);
router.post("/blog", BlogControllers.create);

export default router;
