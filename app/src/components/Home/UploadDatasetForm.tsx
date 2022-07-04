import React                    from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import {Alert, Button, Form}    from "react-bootstrap";
import axios, {AxiosError}      from "axios";
import {useMutation}            from "react-query";

type DatasetFormValues = {
  name: string;
  file: any;
}

async function uploadDatasetFile(formData: FormData): Promise<any> {
  try {
    console.log(formData.get("file"));
    const response = await axios.post(
      "http://localhost:5000/files/upload",
      formData,
      {headers: {'Content-Type': 'multipart/form-data'}}
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export default function UploadDatasetForm(): JSX.Element {
  const fileMutation = useMutation(uploadDatasetFile);
  const {register, handleSubmit} = useForm<DatasetFormValues>();

  const onSubmit: SubmitHandler<DatasetFormValues> = dataset => {
    if (dataset.name && dataset.file) {
      let formData = new FormData();
      formData.append("file", dataset.file[0]);
      formData.append("path", "datasets");
      fileMutation.mutate(formData);
    }
  };

  return (
    <div>
      {fileMutation.isError &&
          <Alert variant="danger">Error on uploading file</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId={"datasetNameForm"}>
          <Form.Label>Dataset name</Form.Label>
          <Form.Control {...register("name")} type="text" placeholder="Enter dataset name"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId={"datasetFileForm"}>
          <Form.Label>Dataset file</Form.Label>
          <Form.Control {...register("file")} type="file" accept={".csv, .xls, .xlsx, .json"}/>
        </Form.Group>

        <Button variant={"primary"} type={"submit"}>Upload File</Button>
      </Form>
    </div>

  )
}