import express from "express";
import AnnotationHandler from "../handler/Annotation"
import WrapAsync from "../utils/WrapAsync";
import Pagination from "../utils/Pagination";
const router = express.Router()

router.get('/not_annotated', WrapAsync(Pagination), WrapAsync(AnnotationHandler.get_not_annotated))
router.get('/', WrapAsync(Pagination), WrapAsync(AnnotationHandler.get_random))
router.get('/:id', WrapAsync(AnnotationHandler.show))
router.patch('/:id', WrapAsync(AnnotationHandler.annotate))

export default router;