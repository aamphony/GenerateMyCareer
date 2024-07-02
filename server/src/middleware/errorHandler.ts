import { NextFunction, Request, Response } from 'express';

const errorHandler = async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('in the error handler');
    console.error(err.stack);

    res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
