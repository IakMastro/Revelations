import { ListDockerDto } from "./list.docker.dto";
import { BuildDockerDto } from "./build.docker.dto";
import { RunDockerDto } from "./run.docker.dto";
import { StopDockerDto } from "./stop.docker.dto";

import debug from 'debug';
import axios from "axios";

const log: debug.IDebugger = debug('app:in-memory-dao');

class DockerDao {
  private api: string = 'http://docker-api:8080';

  constructor() {
    log('Created new instance of DockerDao');
  }

  async createContainer(container: BuildDockerDto): Promise<string> {
    let response = await axios.post(`${this.api}/build`, container);
    return await response.data.message;
  }

  async runContainer(container: RunDockerDto): Promise<string> {
    let response = await axios.post(`${this.api}/run`, container);
    return await response.data.id;
  }

  async getContainers(): Promise<ListDockerDto> {
    let response = await axios.get(`${this.api}/list`);
    return response.data;
  }

  async stopContainer(container: StopDockerDto): Promise<string> {
    let response = await axios.post(`${this.api}/stop`, container);
    return response.data.message;
  }

  async uploadFile(file: any, path: string): Promise<string> {
    file.mv(path, (err: Error) => {
      if (err) {
        return err;
      }
    })
    return "File uploaded successfully";
  }
}

export default new DockerDao();