---
sidebar_position: 4
---

# Middleware

Middleware is the component that binds all these together and makes it functionable!

## ExpressJS

Express is a fast, unopinionated, minimalist web framework for Node.js.

:::tip Minimal API

As always, check [the official documentation](https://expressjs.com/en/starter/hello-world.html) for the best way to learn express.

:::

## Structure

```
.
├── app.ts
├── babel.config.js
├── common
│   ├── common.routes.config.ts
│   ├── crud.interface.ts
│   ├── files
│   │   ├── dto
│   │   │   └── UploadFile.dto.ts
│   │   ├── files.controller.ts
│   │   ├── files.dao.ts
│   │   ├── files.middleware.ts
│   │   ├── files.routes.config.ts
│   │   └── files.service.ts
│   └── services
│       └── mongoose.service.ts
├── Dockerfile
├── jest.config.js
├── package.json
├── package-lock.json
├── routes
│   └── Write the routes here
├── test
│   └── Write the tests here
└── tsconfig.json
```

:::danger Try to follow the structure

No code will be accepted that doesn't follow the structure to the core!

:::

The structure follows a Model–view–controller (MVC) approach.

## Example - Files Route

Files is responsible for uploading the files to the server.

### Data Transferable Object

The **Data Transferable Object (DTO)** is an object that carries data between processes.

Let's see how a typical DTO should look like.

```ts title=dto/UploadFile.dto.ts
/**
 * @interface
 * @member file
 * @member path
 */
export interface UploadFileDto {
  file: any;
  path: string;
}
```

:::tip Always Comment

Follow JSDocs standards to have great documenation in this project

:::

### Data Access Object

The **Data Access Object (DAO)** is a pattern that provides an abstract interface to some type of database or other persistence mechanisms. Sometimes Mongoose is used in this file, other times it uploads file or calls objects from the Docker API.

```ts title=files.dao.ts
import debug           from 'debug';
import {UploadFileDto} from "./dto/UploadFile.dto";

const log: debug.IDebugger = debug('app:in-memory-dao');

/**
 * @class
 * @classdesc The Data Access Object class for the Files route
 */
class FilesDao {
  constructor() {
    log('Created new instance of FilesDao');
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It uploads the file to the server and it saves it to the path that is given by the client
   * @param {UploadFileDto} uploadFileDto
   * @returns {Promise<string>} Returns message that everything ended successfuly or the error
   */
  async uploadFile(uploadFileDto: UploadFileDto): Promise<string> {
    uploadFileDto.file.mv(`${uploadFileDto.path}`, (err: Error) => {
      if (err) {
        throw err;
      }
    });
    return "File uploaded successfully";
  }
}

export default new FilesDao;
```

### Service Data Object

A **Service Data Object (SDO)**, mostly refered to shortly by **Service** is a technology that allows heterogeneous data to be accessed in a uniform way.

```ts title=files.service.ts
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
```

### Controller

Controller accepts the input and converts it to the format needed for the service.

```ts title=files.controller.ts
import debug           from "debug";
import filesService    from "./files.service";
import express         from "express";
import {UploadFileDto} from "./dto/UploadFile.dto";

const log: debug.IDebugger = debug("app:files-controller");

/**
 * @class
 * @classdesc The Controller class for the Files route
 */
class FilesController {
  /**
   * @method
   * @async
   * @access public
   * @desc It uploads the file to the server and it saves it to the path that is given by the client
   * @param {express.Request} req
   * @param {express.response} res
   */
  async uploadFile(req: express.Request, res: express.Response) {
    let file: any = req.files?.file;
    let path = `/files/${req.body.path}/${req.body.fileName}`;
    let uploadFileDto: UploadFileDto = { file, path };
    let message = await filesService.upload(uploadFileDto);
    res.status(200).send(message);
  }
}

export default new FilesController();
```

:::tip Keep Service as simple as possible

Try to make Controller to parse the data and DAO to do the functions needed!

And keep it as asynchronous as possible!

:::

### Middleware

:::danger Don't mess it up with the name of this API

They are totally different things

:::

Middleware refers to the operations that checks if the data that is gonna be received by the Controller is completed and not missing anything!

```ts title=files.middleware.ts
import express from "express";

/**
 * @class
 * @classdesc The Middleware class for the Files route
 */
class FilesMiddleware {
  /**
   * @method
   * @access public
   * @desc It checks if the file is send to the server
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateUploadedFile(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded');
    } else {
      next();
    }
  }

  /**
   * @method
   * @access public
   * @desc It checks if the required path is given by the client
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateRequiredPath(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.path) {
      res.status(400).send('Missing required fields path');
    } else {
      next();
    }
  }

  /**
   * @method
   * @access public
   * @desc It checks if the required file name is given by the client
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateRequiredFileName(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.fileName) {
      res.status(400).send('Missing required fileName field');
    } else {
      next();
    }
  }
}

export default new FilesMiddleware();
```

### Route Configuration

This is the file that the routes is being configured. It inherits the CommonRoutesConfig, which is not needed to understand fully for this tutorial.

```ts title=files.routes.config.ts
import {CommonRoutesConfig} from "../common.routes.config";
import express              from "express";
import FilesController      from "./files.controller";
import FilesMiddleware      from "./files.middleware";

/**
 * @class
 * @classdesc The Routes Configuration class for Files route
 */
export class FilesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "FilesRoutes");
  }

  configureRoutes(): express.Application {
    this.app.route('/files/upload')
      .post(
        FilesMiddleware.validateUploadedFile,
        FilesMiddleware.validateRequiredPath,
        FilesMiddleware.validateRequiredFileName,
        FilesController.uploadFile
      );

    return this.app;
  }
}
```

:::tip Check the actual code

The code is very well documentated and with the help of this documenation, you will be ready to understand what's being done.

:::
