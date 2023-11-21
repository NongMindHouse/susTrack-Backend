import { Request, Response } from "express";
// import * as userService from "@/service/user.service";

export const test = async (req: Request, res: Response) => {
  res.status(200).send("Hello User!");
};
