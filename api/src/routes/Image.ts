import express from "express";
import ImageHandler from "../handler/Image"
import WrapAsync from "../utils/WrapAsync";
const router = express.Router()

router.get('/:id', WrapAsync(ImageHandler.get))

export default router;