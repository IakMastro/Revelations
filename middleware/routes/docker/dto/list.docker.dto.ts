/**
 * @interface
 * @member id
 * @member ipAddress
 */
export interface Network {
  id: string;
  ipAddress: string;
}

/**
 * @interface
 * @member name
 * @member path
 */
export interface Volume {
  name: string;
  path: string;
}

/**
 * @interface
 * @member id
 * @member names
 * @member ports
 * @member state
 * @member status
 * @member networks
 * @member volumes
 */
export interface ListDockerDto {
  id: string;
  names: string[];
  ports: number[];
  state: string;
  status: string;
  networks: Network[];
  volumes: Volume[];
}