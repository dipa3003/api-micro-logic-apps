import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CreateLoginSchema, CreateRegisterSchema } from "../utils/validator/UserValidator";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default new (class UserServices {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User);

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;

            const checkUser = await this.UserRepository.existsBy({ username: data.username });
            if (checkUser) return res.json({ message: `${data.username} has already register` });

            const { error, value } = CreateRegisterSchema.validate(data);
            if (error) return res.status(400).json({ message: error.message });

            const encryptPassword = await bcrypt.hash(value.password, 10);

            const newData = {
                fullname: data.fullname,
                address: data.address,
                sex: data.sex,
                username: data.username,
                password: encryptPassword,
            };

            await this.UserRepository.insert(newData);
            return res.status(201).json({ message: `Welcome ${newData.username}, you success to register` });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while register" });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const { error, value } = CreateLoginSchema.validate(data);
            if (error) return res.status(400).json({ message: error.message });

            const isRergister = await this.UserRepository.findOneBy({ username: value.username });
            if (!isRergister) return res.status(400).json({ message: "Incorrect username, try again...", response: isRergister });

            const checkPassword = await bcrypt.compare(value.password, isRergister.password);
            if (!checkPassword) return res.status(400).json({ message: "Incorrect password, try again..." });

            const user = this.UserRepository.create({
                id: isRergister.id,
                fullname: isRergister.fullname,
            });

            const token = jwt.sign({ user }, "secretkey", { expiresIn: "1h" });

            return res.status(200).json({ user, token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while login" });
        }
    }
})();
