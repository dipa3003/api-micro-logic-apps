import { Request, Response } from "express";
import UserServices from "../services/UserServices";

export default new (class UserControllers {
    register(req: Request, res: Response) {
        UserServices.register(req, res);
    }
})();
