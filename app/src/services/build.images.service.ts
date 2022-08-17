import FilesDto from "../dtos/files.dto";
import axios    from "axios";

const url = "http://localhost:5000/docker/build";

async function sendFiles(filesDto: FilesDto) {
  const {data} = await axios.put(url, filesDto)
  return data;
}

async function buildImage(tag: string): Promise<string> {
  const {data} = await axios.post(url, {
    name: tag,
    path: "build"
  });
  return data;
}

export { sendFiles, buildImage };