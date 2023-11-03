import z from "zod";

export const ZodUser = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(1),
});
