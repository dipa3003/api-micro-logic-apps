import * as express from "express";
import BlogControllers from "../controllers/BlogControllers";
import UploadFile from "../middlewares/UploadFile";
import UserControllers from "../controllers/UserControllers";
import Auth from "../middlewares/Auth";

const router = express.Router();

router.get("/blogs", BlogControllers.find);
router.get("/blogs/:id", BlogControllers.findOne);
router.post("/blogs/add", Auth.authentication, UploadFile.upload("image"), BlogControllers.create);

router.post("/register", UserControllers.register);
router.post("/login", UserControllers.login);

export default router;
