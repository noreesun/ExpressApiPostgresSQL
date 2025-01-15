//import express module
import Express from "express";

//import dotenv module
import dotenv from "dotenv";

//import cors module
import cors from "cors";

//import db module
import pool from "./utils/db";
import { Client } from './../node_modules/@types/pg/index.d';

//import productController module
import { getAllProducts } from "./controller/productController";

//import router module
import productRoutes from "./routes/productRoutes";
import dbtestRoutes from "./routes/dbtestRoutes";
import userRoutes from "./routes/userRoutes";

//import swagger module
import setupSwagger from "./utils/swagger";

//Create a new express Server
const app = Express();

//middleware to enable CORS
app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: ["Content-Type,Authorization"],
    }
));

//middleware to parse the request body
app.use(Express.json());

//setup swagger
setupSwagger(app);

//Method to handle GET request
app.get("/", (req, res) => {
    res.send("Hello World");
});

//Route to display all 
app.use("/api/products", productRoutes);
app.use("/api", dbtestRoutes);
app.use("/api/users", userRoutes);


//Route to display all products can be used as part for versioning
app.use("/api/v2", productRoutes);
app.use("/api/v2", dbtestRoutes);


//Route to display all products ถ้าต้องการ part ตรง
app.use("", productRoutes);
app.use("", dbtestRoutes);

 
//Start Express Server
app.listen(process.env.PORT, () => {
    console.log(`Server started on http://${process.env.HOST}:${process.env.PORT}`);
});

 
