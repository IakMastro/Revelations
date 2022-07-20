import {CommonRoutesConfig} from "../../common/common.routes.config";
import DockerMiddleware     from "./docker.middleware";
import DockerController     from "./docker.controller";
import express              from 'express';

export class DockerRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "DockerRoutes");
  }

  configureRoutes(): express.Application {
    this.app.route('/docker/list')
        .get(DockerController.listContainers);

    this.app.route('/docker/images')
        .get(DockerController.listImages);

    this.app.route('/docker/run')
        .post(
          DockerMiddleware.validateRequiredRunFields,
          DockerController.runContainer
        );

    this.app.route('/docker/stop')
        .post(
          DockerMiddleware.validateRequiredStopFields,
          DockerController.stop
        );

    this.app.route('/docker/build')
        .post(
          DockerMiddleware.validateRequiredBuildFields,
          DockerController.build
        );

    return this.app;
  }
}