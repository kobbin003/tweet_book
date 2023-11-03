import z from "zod";

export const FolderZod = z.object({
	name: z.string().min(1),
});
