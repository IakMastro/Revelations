export default interface Container {
  id: string;
  names: string[];
  ports: number[];
  state: string;
  status: string;
  networks: Network[];
  volumes: Volume[];
}

export interface Network {
  id: string;
  ipAddress: string;
}

export interface Volume {
  name: string;
  path: string;
}