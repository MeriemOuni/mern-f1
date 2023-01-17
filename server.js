// 1 require express
const express = require("express");

// 2 create instance
const app = express();

// 5 require dotenv & configure
require("dotenv").config();

// 8 Middleware bodyparser
app.use(express.json());

// 6 connect DB
const connectDB = require("./config/connectDB");
connectDB();

// 7 routes
app.use("/api/contact", require("./routes/contact"));

// 3 create PORT
const PORT = process.env.PORT;

// 4 create server
app.listen(PORT, (error) => {
	error
		? console.error(`Failed to connect to server !!!! ${error}`)
		: console.log(`Server is running on port ${PORT} ...`);
});
