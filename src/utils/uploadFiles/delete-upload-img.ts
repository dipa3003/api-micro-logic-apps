import { readdir, unlink } from "node:fs/promises";
import path = require("node:path");

export default async function deleteUploadImg() {
    try {
        const dirPath = "src/uploads";
        const files = await readdir(dirPath);
        console.log("files name:", files);
        for (const file of files) {
            console.log("file names:", file);
            await unlink(path.join(dirPath, file));
        }
    } catch (error) {
        console.log("error delete-upload-img:", error);
    }
}
