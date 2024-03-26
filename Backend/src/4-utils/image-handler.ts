import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";

// Define images folder to store images
const imagesFolder = path.join(__dirname, "..", "1-assets", "images");

// Get the image path
function getImagePath(imageName: string): string {
    return imagesFolder + "/" + imageName;
}

// Save image in images folder, deletes given name, and creates a UUID instead.
async function saveImage(image: UploadedFile): Promise<string> {
    const extension = image.name.substring(image.name.lastIndexOf("."));
    const uniqueName = uuid() + extension;
    const absolutePath = getImagePath(uniqueName);
    await image.mv(absolutePath);
    return uniqueName;
}

// Delete image from folder
async function deleteImage(imageName: string): Promise<void> {
    
    // wrap in try catch JIC it fails to delete so it doesn't crash anything
    try {
        if(!imageName) return;
        const absolutePath = getImagePath(imageName);
        await fsPromises.unlink(absolutePath);
    }
    catch(err: any) {
        console.error(err.message);
    }
}

// Update a new image, deletes last image and saves a new one in its place with new UUID
async function updateImage(image: UploadedFile, existingName: string): Promise<string> {
    await deleteImage(existingName);
    const uniqueName = await saveImage(image);
    return uniqueName;
}

export default {
    getImagePath,
    saveImage,
    updateImage,
    deleteImage
};