import { Project } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import * as userService from "@/service/user.service";

export const GetAll = async (req: Request, res: Response) => {
    try {
        // const page = (req.query.page as unknown as number) || 1;
        // if (!page) {
        //     return res.status(500).send({ success: false, message: "Error in Page" });
        // }

        // let max = page * 10;
        const projects = await Project.findMany({
            // skip: max - 10,
            // take: max,
            // include: {
            //     SDG: true
            // },
            // orderBy: {
            //     createAt: "asc",
            // },
        });

        res.status(200).send({ success: true, data: projects });
    } catch (error) {
        console.log(error);

        res.status(500).send({ success: false });
    }
};

export const Create = async (req: Request, res: Response) => {
    try {
        const user = await userService.Find(req.email);
        if (!user) {
            throw new Error("No User Found");
        }
        if (!req.body.selectedSDG) {
            req.body.selectedSDG = 1;
        }
        await Project.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                bannerUrl: req.body.bannerUrl,
                websiteUrl: req.body.websiteUrl,
                selectedSDG: req.body.selectedSDG,
                SDGList: req.body.SDGList,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                organization: req.body.organization,
                // createBy: user.id,
            }
        });

        res.status(201).send({ success: true, message: "Project Created!" });
    } catch (error) {
        console.log(error);

        // handle error prisma
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2003") {
                res.status(404).send({ success: false, message: "user id not found" });
            }
        }
        res.status(500).send({ success: false });
    }
};

export const FindProjectById = async (req: Request, res: Response) => {
    try {
        const project = await Project.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (!project) {
            res.status(404).send("project not found");
        } else {
            res.status(200).send({ success: true, data: project });
        }
    } catch (error) {
        res.status(500).send({ success: false });
    }
};