import axios from "axios";

const url = "http://localhost:5000/docker"

async function getContainers(): Promise<any[]> {
  const {data} = await axios.get(`${url}/list`);
  return data;
}

async function stopContainer(containerId: string): Promise<any[]> {
  const {data} = await axios.post(`${url}/stop`, {
    id: containerId
  });
  return data;
}

export {getContainers, stopContainer};