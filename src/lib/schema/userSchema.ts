import { z } from "zod";

export const userLogin = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is Required" }).email(),
        password: z.string().min(5),
    }),
});

export const updateUserSchema = z.object({
    body: z.object({
        userName: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        profileUrl: z.string().url()
    }),
});
