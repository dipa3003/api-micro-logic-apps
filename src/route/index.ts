import * as express from "express";
import BlogControllers from "../controllers/BlogControllers";

const router = express.Router();

router.get("/blogs", BlogControllers.find);

export default router;
