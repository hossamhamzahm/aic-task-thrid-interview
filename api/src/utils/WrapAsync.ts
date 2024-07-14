import {Request, Response, NextFunction} from "express";
import ExpressError from "./ExpressError";


function WrapAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): (req: Request, res: Response, next: NextFunction) => Promise<any> {
    return async (req, res, next) => {
        try{
            return await fn(req, res, next);
        }
        
        catch(e: unknown){
            console.error(e);
            if (e instanceof ExpressError) next(e);
            else if(e instanceof Error) next(new ExpressError(e.message, 400));
            else next(e);
        }
    }
}



export default WrapAsync;