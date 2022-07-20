import axios                          from "axios";
import {useMutation}                  from "react-query";
import {SubmitHandler, useForm}       from "react-hook-form";
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import React                          from "react";
import Image                          from "../../interfaces/Image";

type ContainerFormValues = {
  name: string;
  tag: string
}

interface StartContainerFormProps {
  image: Image;
}

async function startContainer(container: ContainerFormValues): Promise<any[]> {
  const response = await axios.post("http://localhost:5000/docker/run", container);
  return response.data;
}

export default function StartContainerForm({ image }: StartContainerFormProps): JSX.Element {
  const startContainerMutation = useMutation(startContainer);
  const {register, handleSubmit} = useForm<ContainerFormValues>();

  const onSubmit: SubmitHandler<ContainerFormValues> = container => {
    if (container.tag) {
      container.name = image.tags[0];
      console.log(container);
      startContainerMutation.mutate(container);
    }
  };

  return (
    <div>
      {startContainerMutation.isError &&
          <Alert variant="danger">Error on starting the machine</Alert>}

      {startContainerMutation.isLoading &&
          <Alert variant="primary">
              <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Starting the machine...</span>
              </Spinner>
              Starting the machine...
          </Alert>}

      {!startContainerMutation.isLoading && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className={"mb-3"} controlId={"containerNameForm"}>
            <Form.Label>Give a tag to the machine</Form.Label>
            <Form.Control {...register("tag")} type={"text"} placeholder={"Enter tag"} />
          </Form.Group>

          <Button variant={"primary"} type={"submit"}>Start Machine</Button>
        </Form>
      )}
    </div>
  )
}