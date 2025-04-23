import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors";
import { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: "Something went wrong, please try again later" });
};

export default errorHandlerMiddleware;
