import express from "express";
import { createFolder } from "../controllers/folder/createFolder";
import passport from "passport";
import { zodValidate } from "../middleware/zodValidate";
import { FolderZod } from "../zod/objects/FolderZod";
import { updateFolder } from "../controllers/folder/updateFolder";
import { deleteFolder } from "../controllers/folder/deleteFolder";

const router = express.Router();

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	zodValidate(FolderZod),
	createFolder
);

router.patch(
	"/",
	passport.authenticate("jwt", { session: false }),
	updateFolder
);

router.delete(
	"/",
	passport.authenticate("jwt", { session: false }),
	deleteFolder
);

export { router as folderRouter };
