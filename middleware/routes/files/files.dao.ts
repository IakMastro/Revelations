import debug           from 'debug';
import {UploadFileDto} from "./dto/UploadFile.dto";

const log: debug.IDebugger = debug('app:in-memory-dao');

class FilesDao {
  constructor() {
    log('Created new instance of FilesDao');
  }

  async uploadFile(uploadFileDto: UploadFileDto): Promise<string> {
    uploadFileDto.file.mv(`${uploadFileDto.path}`, (err: Error) => {
      if (err) {
        throw err;
      }
    });
    return "File uploaded successfully";
  }
}

export default new FilesDao;