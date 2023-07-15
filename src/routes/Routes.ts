import { Router } from "express";
import youtubeRoutes from "../controller/YoutubeController";

const router = Router();
router.use('/app', youtubeRoutes);
export {router};