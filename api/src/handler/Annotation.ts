import { Request, Response } from "express";
import Image from "../db/model/Image"
import ExpressError from "../utils/ExpressError";
import AnnotationSchema from "../validator/AnnotationSchema";
import ExtraAnnotation from "../db/model/ExtraAnnotation";



const get_not_annotated = async (req: Request, res: Response) => {
    const imgs = await Image.findAndCountAll({ 
        where: { category: null},
        limit: res.locals.result.pagination.limit,
        offset: res.locals.result.pagination.offset
    });

    const result = res.locals.result
    result.resources = imgs.rows;
    result.pagination.total_records = imgs.count;
    result.pagination.total_pages = Math.ceil(imgs.count / result.pagination.limit)

    if (result.pagination.total_pages > result.pagination.current_page)
        result.pagination.next_page = result.pagination.current_page + 1
    else
        result.pagination.next_page = null

    res.status(200).send(result);
}



const get_random = async (req: Request, res: Response) => {
    // implement random function later
    const image = await Image.findOne({
        where: { category: null },
        limit: 1
    });

    if (!image) throw new ExpressError("Wrong image id!", 404)

    res.status(200).send(image);
}


const show = async (req: Request, res: Response) => {
    const { id } = req.params

    const image = await Image.findOne({ where: { id } });
    if (!image) throw new ExpressError("Wrong image id!", 404)

    res.status(200).send(image);
}


const annotate = async (req: Request, res: Response) => {
    const {id} = req.params
    await AnnotationSchema.validateAsync(req.body);


    const image = await Image.findOne({ where: { id } });
    if (!image) throw new ExpressError("Wrong image id!", 404)
    await image.update({category: req.body.category});


    if(req.body.extra_annotations && req.body.extra_annotations.length > 0){
        const extra_annotations = req.body.extra_annotations.map((key_val: {[key: string]: any}) => {
            key_val["image_pk"] = image.pk
            return key_val;
        })
        ExtraAnnotation.bulkCreate(extra_annotations)
    }


    res.status(200).send({meassage: "successfull annotation."});
}


export default {
    show, 
    get_not_annotated,
    annotate,
    get_random
}