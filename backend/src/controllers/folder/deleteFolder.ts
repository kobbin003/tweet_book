import { Request, Response } from "express";

export const deleteFolder = async (req: Request, res: Response) => {
	try {
		const folderName = req.query.folderName;
		// const userId = req.user.id;
	} catch (error) {}
};
