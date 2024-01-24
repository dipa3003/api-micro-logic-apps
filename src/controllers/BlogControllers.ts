import { Request, Response } from "express";
import BlogServices from "../services/BlogServices";

export default new (class BlogControllers {
    find(req: Request, res: Response) {
        BlogServices.find(req, res);
    }

    findOne(req: Request, res: Response) {
        BlogServices.findOne(req, res);
    }

    create(req: Request, res: Response) {
        BlogServices.create(req, res);
    }
})();
