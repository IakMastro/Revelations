// Express and HTTP importing
import express   from 'express';
import * as http from 'http';

// Essential imports for configuration
import * as winston         from 'winston';
import * as expressWinston  from 'express-winston';
import cors                 from 'cors';
import fileUpload           from 'express-fileupload';
import debug                from 'debug';

// Routes imports
import {CommonRoutesConfig} from './common/common.routes.config';
import {DockerRoutes}       from './routes/docker/docker.routes.config';
import {FilesRoutes}        from "./common/files/files.routes.config";
import {DatasetsRoutes}     from "./routes/datasets/datasets.routes.config";

// Initialize API
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 5000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

// Configure API's parameters
app.use(express.json());
app.use(fileUpload(
  {
    createParentPath: true,
  }
));
app.use(cors());

// Configure logs
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({all: true})
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

// Add the routes to the router
routes.push(new DockerRoutes(app));
routes.push(new FilesRoutes(app));
routes.push(new DatasetsRoutes(app));

const runningMessage: string = `Server running on port ${port}`;

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

// Run the API
export default server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  console.log(runningMessage);
});