import express         from 'express';
import debug           from "debug";
import {DatasetDto}    from "./dto/dataset.dto";
import DatasetsService from "./datasets.service";

const log: debug.IDebugger = debug("app:datasets-controller");

/**
 * @class
 * @classdesc The Contoller class for the Datasets route
 */
class DatasetsController {
  constructor() {
    log("Created new instance of DatasetsController");
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It returns a limited number of datasets based on the limit and the current page
   * @param {express.Request} req
   * @param {express.Response} res
   */
  async list(req: express.Request, res: express.Response) {
    const limit: number = Number(req.query.limit) || 25;
    const page: number = Number(req.query.page) || 0;
    const datasets = await DatasetsService.list(limit, page);
    res.status(200).json(datasets);
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It returns a dataset based on the ID given by the client
   * @param {express.Request} req
   * @param {express.Response} res
   */
  async getDatasetById(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    const dataset = await DatasetsService.readById(id);
    res.status(200).json(dataset);
  }

    /**
   * @method
   * @async
   * @access public
   * @desc It returns a dataset based on the name given by the client
   * @param {express.Request} req
   * @param {express.Response} res
   */
  async getDatasetByName(req: express.Request, res: express.Response) {
    const name: string = req.params.name;
    const dataset = await DatasetsService.readByName(name);
    res.status(200).json(dataset);
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It creates a new dataset on the Mongo Database based on the content of a local file given by the client
   * @param {express.Request} req
   * @param {express.Response} res
   */
  async createDataset(req: express.Request, res: express.Response) {
    try {
      let name: string = req.body.name;
      let description: string = req.body.description;
      let path: string = req.body.path;
      const dataset = await DatasetsService.create(name, description, path);
      res.status(201).json(dataset);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}

export default new DatasetsController();