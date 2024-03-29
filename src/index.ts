import { AppDataSource } from "./data-source";
import * as express from "express";
import router from "./route";
import "dotenv/config";
import cloudinary from "./libs/cloudinary";
import * as cors from "cors";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        const PORT = process.env.PORT;

        app.use(cors());
        app.use(express.json());
        app.use("/api", router);
        cloudinary.upload();

        app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
    })
    .catch((error) => console.log(error));
