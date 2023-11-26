import { z } from "zod";

export const getProjectByIdSchema = z.object({
    params: z.object({
        id: z.string().min(10)
    }),
});

export const createProjectSchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        bannerUrl: z.string(),
        websiteUrl: z.string(),
        selectedSDG: z.number().optional(),
        SDGList: z.array(z.string()).optional(),
        latitude: z.number(),
        longitude: z.number(),
        organization: z.string()
    })
})