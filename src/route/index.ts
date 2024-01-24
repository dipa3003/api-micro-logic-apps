import * as express from "express";
import BlogControllers from "../controllers/BlogControllers";
import UploadFile from "../middlewares/UploadFile";

const router = express.Router();

router.get("/blogs", BlogControllers.find);
router.get("/blogs/:id", BlogControllers.findOne);
router.post("/blogs/add", UploadFile.upload("image"), BlogControllers.create);

export default router;
