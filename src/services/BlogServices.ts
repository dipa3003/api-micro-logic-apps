import { Repository } from "typeorm";
import { Blog } from "../entity/Blog";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CreateBlogSchema } from "../utils/validator/BlogValidator";
import cloudinary from "../libs/cloudinary";

export default new (class BlogServices {
    private readonly BlogRepository: Repository<Blog> = AppDataSource.getRepository(Blog);

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const blogs = await this.BlogRepository.find();
            return res.status(200).json(blogs);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while find all blogs" });
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const blog = await this.BlogRepository.findOneBy({ id: id });

            if (!blog) return res.status(404).json({ message: "Cannot find a blog with given id" });

            return res.status(200).json(blog);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while find a blog" });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            data.image = res.locals.filename;
            data.userId = res.locals.loginSession.user.id;
            data.author = res.locals.loginSession.user.fullname;

            const { error, value } = CreateBlogSchema.validate(data);
            if (error) return res.status(400).json({ message: error.message });

            const urlImage = await cloudinary.destination(value.image);
            //logic delete image in upload dir willbe here soon...

            const newData = {
                title: value.title,
                description: value.description,
                author: value.author,
                image: `${urlImage}`,
                dateCreated: new Date(),
                user: value.userId,
            };

            const blog = await this.BlogRepository.insert(newData);
            return res.status(201).json(blog);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while create a blog" });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const data = req.body;
            data.image = res.locals.filename;
            data.userId = res.locals.loginSession.user.id;
            data.author = res.locals.loginSession.user.fullname;

            const checkBlog = await this.BlogRepository.existsBy({ id: id });
            if (!checkBlog) return res.status(404).json({ message: "Blog not found or does not exist" });

            const { error, value } = CreateBlogSchema.validate(data);
            if (error) return res.status(400).json({ message: error.message });

            const urlImg = await cloudinary.destination(value.image);

            const newData = {
                title: value.title,
                description: value.description,
                author: value.author,
                image: `${urlImg}`,
                dateCreated: new Date(),
                user: value.userId,
            };

            const response = await this.BlogRepository.update(id, newData);
            return res.status(201).json({ message: "success update blog", response });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while update a blog" });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const findBlog = await this.BlogRepository.findOneBy({ id: id });
            if (!findBlog) return res.status(400).json({ message: "Cannot find blog with given id", response: findBlog });

            cloudinary.delete(findBlog.image);
            const response = await this.BlogRepository.delete(id);

            return res.status(200).json({ message: "delete success", response });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while delete a blog" });
        }
    }
})();
