import { Repository } from "typeorm";
import { Blog } from "../entity/Blog";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CreateBlogSchema } from "../utils/validator/BlogValidator";

export default new (class BlogServices {
    private readonly BlogRepository: Repository<Blog> = AppDataSource.getRepository(Blog);

    async find(req: Request, res: Response): Promise<Response> {
        try {
            // const blogs = await this.BlogRepository.createQueryBuilder("blog").getMany();
            const blogs = await this.BlogRepository.find();
            return res.status(200).json(blogs);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while find all blogs" });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            // data.userid = 5;
            data.image = res.locals.filename;
            data.author = "super admin";
            console.log("data req:", data);

            const { error, value } = CreateBlogSchema.validate(data);
            if (error) return res.status(400).json({ message: error.message });

            const newData = {
                title: value.title,
                description: value.description,
                author: value.author,
                image: value.image,
                dateCreated: new Date(),
            };

            // const blog = await this.BlogRepository
            //     .createQueryBuilder()
            //     .insert()
            //     .into(Blog)
            //     .values(data)
            //     .execute()
            const blog = await this.BlogRepository.insert(newData);
            return res.status(201).json(blog);
            // return res.status(201).json(newData);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while create a blog" });
        }
    }
})();
