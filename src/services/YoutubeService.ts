import { Request, Response } from "express";
import path from "path";
import { google } from "googleapis";

async function uploadVideoService(filePath: any, title: string, description: string){
const OAuth2Data = path.join(__dirname , '/src/auth/client_secret_1095389024206-r4sf9dv30f96ga06ot50b946t0pfq5lj.apps.googleusercontent.com.json');
console.log(OAuth2Data);
}

export default uploadVideoService;