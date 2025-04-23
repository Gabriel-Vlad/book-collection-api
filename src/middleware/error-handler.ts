import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors";
import { Request, Response } from "express";

const errorHandlerMiddleware = async (err: Error, req: Request, res: Response): Promise<void> => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message });
    return;
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong, please try again later" });
};

export default errorHandlerMiddleware;
