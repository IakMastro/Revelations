import axios from "axios";

let url = "http://localhost:5000/docker/run";

type ContainerFormValues = {
  name: string;
  tag: string;
}

async function startContainer(container: ContainerFormValues): Promise<any[]> {
  const {data} = await axios.post(url, container);
  return data;
}

export {startContainer}