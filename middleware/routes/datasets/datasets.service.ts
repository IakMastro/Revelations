import DatasetsDao        from "./datasets.dao";
import {DatasetDto} from "./dto/dataset.dto";

/**
 * @class
 * @classdesc The Service class for the Datasets route
 */
class DatasetsService {
  /**
   * @method
   * @access public
   * @param {number} [limit=25] - Limits the results returned from the database
   * @param {number} [page=0] - Returns different pages of the datasets
   * @returns Limited datasets based on the query asked by the client
   */
  list(limit: number, page: number) {
    return DatasetsDao.getDatasets(limit, page);
  };

  /**
   * @method
   * @async
   * @access public
   * @desc It saves the content of the dataset to the Mongo database
   * @param {string} name
   * @param {string} description
   * @param {string} path
   * @returns {Promise<DatasetDto>} the dataset that is saved on the database
   */
  async create(name: string, description: string, path: string): Promise<DatasetDto> {
    let data: object = await DatasetsDao.getData(path);
    let datasetDto: DatasetDto = {
      name: name,
      description: description,
      data: data
    };
    return DatasetsDao.createDataset(datasetDto);
  };

  /**
   * @method
   * @access public
   * @param {string} id
   * @returns The dataset object that matches this ID
   */
  readById(id: string): Promise<DatasetDto> {
    return DatasetsDao.getDatasetById(id);
  };

  /**
   * @method
   * @access public
   * @param {string} name
   * @returns The dataset object that matches this name
   */
  readByName(name: string): Promise<DatasetDto> {
    return DatasetsDao.getDatasetByName(name);
  };
}

export default new DatasetsService();