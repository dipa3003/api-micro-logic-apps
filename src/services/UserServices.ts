import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CreateRegisterSchema } from "../utils/validator/UserValidator";
import * as bcrypt from "bcrypt";

export default new (class UserServices {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User);

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            console.log("data body:", data);

            const { error, value } = CreateRegisterSchema.validate(data);
            if (error) return res.status(400).json({ message: error.message });
            console.log("value validate:", value);

            const encryptPassword = await bcrypt.hash(value.password, 10);

            const newData = {
                fullname: data.fullname,
                address: data.address,
                sex: data.sex,
                username: data.username,
                password: encryptPassword,
            };

            return res.status(201).json(newData);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops...Something error while register user" });
        }
    }
})();
