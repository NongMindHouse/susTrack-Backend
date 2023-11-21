import { z } from "zod";

export const userLogin = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is Required" }).email(),
        user_name: z.string().optional(),
        first_name: z.string().min(2),
        last_name: z.string().optional(),
    }),
});