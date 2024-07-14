import { Request, Response } from "express";
import Image from "../db/model/Image";
import ExpressError from "../utils/ExpressError";
import path from 'path';



const get = async (req: Request, res: Response) => {
    const { id } = req.params

    const image = await Image.findOne({ where: { id } });
    if (!image) throw new ExpressError("Wrong image id!", 404)

    const imageName = image.file_name;
    const imagePath = path.join(__dirname, '..', '..', 'original_imgs', imageName);

    // Step 4: Send the image as a response
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send({message: 'Image not found'});
        }
    });
}


export default {
    get
}