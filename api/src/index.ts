import express from "express";
import cors from "cors"
import imagesRouter from "./routes/Image";
import annotationsRouter from "./routes/Annotation";
import ExpressError from "./utils/ExpressError";


// default express server
const app = express();


// middleware
app.use(cors());
app.use(express.json());


// routes
app.use('/images', imagesRouter);
app.use('/annotations', annotationsRouter);



app.get("*", (req: express.Request, res: express.Response) => {
    res.status(404).send({ msg: "404, endpoint not found" });
})

app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (err instanceof ExpressError) {
        const { message = "Internal server error", status = 500 } = err;
        res.status(404).send({ message, status });
    }
    else res.send(err)
})


export default app;