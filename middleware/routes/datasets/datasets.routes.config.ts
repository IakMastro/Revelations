import express              from 'express'
import {CommonRoutesConfig} from "../../common/common.routes.config";
import DatasetsController   from "./datasets.controller";
import DatasetMiddleware    from "./datasets.middleware";
import DatasetsMiddleware   from "./datasets.middleware";

/**
 * @class
 * @classdesc The Routes Configuration class for Datasets route
 */
export class DatasetsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "DatasetRoutes");
  }

  configureRoutes(): express.Application {
    this.app
        .route("/datasets")
        .get(
          DatasetsController.list
        )
        .post(
          DatasetMiddleware.validateRequiredNamePathAndDescriptionFieldsExists,
          DatasetMiddleware.validateDatasetDoesNotNameExists,
          DatasetsController.createDataset
        );

    this.app
        .param('name', DatasetsMiddleware.validateDatasetNameExists)
        .route("/datasets/:name")
        .post(
          DatasetMiddleware.validateDatasetNameExists,
          DatasetsController.getDatasetByName
        );

    this.app
        .param('id', DatasetMiddleware.validateDatasetIdExists)
        .route("/datasets/:id")
        .get(
          DatasetsController.getDatasetById
        );

    return this.app;
  }
}