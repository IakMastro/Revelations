import {Dataset} from "../interfaces/Dataset";
import axios     from "axios";

let url: string = "http://localhost:5000/datasets";

type DatasetFormValues = {
  name: string;
  description: string;
  file: any;
}

async function getDatasets(): Promise<Dataset[]> {
  const {data} = await axios.get(url);
  return data;
}

async function uploadDataset(dataset: DatasetFormValues): Promise<any> {
  try {
    const {data} = await axios.post(url, {
      name: dataset.name,
      description: dataset.description,
      path: dataset.file[0].name
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
}

export {getDatasets, uploadDataset}