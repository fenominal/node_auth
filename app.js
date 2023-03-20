// Main File of Project //

// import statements from node modules
import express from "express";
import dotenv from "dotenv";

// import cookieParser from "cookie-parser";

// import from files for other js file. //

//Connection file..
import connectDB from "./db/conn.js";

// Router Files..
import router from "./routers/user.js";
import secure from "./routers/secrate.js";
import productRouter from "./routers/productRoute.js";
import adminRouter from "./routers/adminRouter.js";
import platform from "./routers/platformRoter.js";
import ordersRouter from "./routers/orderRouter.js";

// Env file file
dotenv.config({ path: "./config/.env" });

console.log("============ Application Started ==========");
connectDB(); // call to the coonection function.

const app = express();

app.use(express.json({ limit: "30mb", extended: true })); // use for uplode file..
// app.use(cookieParser());// use coockie in project ..
app.use(express.urlencoded({ limit: "30mb", extended: true })); // use for encode url..

// aplication diffrent router location...
app.use("/", router); // normal router..
app.use("/api", secure); // authenticate router..
app.use("/prodcut", productRouter); // prodcut router..
app.use("/admin", adminRouter); // admin or aggregation router..
app.use("/platform", platform); // platform router..
app.use("/order", ordersRouter); // order router..

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.....`);
});
