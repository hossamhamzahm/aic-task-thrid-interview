import Joi from "joi"


const AnnotationSchema = Joi.object({
    category: Joi.string().valid('cat', 'dog', 'neither').required(),
    extra_annotations: Joi.array().items(Joi.object({
        key: Joi.string().required(),
        value: Joi.string().required(),
    }))
})


export default AnnotationSchema;