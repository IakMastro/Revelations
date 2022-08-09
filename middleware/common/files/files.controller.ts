import debug           from "debug";
import filesService    from "./files.service";
import express         from "express";
import {UploadFileDto} from "./dto/UploadFile.dto";

const log: debug.IDebugger = debug("app:files-controller");

/**
 * @class
 * @classdesc The Controller class for the Files route
 */
class FilesController {
  /**
   * @method
   * @async
   * @access public
   * @desc It uploads the file to the server and it saves it to the path that is given by the client
   * @param {express.Request} req
   * @param {express.response} res
   */
  async uploadFile(req: express.Request, res: express.Response) {
    let file: any = req.files?.file;
    let path = `/files/${req.body.path}/${req.body.fileName}`;
    let uploadFileDto: UploadFileDto = { file, path };
    let message = await filesService.upload(uploadFileDto);
    res.status(200).send(message);
  }
}

export default new FilesController();