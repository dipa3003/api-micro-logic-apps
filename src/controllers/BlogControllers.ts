import { Request, Response } from "express";
import BlogServices from "../services/BlogServices";

export default new (class BlogControllers {
    async find(req: Request, res: Response) {
        BlogServices.find(req, res);
    }
})();
