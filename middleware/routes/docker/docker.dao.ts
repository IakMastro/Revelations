import { ListDockerDto }  from "./dto/list.docker.dto";
import { BuildDockerDto } from "./dto/build.docker.dto";
import { RunDockerDto }   from "./dto/run.docker.dto";
import { StopDockerDto }  from "./dto/stop.docker.dto";

import debug   from 'debug';
import axios   from "axios";
import {Image} from "./dto/list.images.dto";

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

  async getImages(): Promise<Image[]> {
    let response = await axios.get(`${this.api}/images`);
    let images = response.data.map((image: any) => {
      return {
        id: image.Id,
        tags: image.RepoTags
      }
    });
    return await images;
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
}

export default new DockerDao();