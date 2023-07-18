import { Router } from "express";
import youtubeRoutes from "../controller/youtube-controller";

const router = Router();
router.use('/app', youtubeRoutes);
export {router};