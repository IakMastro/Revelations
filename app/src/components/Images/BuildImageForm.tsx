import CodeEditor                         from '@uiw/react-textarea-code-editor';
import {useDispatch, useSelector}         from "react-redux";
import React, {Fragment}                  from "react";
import {RootState}                        from "../../app/store";
import {setCode, setDataset, setLanguage} from "./buildImageSlice";
import {Dataset}                          from "../../interfaces/Dataset";
import axios                              from "axios";
import {useMutation, useQuery}            from "react-query";
import {Listbox, Transition}              from "@headlessui/react";
import './BuildImageForm.scss'

import {SubmitHandler, useForm}  from "react-hook-form";
import {CheckIcon, SelectorIcon} from "@heroicons/react/outline";

type ImageBuildFormValues = {
  tag: string;
}

interface FilesDto {
  language: string;
  code: string;
  dataset: Dataset;
}

interface Language {
  id: number;
  fullName: string;
  shortName: string;
  style: string;
  unavailable: boolean;
}


async function getDatasets(): Promise<Dataset[]> {
  const response = await axios.get("http://localhost:5000/datasets");
  return response.data;
}

async function sendFiles(filesDto: FilesDto): Promise<string> {
  const response = await axios.put("http://localhost:5000/docker/build", filesDto);
  return response.data;
}

async function buildImage(tag: string): Promise<string> {
  const response = await axios.post("http://localhost:5000/docker/build", {
    name: tag,
    path: "build"
  });
  return response.data;
}

const languages: Language[] = [
  {id: 1, fullName: "Python", shortName: "py", style: "text-blue-700", unavailable: false},
  {id: 2, fullName: "JavaScript", shortName: "js", style: "text-red-300", unavailable: true},
  {id: 3, fullName: "Rust", shortName: "ru", style: "text-orange-300", unavailable: true},
]

export default function BuildImageForm(): JSX.Element {
  const {isLoading, data} = useQuery('getDatasets', getDatasets);
  const filesMutation = useMutation(sendFiles);
  const buildImageMutation = useMutation(buildImage);
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);
  const [selectedDataset, setSelectedDataset] = React.useState(data ? data[0] : null);
  const {register, handleSubmit} = useForm<ImageBuildFormValues>();
  // const {code, language, dataset} = useSelector((state: RootState) => state.buildImage);
  const dispatch = useDispatch();

  document.documentElement.setAttribute('data-color-mode', 'light');

  const onSubmit: SubmitHandler<ImageBuildFormValues> = image => {
    // if (code && language && dataset) {
    //   filesMutation.mutate({code, language, dataset});
    //   if (image.tag) {
    //     buildImageMutation.mutate(image.tag);
    //   }
    // }
  }

  return (
    <>
      {/*<Card style={{marginTop: '.5rem'}}>*/}
      {/*  <Card.Header>Make your own machine</Card.Header>*/}
      {/*  <Card.Body>*/}
      {/*    <h5>Select your programming language of choice</h5>*/}
      {/*    <Dropdown>*/}
      {/*      <Dropdown.Toggle variant={"primary"} id={"language-dropdown"}>*/}
      {/*        Select programming language*/}
      {/*      </Dropdown.Toggle>*/}

      {/*      <Dropdown.Menu>*/}
      {/*        <Dropdown.Item onClick={() => dispatch(setLanguage("py"))}>Python</Dropdown.Item>*/}
      {/*      </Dropdown.Menu>*/}
      {/*    </Dropdown>*/}

      {/*    {language && (*/}
      {/*      <div>*/}
      {/*        <h5>Select your dataset you want to work with</h5>*/}
      {/*        <Dropdown>*/}
      {/*          <Dropdown.Toggle variant={"primary"} id={"dataset-dropdown"}>*/}
      {/*            Select dataset*/}
      {/*          </Dropdown.Toggle>*/}

      {/*          <Dropdown.Menu>*/}
      {/*            {!isLoading && data && data.map((dataset: Dataset) => {*/}
      {/*              return <Dropdown.Item onClick={() => dispatch(setDataset(dataset))}>*/}
      {/*                {dataset.name}*/}
      {/*              </Dropdown.Item>*/}
      {/*            })}*/}
      {/*          </Dropdown.Menu>*/}
      {/*        </Dropdown>*/}
      {/*      </div>*/}
      {/*    )}*/}

      {/*    {dataset && (*/}
      {/*      <div>*/}
      {/*        <h5>Your code</h5>*/}
      {/*        <CodeEditor*/}
      {/*          value={code}*/}
      {/*          className="w-tc-editor-var"*/}
      {/*          language={language}*/}
      {/*          placeholder={"Enter the code here"}*/}
      {/*          onChange={(evn) => dispatch(setCode(evn.target.value))}*/}
      {/*          padding={15}*/}
      {/*          style={{*/}
      {/*            fontSize: 15,*/}
      {/*            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </Card.Body>*/}
      {/*  <Card.Footer>*/}
      {/*    <Form onSubmit={handleSubmit(onSubmit)}>*/}
      {/*      <Form.Group className={"mb-3"} controlId={"imageNameForm"}>*/}
      {/*        <Form.Label>Give a name to the new machine</Form.Label>*/}
      {/*        <Form.Control {...register("tag")} type={"text"} placeholder={"Enter name"} />*/}
      {/*      </Form.Group>*/}

      {/*      <Button variant={"primary"} type={"submit"}>Build machine</Button>*/}
      {/*    </Form>*/}
      {/*  </Card.Footer>*/}
      {/*</Card>*/}

      <div className={"grid grid-cols-2 gap-2"}>
        <Listbox
          value={selectedLanguage}
          onChange={setSelectedLanguage}
        >
          <div className={"relative mt-1"}>
            <Listbox.Label>Select your programming language: </Listbox.Label>
            <Listbox.Button
              className={"relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md" +
                " focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2" +
                " focus-visible:ring-opacity-75 focus-visible:ring-offset-orange-300 sm:text-sm"}
            >
              <span className={"block truncate"}>{selectedLanguage.fullName}</span>
              <span className={"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"}>
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
            </Listbox.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options
                className={"absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg" +
                  " ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"}
              >
                {languages.map((language: Language) => {
                  return <Listbox.Option
                    key={language.id}
                    value={language}
                    disabled={language.unavailable}
                    className={({active}) => `relative cursor select-none py-2 pl-10 pr-4 grid grid-cols-2 
                    ${active ? 'bg-amber-100 text-amber-900' : language.unavailable ?
                                                               'text-gray-500' : 'text-gray-900'}`}
                  >
                    {({selected}) => (
                      <>
                      <span className={`${language.style} ${selected} ? 'font-medium : 'font-normal`}>
                        {language.fullName}
                      </span>
                        {selected ? (
                          <span className={"absolute inset-y-0 flex items-center pl-3 text-amber-600"}>
                            <CheckIcon className={"w-6 h-6"} aria-hidden={true}/>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        <Listbox
          value={selectedDataset}
          onChange={setSelectedDataset}
        >
          <div className={"relative mt-1"}>
            <Listbox.Label>Select your dataset you want to work with: </Listbox.Label>
            <Listbox.Button
              className={"relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md" +
                " focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2" +
                " focus-visible:ring-opacity-75 focus-visible:ring-offset-orange-300 sm:text-sm"}
            >
              <span
                className={"block truncate"}>{selectedDataset ? selectedDataset.name : "Please select a dataset"}</span>
              <span className={"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"}>
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
            </Listbox.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options
                className={"absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg" +
                  " ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"}
              >
                {data && data.map((dataset: Dataset) => (
                  <Listbox.Option
                    key={dataset.name}
                    value={dataset}
                    className={({active}) => `relative cursor select-none py-2 pl-10 pr-4 grid grid-cols-2 
                    ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`}
                  >
                    {({selected}) => (
                      <>
                      <span className={`${selected} ? 'font-medium : 'font-normal`}>
                        {dataset.name}: {dataset.description}
                      </span>
                        {selected ? (
                          <span className={"absolute inset-y-0 flex items-center pl-3 text-amber-600"}>
                            <CheckIcon className={"w-6 h-6"} aria-hidden={true}/>
                          </span>
                        ) : null}
                      </>)}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <div className={"mt-2"}>
        <h5>Your code</h5>
        <CodeEditor
          value={"test"}
          className={"w-tc-editor-var"}
          language={selectedLanguage.shortName}
          placeholder={"Enter the code here"}
          onChange={(evn) => dispatch(setCode(evn.target.value))}
          padding={15}
          style={{
            fontSize: 15,
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"mb-6"}>
          <input
            type={"text"}
            className={"form-control block w-full px-4 px-2 text-xl font-normal text-gray-700 bg-white" +
              " bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0" +
              " focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"}
            {...register("tag")}
            id={"tagForm"}
            placeholder={"Give machine name here"}
          />
        </div>

        <button className={"inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium" +
          " tracking-wide transition duration-300 rounded justify-self-center whitespace-nowrap bg-emerald-200" +
          " text-emerald-600 ring-offset-2 hover:bg-emerald-300 hover:text-emerald-700 focus:bg-emerald-300 " +
          "focus:text-emerald-700 focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed " +
          "disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"}>
          <span className={"order-2"}>Build Machine</span>
          <span className={"relative only:-mx-6"}>
              <svg
                xmlns={"http://www.w3.org/2000/svg"}
                className={"w-5 h-5"}
                fill={"none"}
                viewBox={"0 0 24 24"}
                stroke={"currentColor"}
                stroke-width={"2"}
                role={"graphics-symbol"}
                aria-labelledby={"title-16 desc-16"}>
                  <title id={"title-16"}>Icon title</title>
                  <desc id={"desc-16"}>
                      A more detailed description of the icon
                  </desc>
                  <path stroke-linecap={"round"} stroke-linejoin={"round"}
                        d={"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"}/>
              </svg>
            </span>
        </button>
      </form>
    </>
  )
}