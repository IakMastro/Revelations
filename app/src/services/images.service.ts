import axios from "axios";
import Image from "../interfaces/Image";

let url = "http://localhost:5000/docker/images";

async function getImages(): Promise<Image[]> {
  const {data} = await axios.get(url);
  return data;
}

export {getImages}