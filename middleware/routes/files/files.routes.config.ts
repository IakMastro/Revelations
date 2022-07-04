import {CommonRoutesConfig} from "../../common/common.routes.config";
import express              from "express";
import FilesController      from "./files.controller";
import FilesMiddleware      from "./files.middleware";

export class FilesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "FilesRoutes");
  }

  configureRoutes(): express.Application {
    this.app.route('/files/upload')
      .post(
        FilesMiddleware.validateUploadedFile,
        FilesMiddleware.validateRequiredPath,
        FilesController.uploadFile
      );

    return this.app;
  }
}