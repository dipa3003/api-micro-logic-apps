import { v2 as cloudinary } from "cloudinary";

export default new (class CloudinaryConfig {
    upload() {
        cloudinary.config({
            secure: true,
            cloud_name: "ddkwrue2q",
            api_key: "252898562531645",
            api_secret: "xG15q34WSL7eUsYEYqzs_x6kvuA",
        });
    }

    async destination(image: string): Promise<any> {
        try {
            const cloudinaryRes = await cloudinary.uploader.upload(`src/uploads/${image}`);
            console.log("cloudinaryRes:", cloudinaryRes);
            return cloudinaryRes.secure_url;
        } catch (error) {
            throw error;
        }
    }
})();
