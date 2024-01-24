import { Request, Response } from "express";
import BlogServices from "../services/BlogServices";

export default new (class BlogControllers {
    async find(req: Request, res: Response) {
        BlogServices.find(req, res);
    }

    async findOne(req: Request, res: Response) {
        BlogServices.findOne(req, res);
    }

    async create(req: Request, res: Response) {
        BlogServices.create(req, res);
    }
})();
