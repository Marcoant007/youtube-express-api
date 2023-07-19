import { Request, Response } from "express";
import path from "path";
import { google } from "googleapis";
import credentials from '../auth/client_secret_1095389024206-r4sf9dv30f96ga06ot50b946t0pfq5lj.apps.googleusercontent.com.json';
import { oauth2 } from "googleapis/build/src/apis/oauth2";
const OAuth2 = google.auth.OAuth2;


async function uploadVideoService(filePath: any, title: string, description: string) {
  const oauth2 = await createOAuthClient();
  const consentUrl = oauth2.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube'],
  })

  console.log(`✅ Me passa seus consetimento seu porqueira ${consentUrl}`);

}

async function createOAuthClient() {
    const OAuthCliente = new OAuth2(
        credentials.web.client_id,
        credentials.web.client_secret,
        credentials.web.redirect_uris[0]
    )

    return OAuthCliente;
}

export default uploadVideoService;