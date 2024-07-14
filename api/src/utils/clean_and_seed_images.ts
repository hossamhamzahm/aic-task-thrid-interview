import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid'; 
import Image from '../db/model/Image';

// List of common image file extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];


function renameFileWithExtension(filePath: string, newBaseName: string): string {
    const ext = path.extname(filePath);
    const newFilePath = path.join(path.dirname(filePath), `${newBaseName}${ext}`);
    
    fs.renameSync(filePath, newFilePath);
    return `${newBaseName}${ext}`;
}


// Function to check if a file is an image based on its extension
function isImage(filePath: string): boolean {
    const ext = path.extname(filePath).toLowerCase();
    return imageExtensions.includes(ext);
}



// Function to read files in a directory and log image names
async function clean_and_seed_images(directoryPath: string): Promise<void> {
    const imgs: {[key: string]: any}[] = [];

    try {
        const files = fs.readdirSync(directoryPath);
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isFile()) {
                if (isImage(filePath)) {
                    const id = uuidv4();

                    const file_name= renameFileWithExtension(filePath, id);
                    imgs.push({ id: id, file_name, user_pk: 1});
                }
                else fs.rmSync(filePath)
            }
        }
    } catch (err) {
        console.error(`Error reading directory ${directoryPath}:`, err);
    }
    const db_imgs = await Image.bulkCreate(imgs)
    console.log(db_imgs.length)
}

// Specify the directory path
const directoryPath = path.join(__dirname, "..", "..", "original_imgs");
clean_and_seed_images(directoryPath);