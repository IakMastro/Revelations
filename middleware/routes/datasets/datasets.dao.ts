import debug              from "debug";
import mongooseService    from "../../common/services/mongoose.service";
import shortid            from "shortid";
import {DatasetDto} from "./dto/dataset.dto";
import axios              from "axios";

const log: debug.IDebugger = debug("app:datasets-dao");

/**
 * @class
 * @classdesc The Data Access Object class for the Datasets route
 * @member Schema
 * @member datasetSchema
 * @member DatasetModel
 */
class DatasetsDao {
  /**
   * @desc The Schema type from Mongoose
   * @access public
   */
  Schema = mongooseService.getMongoose().Schema;

  /**
   * @desc The custom schema made for the datasets
   * @access public
   */
  datasetSchema = new this.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate()
      },
      name: {
        type: String
      },
      description: {
        type: String
      },
      data: {
        type: Object,
        default: []
      },
      created: {
        type: Date,
        default: Date.now
      }
    }
  );

  /**
   * @desc The Mongoose Model for the Schema
   * @access public
   */
  DatasetModel = mongooseService.getMongoose().model("Datasets", this.datasetSchema);

  constructor() {
    log("Created new instance of DatasetsDao");
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It returns the data from the local dataset that the path shows to
   * @param {string} path
   * @returns {object[]} The local dataset's data given by the path
   */
  async getData(path: string): Promise<object[]> {
    let res = await axios.post("http://dataset-api:5000/", {path: path});
    return res.data;
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It saves the content of the dataset to the Mongo database
   * @param {DatasetDto} datasetDto
   * @returns {Promise<any>} the dataset that is saved on the database
   */
  async createDataset(datasetDto: DatasetDto): Promise<any> {
    try {
      const dataset = new this.DatasetModel(
        {
          _id: shortid.generate(),
          name: datasetDto.name,
          description: datasetDto.description,
          data: datasetDto.data
        }
      );

      await dataset.save();
      return dataset;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @method
   * @async
   * @access public
   * @param {number} [limit=25] - Limits the results returned from the database
   * @param {number} [page=0] - Returns different pages of the datasets
   * @returns Limited datasets based on the query asked by the client
   */
  async getDatasets(limit: number = 25, page: number = 0): Promise<any> {
    return await this.DatasetModel.find().limit(limit).skip(page * limit);
  }

  /**
   * @method
   * @async
   * @access public
   * @param {string} id
   * @returns The dataset object that matches this ID
   */
  async getDatasetById(id: string): Promise<any> {
    return await this.DatasetModel.findById(id);
  }

  /**
   * @method
   * @async
   * @access public
   * @param {string} name
   * @returns The dataset object that matches this name
   */
  async getDatasetByName(name: string): Promise<any> {
    return await this.DatasetModel.findOne({name: name});
  }
}

export default new DatasetsDao();