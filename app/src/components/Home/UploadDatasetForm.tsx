import React                    from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import {Alert, Button, Form}    from "react-bootstrap";

type DatasetFormValues = {
  name: string;
  file: string;
}

export default function UploadDatasetForm(): JSX.Element {
  const {register, handleSubmit} = useForm<DatasetFormValues>();

  const onSubmit: SubmitHandler<DatasetFormValues> = dataset => {
    if (dataset.name && dataset.file) {
      console.log("Uploading dataset:", dataset);
    }
  };

  return (
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
  )
}