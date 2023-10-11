import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./database/initial.db.js";
import ItemRouter from "./routes/item-routes.js";

const app = express();
dotenv.config();

app.use(
	cors({
		origin: "*",
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/v1/api", ItemRouter);

app.use("*", (req, res) => {
	res.status(404).json({
		success: false,
		message: "Route not found",
		method: `${req.method} ${req.url} is not allowed`,
	});
});

app.use((err, req, res, next) => {
	return res.status(err.statusCode || 500).json({
		statusCode: err.statusCode || 500,
		success: false,
		message: err.message,
	});
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
	console.log(`App started on port ${port}`);
});
