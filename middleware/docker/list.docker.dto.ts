export interface Network {
  id: string;
  ipAddress: string;
}

export interface Volume {
  name: string;
  path: string;
}

export interface ListDockerDto {
  id: string;
  names: string[];
  ports: number[];
  state: string;
  status: string;
  networks: Network[];
  volumes: Volume[];
}