import { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import { getTokenUserAuthorization, googleGlobalOauhAuthenication, uploadVideoService, youtubeSendVideo } from "../services/youtube-service";

const youtubeRoutes = Router();
youtubeRoutes.get("/", async(request: Request, response: Response) => {
    const oauthUrl = await uploadVideoService();
    return response.render('oauth', { oauthUrl: oauthUrl });
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
           const youtubeVideo = await youtubeSendVideo(request.file);
           response.send(youtubeVideo);
        }
    } catch (error) {
        console.log(error);
    }
});

youtubeRoutes.get('/oauth/callback', async (request: Request, response: Response) => {
    try {
      const authCode = request.query.code as string;
      const oauth = await getTokenUserAuthorization(authCode);
      const acessToken = oauth.tokens.access_token;
      await googleGlobalOauhAuthenication(oauth.oauth2Client, oauth.tokens)
      return response.render('upload', {acessToken: acessToken});
    } catch (error) {
      console.log(error);
      return response.status(500).send('Error during authentication');
    }
  });



export default youtubeRoutes;

