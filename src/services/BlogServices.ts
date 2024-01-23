import { Repository } from "typeorm";
import { Blog } from "../entity/Blog";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class BlogServices {
    private readonly BlogRepository: Repository<Blog> = AppDataSource.getRepository(Blog);

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const blogs = await this.BlogRepository.createQueryBuilder("blog").getMany();
            return res.status(200).json(blogs);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while find all blogs" });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            console.log("data req:", data);

            // const blog = await this.BlogRepository
            //     .createQueryBuilder()
            //     .insert()
            //     .into(Blog)
            //     .values(data)
            //     .execute()
            return res.status(201).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while create a blog" });
        }
    }
})();
