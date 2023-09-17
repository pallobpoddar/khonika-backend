/*
 * Filename: app.js
 * Author: Pallob Poddar
 * Date: September 17, 2023
 * Description: Root module: it connects the server with the routes and database
 */

// Imports necessary modules
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const HTTP_STATUS = require("./constants/statusCodes");
const sendResponse = require("./util/common");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const transactionRouter = require("./routes/transaction-routes");
const cartRouter = require("./routes/cart-routes");
const reviewRouter = require("./routes/review-routes");
const databaseConnection = require("./config/database");

// Loads environment variables from .env file
dotenv.config();

// Enables CORS for all routes
app.use(cors());

// Middleware to parse JSON, text and URL-encoded request bodies
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// If the user provides invalid json object, it returns an error
app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		return sendResponse(
			res,
			HTTP_STATUS.BAD_REQUEST,
			"Invalid JSON error",
			"Bad request"
		);
	}
	next();
});

// Sets up the routes; if the user provides any other routes, it returns an error
app.use("/api/auths", authRouter);
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/carts", cartRouter);
app.use("/api/reviews", reviewRouter);
app.use(async (req, res) => {
	return sendResponse(
		res,
		HTTP_STATUS.NOT_FOUND,
		"Page not found",
		"Not found"
	);
});

// Connection with the database
databaseConnection(() => {
	app.listen(8000, () => {
		console.log("Server is running on 8000");
	});
});
