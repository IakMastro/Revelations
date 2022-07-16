import DatasetsDao        from "./datasets.dao";
import {DatasetDto} from "./dto/dataset.dto";

class DatasetsService {
  list(limit: number, page: number) {
    return DatasetsDao.getDatasets(limit, page);
  };

  async create(name: string, description: string, path: string): Promise<DatasetDto> {
    let data: object = await DatasetsDao.getData(path);
    let datasetDto: DatasetDto = {
      name: name,
      description: description,
      data: data
    };
    return DatasetsDao.createDataset(datasetDto);
  };

  readById(id: string): Promise<DatasetDto> {
    return DatasetsDao.getDatasetById(id);
  };

  readByName(name: string): Promise<DatasetDto> {
    return DatasetsDao.getDatasetByName(name);
  };
}

export default new DatasetsService();