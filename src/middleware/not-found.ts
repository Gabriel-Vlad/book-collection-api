import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const NotFound = async (req: Request, res: Response): Promise<void> => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Route does not exist" });
};

export default NotFound;
