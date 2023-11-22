import { Request, Response } from "express";
import * as userService from "@/service/user.service";
import * as jwtService from "@/service/jwt.service";
import * as sessionService from "@/service/session.service";
import { setExpireDate } from "@/utils/setExpireDate";
import { v4 as uuidv4 } from "uuid";
import { User } from "@/lib/prisma";

export const Login = async (req: Request, res: Response) => {
  try {
    const idToken = req.headers["id-token"] as string;
    if (idToken != undefined) {
      const uuid = uuidv4();
      const expireDate = setExpireDate(7)

      const decodedToken = await userService.validateIDToken(idToken);
      let user = await userService.Find(decodedToken.email as string);

      const jwtToken = jwtService.generateToken(
        decodedToken.email as string,
        uuid
      );

      if (!user) {
        user = await userService.Create(decodedToken);
        await sessionService.Create(user.id, uuid);

        res.cookie("ssid", jwtToken, {
          httpOnly: true,
          secure: true,
          expires: expireDate,
        });
        return res.status(201).send({ success: true });
      }
      else {
        await sessionService.Create(user.id, uuid);

        res.cookie("ssid", jwtToken, {
          httpOnly: true,
          secure: true,
          expires: expireDate,
        });
        return res.status(200).send({ success: true });
      }
    } else {
      res.status(403).send({ success: false, message: "No id-token Provide" });
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: "" })
  }
};

export const GetUser = async (req: Request, res: Response) => {
  try {
    let token = req.cookies.ssid;

    // if no token = user not login
    if (!token) {
      return res.status(204).send({
        message: "No Content",
      });
    }

    let user;
    const decoded = jwtService.Validate(token);
    user = await userService.Find(decoded.email);

    // Check Session and delete cookie
    const session = await sessionService.Validate(decoded.uuid);

    if (!session) {
      res.status(204).clearCookie("ssid");
      return res.end();
    } else if (!user) {
      return res.status(404).send("user not found");
    } else {
      return res.status(200).send({ success: true, data: user });
    }
  } catch (error) {
    res.status(500).send({ success: false });
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.update({
      where: {
        email: req.email,
      },
      data: req.body,
    });

    return res.status(200).send({ success: true, data: user });
  } catch (error) {
    return res.status(500).send({ success: false });
  }
};