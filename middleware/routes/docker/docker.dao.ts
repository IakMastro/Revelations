// TODO: Change the URL to a environment variable
import {ListDockerDto}  from "./dto/list.docker.dto";
import {BuildDockerDto} from "./dto/build.docker.dto";
import {RunDockerDto}   from "./dto/run.docker.dto";
import {StopDockerDto}  from "./dto/stop.docker.dto";
import {FileContentDto} from './dto/fileContent.dto';
import {Image}          from "./dto/list.images.dto";

import debug   from 'debug';
import axios   from "axios";
import * as fs from "fs";

const log: debug.IDebugger = debug('app:in-memory-dao');

/**
 * @class
 * @classdesc The Data Access Object class for the Docker route
 * @member api
 */
class DockerDao {
  /**
   * @desc The URL for the Docker API
   * @access private
   */
  private api: string = 'http://docker-api:8080';

  constructor() {
    log('Created new instance of DockerDao');
  }

  /**
   * @method
   * @async
   * @access public
   * @param {BuildDockerDto} container
   * @returns {Promise<string>} a message from the Docker API
   */
  async createContainer(container: BuildDockerDto): Promise<string> {
    let response = await axios.post(`${this.api}/build`, container);
    return await response.data.message;
  }

  /**
   * @method
   * @async
   * @access public
   * @returns {Promise<Image[]} the available images from the Docker API
   */
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

  /**
   * @method
   * @async
   * @access public
   * @param {RunDockerDto} container
   * @returns {Promise<string>} the ID of the new container assigned by Docker
   */
  async runContainer(container: RunDockerDto): Promise<string> {
    let response = await axios.post(`${this.api}/run`, container);
    return await response.data.id;
  }

  /**
   * @method
   * @async
   * @access public
   * @returns {Promise<ListDockerDto} the currently running container => docker ps
   */
  async getContainers(): Promise<ListDockerDto> {
    let response = await axios.get(`${this.api}/list`);
    return response.data;
  }

  /**
   * @method
   * @async
   * @access public
   * @param {StopDockerDto} container
   * @returns {Promise<string>} a message from the Docker API
   */
  async stopContainer(container: StopDockerDto): Promise<string> {
    let response = await axios.post(`${this.api}/stop`, container);
    return response.data.message;
  }

  /**
   * @method
   * @access public
   * @desc It uploads file to the common path that is mounted in this container and on the Docker API container
   * @param {FileContentDto[]} filesContent
   */
  writeFiles(filesContent: FileContentDto[]) {
    filesContent.forEach((fileContent: FileContentDto) => {
      fs.writeFile(fileContent.path, fileContent.content, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }
}

export default new DockerDao();