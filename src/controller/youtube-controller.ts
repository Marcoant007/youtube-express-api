import { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import uploadVideoService from "../services/youtube-service";

const youtubeRoutes = Router();
youtubeRoutes.get("/", async(request: Request, response: Response) => {
    return response.render('index');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Adiciona a extensão
    }
});
  
const upload = multer({ storage: storage });
youtubeRoutes.post('/upload', upload.single('file'), async (request: Request, response: Response) => {
    try {
        if(!request.file) {
            response.send('Arquivo não enviado');
        } else {
           const title = request.file.filename; // update this
           const description = 'Ta subindo o videozin'; // update this
           console.log(title, description)
        //    await uploadVideoService(request.file.path, title, description);
           response.send('Upload successful');
        }
    } catch (error) {
        console.log(error);
    }
})

export default youtubeRoutes;

