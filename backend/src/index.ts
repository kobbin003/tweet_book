import express, { Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import { notFound } from "./utils/notFound";
import { errorHandler } from "./utils/errorHandler";
import { xRouter } from "./routes/x";
import { connectDb } from "./db";
import { authRouter } from "./routes/auth";
import { initializePassportWithJwtStrategy } from "./passport/jwtStrategy";
import { loginXAccount } from "./scrapper/loginXAccount";

const app = express();
const PORT = 3000;

/** login to twitter account */
(async () => {
	await loginXAccount();
})();

/** connect to database */
connectDb().catch((err) => console.log("database error", err));

/** initializing passport */
initializePassportWithJwtStrategy();

app.use(cors());
app.use(express.json());

// logger logs only 4xx and 5xx status responses to console.
app.use(
	logger("dev", { skip: (req: Request, res: Response) => res.statusCode < 400 })
);
/** routes */
app.use("/xScrap", xRouter);
app.use("/auth", authRouter);

/** 404 route handling middleware */
app.use((req, res, next) => {
	notFound(req, res, next);
});

/** error handler */
app.use(errorHandler);

// login();
app.listen(PORT, async () => {
	console.log(`server is running on port: ${PORT}`);
});
