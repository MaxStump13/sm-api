const express = require("express");
const db = require("./config/connection");
require("dotenv").config();
// Require model
const { User, Thought } = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./routes'));

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`API server is running on port ${PORT}!`);
	});
});