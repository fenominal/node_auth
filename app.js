// Main File of Project //

// import statements from node modules
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// import from file.
import connectDB from "./db/conn.js";

// Router Files
import router from "./routers/user.js";
import secure from "./routers/secrate.js";
import productRouter from "./routers/productRoute.js";

// configuratio file
dotenv.config({ path: "./.env" });
console.log("============ Application Started ==========");
connectDB(); // call to the coonection function.

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/", router);
app.use("/api", secure);
app.use("/prodcut", productRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.....`);
});
