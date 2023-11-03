import { NextFunction, Request, Response } from "express";
import { FolderModel } from "../../models/FolderModel";
import { User } from "../../types/User";

export const createFolder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const folderName = req.body.name;
		const user = req.user as User;
		const userId = user.id;

		const folderExistsForUser = await FolderModel.findOne({
			name: folderName,
			user: userId,
		});

		if (folderExistsForUser) {
			res.status(400);
			next(new Error("folder already exists!"));
		}

		// const folder = await FolderModel.create({ name: folderName });
		const folder = await FolderModel.create({ name: folderName, user: userId });
		res.status(201).json(folder);
	} catch (error) {
		res.status(500);
		// pass the error to the errorhandler
		next(error);
	}
};
