import FilesDao        from "./files.dao";
import {UploadFileDto} from "./dto/UploadFile.dto";

class FilesService {
  async upload(uploadFileDto: UploadFileDto): Promise<string> {
    return await FilesDao.uploadFile(uploadFileDto);
  }
}

export default new FilesService();