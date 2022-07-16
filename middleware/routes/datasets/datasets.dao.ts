import debug              from "debug";
import mongooseService    from "../../common/services/mongoose.service";
import shortid            from "shortid";
import {DatasetDto} from "./dto/dataset.dto";
import axios              from "axios";

const log: debug.IDebugger = debug("app:datasets-dao");

class DatasetsDao {
  Schema = mongooseService.getMongoose().Schema;

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

  DatasetModel = mongooseService.getMongoose().model("Datasets", this.datasetSchema);

  constructor() {
    log("Created new instance of DatasetsDao");
  }

  async getData(path: string): Promise<object[]> {
    let res = await axios.post("http://dataset-api:5000/", {path: path});
    return res.data;
  }

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

  async getDatasets(limit: number = 25, page: number = 0): Promise<any> {
    return await this.DatasetModel.find().limit(limit).skip(page * limit);
  }

  async getDatasetById(id: string): Promise<any> {
    return await this.DatasetModel.findById(id);
  }

  async getDatasetByName(name: string): Promise<any> {
    return await this.DatasetModel.findOne({name: name});
  }
}

export default new DatasetsDao();