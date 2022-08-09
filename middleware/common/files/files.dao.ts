import debug           from 'debug';
import {UploadFileDto} from "./dto/UploadFile.dto";

const log: debug.IDebugger = debug('app:in-memory-dao');

/**
 * @class
 * @classdesc The Data Access Object class for the Files route
 */
class FilesDao {
  constructor() {
    log('Created new instance of FilesDao');
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It uploads the file to the server and it saves it to the path that is given by the client
   * @param {UploadFileDto} uploadFileDto
   * @returns {Promise<string>} Returns message that everything ended successfuly or the error
   */
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