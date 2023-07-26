import { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import { getTokenUserAuthorization, uploadVideoService } from "../services/youtube-service";

const youtubeRoutes = Router();
youtubeRoutes.get("/", async(request: Request, response: Response) => {
    return response.render('index');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/upload/');
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
           const oauthUrl = await uploadVideoService(request.file.path, title, description);
           response.render('oauth', { oauthUrl: oauthUrl });
        }
    } catch (error) {
        console.log(error);
    }
});

youtubeRoutes.get('/oauth/callback', async (request: Request, response: Response) => {
    try {
      const authCode = request.query.code as string;
      const tokens = await getTokenUserAuthorization(authCode);
      const acessToken = tokens.access_token;
      console.log(tokens)
      return response.render('youtubeSend', {acessToken: acessToken});
    } catch (error) {
      console.log(error);
      return response.status(500).send('Error during authentication');
    }
  });



export default youtubeRoutes;

