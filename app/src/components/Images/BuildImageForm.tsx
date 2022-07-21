import CodeEditor                 from '@uiw/react-textarea-code-editor';
import {useDispatch, useSelector} from "react-redux";
import {RootState}                        from "../../app/store";
import {setCode, setDataset, setLanguage} from "./buildImageSlice";
import {Dropdown, Button, Card}           from "react-bootstrap";
import {Dataset}                  from "../../interfaces/Dataset";
import axios                      from "axios";
import {useQuery}                 from "react-query";

import './BuildImageForm.scss'

async function getDatasets(): Promise<Dataset[]> {
  const response = await axios.get("http://localhost:5000/datasets");
  return response.data;
}

export default function BuildImageForm(): JSX.Element {
  const {isLoading, data} = useQuery('getDatasets', getDatasets);
  const {code, language, dataset} = useSelector((state: RootState) => state.buildImage);
  const dispatch = useDispatch();

  document.documentElement.setAttribute('data-color-mode', 'light');

  function buildMachine() {
    console.log(code, language);
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
          <Button variant={"primary"} onClick={buildMachine}>Build machine</Button>
        </Card.Footer>
      </Card>
    </>
  )
}