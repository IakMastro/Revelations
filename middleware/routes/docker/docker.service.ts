import DockerDao          from "./docker.dao";
import { ListDockerDto }  from "./dto/list.docker.dto";
import { RunDockerDto }   from "./dto/run.docker.dto";
import { StopDockerDto }  from "./dto/stop.docker.dto";
import { BuildDockerDto } from "./dto/build.docker.dto";

class DockerService {
  async build(resource: BuildDockerDto): Promise<string> {
    return await DockerDao.createContainer(resource);
  }

  async run(resource: RunDockerDto): Promise<string> {
    return await DockerDao.runContainer(resource);
  }

  async list(): Promise<ListDockerDto> {
    return await DockerDao.getContainers();
  }

  async stop(resource: StopDockerDto): Promise<string> {
    return await DockerDao.stopContainer(resource);
  }
}

export default new DockerService();