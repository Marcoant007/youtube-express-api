import { Router } from "express";
import youtubeRoutes from "../controller/youtube-controller";

const router = Router();
router.use('/', youtubeRoutes);
export {router};