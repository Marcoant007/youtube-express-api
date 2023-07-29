import { Request, Response } from "express";
import path from "path";
import { google } from "googleapis";
import credentials from '../auth/client_secret_1095389024206-r4sf9dv30f96ga06ot50b946t0pfq5lj.apps.googleusercontent.com.json';
import { oauth2 } from "googleapis/build/src/apis/oauth2";
const OAuth2 = google.auth.OAuth2;
import axios, { AxiosResponse } from "axios";
import { exec } from 'child_process';
import { Credentials } from "google-auth-library";
const youtube = google.youtube({ version: 'v3' });
import fs from "fs"

export async function uploadVideoService() {
  const oauth2 = await createOAuthClient();
  const consentUrl = oauth2.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube'],
    response_type: 'code'
  });
  return consentUrl;
};

async function createOAuthClient() {
  const OAuthCliente = new OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
  );
  return OAuthCliente;
};

export async function getTokenUserAuthorization(authorizationCode: string) {
  const oauth2Client = await createOAuthClient();
  const { tokens } = await oauth2Client.getToken(authorizationCode);
  oauth2Client.setCredentials(tokens);
  const oauth = {
    oauth2Client,
    tokens
  }
  return oauth;
};

export async function googleGlobalOauhAuthenication(oauth2Client: any, tokens: Credentials) {
  google.options({
    auth: oauth2Client
  });
}

export async function youtubeSendVideo(file: any){
  const videoFilePath = file.path;
  const videoFileSize = file.size;
  const videoTitle = file.originalname;
  const videoTags = ['default']; // tags devem ser um array de strings
  const videoDescription = "upload video from youtube api";

  const requestParameters = {
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title: videoTitle,
        description: videoDescription,
        tags: videoTags
      },
      status: {
        privacyStatus: 'unlisted'
      }
    },
    media: {
      body: fs.createReadStream(videoFilePath)
    }
  }
  const youtubeResponse = await youtube.videos.insert(requestParameters, { // Adicionado await aqui
  });

  const message = `Video available at https://youtu.be/${youtubeResponse.data.id}`
  
  // const videoId = youtubeResponse.data.id;
  // const videoThumbnalFilePath = '../img/images.jpg';

  // if (videoId) { // Adicionada verificação aqui
  //   const requestParametersThumb = {
  //     videoId: videoId,
  //     media: {
  //       mimeType: 'image.jpeg',
  //       body: fs.createReadStream(videoThumbnalFilePath)
  //     }
  //   }

  //   const youtubeResponseThumb = await youtube.thumbnails.set(requestParametersThumb)
  //   console.log('Thumb uploaded');

    
  // } else {
  //   console.log('Video ID is null. Thumbnail was not set.');
  // }

  return message;
}


// {
//   "fieldname": "file",
//   "originalname": "Valorant 2023.06.30 - 01.07.04.02.DVR.mp4",
//   "encoding": "7bit",
//   "mimetype": "video/mp4",
//   "destination": "src/upload/",
//   "filename": "1690670261057.mp4",
//   "path": "src\\upload\\1690670261057.mp4",
//   "size": 493639442
// }


