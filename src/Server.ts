import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import path from "path";
import { router } from "./routes/Routes";

const port = 3000;
const server = express();
server.use(express.json());
server.set('views', path.join(__dirname, '/views'));
server.set('view engine', 'ejs');
server.use(router);
server.listen(port, ()=> console.log(`Server is running ${port} 🚀 `));

export {server};