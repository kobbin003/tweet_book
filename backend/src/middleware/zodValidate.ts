import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { Auth } from "../types/zod/Auth";

export const zodValidate = (zodObject: ZodObject<any | Auth>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const isValidData = zodObject.safeParse(req.body);
			if (isValidData.success === true) {
				next();
			} else {
				const issues = isValidData.error.issues;
				const zodErrorMessages = issues.map(
					(issue) => `${issue.path[0]}: ${issue.message}`
				);
				res.status(400).json({ error: { statusCode: 400, zodErrorMessages } });
			}
		} catch (error) {
			next(error);
		}
	};
};
