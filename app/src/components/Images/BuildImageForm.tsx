import CodeEditor                         from '@uiw/react-textarea-code-editor';
import {useDispatch, useSelector}         from "react-redux";
import React                              from "react";
import {RootState}                        from "../../app/store";
import {setCode, setDataset, setLanguage} from "./buildImageSlice";
import {Dataset}                          from "../../interfaces/Dataset";
import {useMutation, useQuery}            from "react-query";
import './BuildImageForm.scss'

import {SubmitHandler, useForm}       from "react-hook-form";
import {Button, Card, Dropdown, Form} from 'react-bootstrap';
import {buildImage, sendFiles}        from "../../services/build.images.service";
import {getDatasets}                  from "../../services/datasets.service";

type ImageBuildFormValues = {
  tag: string;
}

export default function BuildImageForm(): JSX.Element {
  const {isLoading, data} = useQuery('getDatasets', getDatasets);
  const filesMutation = useMutation(sendFiles);
  const buildImageMutation = useMutation(buildImage);
  const {register, handleSubmit} = useForm<ImageBuildFormValues>();
  const {code, language, dataset} = useSelector((state: RootState) => state.buildImage);
  const dispatch = useDispatch();

  document.documentElement.setAttribute('data-color-mode', 'light');

  const onSubmit: SubmitHandler<ImageBuildFormValues> = image => {
    if (code && language && dataset) {
      filesMutation.mutate({code, language, dataset});
      if (image.tag) {
        buildImageMutation.mutate(image.tag);
      }
    }
  }

  return (
    <>
      <Card style={{marginTop: '.5rem'}}>
        <Card.Header>Make your own machine</Card.Header>
        <Card.Body>
          <h5>Select your programming language of choice</h5>
          <Dropdown>
            <Dropdown.Toggle variant={"primary"} id={"language-dropdown"}>
              Select programming language
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => dispatch(setLanguage("py"))}>Python</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {language && (
            <div>
              <h5>Select your dataset you want to work with</h5>
              <Dropdown>
                <Dropdown.Toggle variant={"primary"} id={"dataset-dropdown"}>
                  Select dataset
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {!isLoading && data && data.map((dataset: Dataset) => {
                    return <Dropdown.Item onClick={() => dispatch(setDataset(dataset))}>
                      {dataset.name}
                    </Dropdown.Item>
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}

          {dataset && (
            <div>
              <h5>Your code</h5>
              <CodeEditor
                value={code}
                className="w-tc-editor-var"
                language={language}
                placeholder={"Enter the code here"}
                onChange={(evn) => dispatch(setCode(evn.target.value))}
                padding={15}
                style={{
                  fontSize: 15,
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              />
            </div>
          )}
        </Card.Body>
        <Card.Footer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className={"mb-3"} controlId={"imageNameForm"}>
              <Form.Label>Give a name to the new machine</Form.Label>
              <Form.Control {...register("tag")} type={"text"} placeholder={"Enter name"}/>
            </Form.Group>

            <Button variant={"primary"} type={"submit"}>Build machine</Button>
          </Form>
        </Card.Footer>
      </Card>
    </>
  )
}