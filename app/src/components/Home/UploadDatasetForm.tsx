import React                          from 'react';
import {useForm, SubmitHandler}       from "react-hook-form";
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import axios                          from "axios";
import {useMutation}                  from "react-query";

type DatasetFormValues = {
  name: string;
  description: string;
  file: any;
}

async function uploadDatasetFile(formData: FormData): Promise<any> {
  try {
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

async function uploadDataset(dataset: DatasetFormValues): Promise<any> {
  try {
    const response = await axios.post(
      "http://localhost:5000/datasets",
      {
        name: dataset.name,
        description: dataset.description,
        path: dataset.file[0].name
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export default function UploadDatasetForm(): JSX.Element {
  const fileMutation = useMutation(uploadDatasetFile);
  const datasetMutation = useMutation(uploadDataset);
  const {register, handleSubmit} = useForm<DatasetFormValues>();

  const onSubmit: SubmitHandler<DatasetFormValues> = dataset => {
    if (dataset.name && dataset.description && dataset.file) {
      let formData = new FormData();
      formData.append("file", dataset.file[0]);
      formData.append("fileName", dataset.file[0].name);
      formData.append("path", "datasets");
      fileMutation.mutate(formData);
      datasetMutation.mutate(dataset);
    }
  };

  return (
    <div>
      {fileMutation.isError &&
          <Alert variant="danger">Error on uploading file</Alert>}

      {fileMutation.isLoading &&
          <Alert variant="primary">
              <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Uploading the file...</span>
              </Spinner>
              Uploading the file...
          </Alert>}

      {datasetMutation.isError &&
          <Alert variant="danger">Error on uploading the dataset</Alert>}

      {datasetMutation.isLoading &&
          <Alert variant="primary">
              <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Uploading the dataset to the database...</span>
              </Spinner>
              Uploading the dataset to the database...
          </Alert>}

      {!fileMutation.isLoading && !datasetMutation.isLoading && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId={"datasetNameForm"}>
            <Form.Label>Dataset Name</Form.Label>
            <Form.Control {...register("name")} type="text" placeholder="Enter dataset name"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId={"datasetDescriptionForm"}>
            <Form.Label>Dataset Description</Form.Label>
            <Form.Control {...register("description")} type="text" placeholder="Describe what the dataset is"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId={"datasetFileForm"}>
            <Form.Label>Dataset File</Form.Label>
            <Form.Control {...register("file")} type="file" accept={".csv, .xls, .xlsx, .json"}/>
          </Form.Group>

          <Button variant={"primary"} type={"submit"}>Upload File</Button>
        </Form>
      )}

    </div>

  )
}