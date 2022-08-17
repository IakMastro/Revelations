import axios from "axios";

const url = "http://localhost:5000/files/upload";

async function uploadDatasetFile(formData: FormData): Promise<any> {
  try {
    const {data} = await axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data'}});
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export {uploadDatasetFile}