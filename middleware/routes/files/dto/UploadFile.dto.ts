import {UploadedFile} from "express-fileupload";

export interface UploadFileDto {
  file: any;
  path: string;
}