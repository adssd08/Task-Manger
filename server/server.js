const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv");
const connectDB = require("./db/connect");
const taskRouter = require("./routes/tasks");
const app = express();

env.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1/tasks", taskRouter);

const port = process.env.PORT || 3001;

connectDB(process.env.MONGO_URI)
	.then(() => {
		console.log("Database Connected...");
		app.listen(port, () => {
			console.log(`Server Started at ${port}...`);
		});
	})
	.catch(err => {
		console.log(err);
	});
