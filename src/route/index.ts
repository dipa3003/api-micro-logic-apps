import * as express from "express";
import BlogControllers from "../controllers/BlogControllers";
import UploadFile from "../middlewares/UploadFile";
import UserControllers from "../controllers/UserControllers";

const router = express.Router();

router.get("/blogs", BlogControllers.find);
router.get("/blogs/:id", BlogControllers.findOne);
router.post("/blogs/add", UploadFile.upload("image"), BlogControllers.create);

router.post("/register", UserControllers.register);

export default router;
