import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.mjs";
import teacherGETRoutes from "./routes/teacherGETRoutes.mjs";
import teacherPOSTRoutes from "./routes/teacherPOSTRoutes.mjs";

const app = express();

app.set('view engine', 'ejs');

dotenv.config({ path: "config.env" });
connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", teacherGETRoutes);
app.use("/", teacherPOSTRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`The server has started: http://localhost:${port}`)
});