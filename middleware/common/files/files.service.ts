import FilesDao        from "./files.dao";
import {UploadFileDto} from "./dto/UploadFile.dto";

/**
 * @class
 * @classdesc The Service class for the Files route
 */
class FilesService {
  /**
   * @method
   * @async
   * @access public
   * @desc It uploads the file to the server and it saves it to the path that is given by the client
   * @param {UploadFileDto} uploadFileDto
   * @returns {Promise<string>} Returns a message that the upload was successful
   */
  async upload(uploadFileDto: UploadFileDto): Promise<string> {
    return await FilesDao.uploadFile(uploadFileDto);
  }
}

export default new FilesService();