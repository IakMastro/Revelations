import debug           from "debug";
import filesService    from "./files.service";
import express         from "express";
import {UploadFileDto} from "./dto/UploadFile.dto";

const log: debug.IDebugger = debug("app:files-controller");

class FilesController {
  async uploadFile(req: express.Request, res: express.Response) {
    let file: any = req.files?.file;
    let path = `/files/${req.body.path}/${file.name}`;
    let uploadFileDto: UploadFileDto = { file, path };
    let message = await filesService.upload(uploadFileDto);
    res.status(200).send(message);
  }
}

export default new FilesController();