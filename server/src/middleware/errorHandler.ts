import { NextFunction, Request, Response } from 'express';

const errorHandler = async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('in the error handler');
    console.error(err.stack);

    res.status(400).json({
        error: 'Internal Server Error',
        message: err.message,
    });
};

export default errorHandler;
