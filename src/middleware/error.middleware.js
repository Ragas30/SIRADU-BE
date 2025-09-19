import { ResponseError } from "../lib/error.response.js";
import {ZodError} from "zod";

export const ErrorMiddleware = (err, req, res, next) => {
    if(err instanceof ZodError) {
        const errorsMapped = {};
        for (const issue of err.issues) {
            const key = issue.path[0];
            errorsMapped[key] = issue.message;
        }
        res.status(400).json({
            success: false,
            error: errorsMapped,
        });
    } else if(err instanceof ResponseError) {
        res.status(err.status).json({
            success: false,
            error: err.message,
        });
    } else {
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
};
