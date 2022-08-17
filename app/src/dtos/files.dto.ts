import {Dataset} from "../interfaces/Dataset";

export default interface FilesDto {
  language: string;
  code: string;
  dataset: Dataset;
}