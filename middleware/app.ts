import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { CommonRoutesConfig } from './common/common.routes.config';
import { DockerRoutes } from './docker/docker.routes.config';
import debug from 'debug';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(fileUpload());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
}

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
  if (typeof global.it === 'function') {
    loggerOptions.level = 'http';
  }
}

app.use(expressWinston.logger(loggerOptions));
app.use(expressWinston.errorLogger(loggerOptions));

routes.push(new DockerRoutes(app));

const runningMessage: string = `Server running on port ${port}`;

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

export default server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  console.log(runningMessage);
});