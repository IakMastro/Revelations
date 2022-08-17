import {useQuery}                 from "react-query";
import Image                      from "../../interfaces/Image";
import {useDispatch, useSelector} from "react-redux";
import {RootState}                from "../../app/store";
import React                      from "react";

import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-alpine.min.css'
import {setCurrentImage}          from "./imageSlice";
import StartContainerForm         from "./StartContainerForm";
import {getImages}                from "../../services/images.service";

export default function ImagesTable(): JSX.Element {
  const {isLoading, isError, error, data} = useQuery('getImages', getImages);
  const {currentImage} = useSelector((state: RootState) => state.images);
  const dispatch = useDispatch();

  function seeImageDetails(image: Image) {
    dispatch(setCurrentImage(image));
  }

  return (
    <>
      <div className={"p-6 grid grid-cols-2 gap-2"}>
        <div>
          <h5 className={"text-gray-900 text-xl font-medium mb-2"}>
            Available Images
          </h5>
          {isError && error instanceof Error && (
            <div className={"bg-red-100 rounded-lg py-4 px-6 mb-4 text-base text-red-700 mb-3"} role={"alert"}>
              <span>Error: {error.message}</span>
            </div>
          )}
          {isLoading && (
            <div className={"bg-purple-100 rounded-lg py-3 px-6 mb-4 text-base text-purple mb-3"} role={"alert"}>
              <div className={"spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"}
                   role="status">
                <span className={"visually-hidden"}>Loading...</span>
              </div>
              <span className={"mx-2"}>Loading...</span>
            </div>
          )}
          <div className={"flex flex-col"}>
            <div className={"overflow-x-auto sm:-mx-6 lg:-mx-8"}>
              <div className={"py-4 inline-block min-w-full sm:px-6 lg:px-8"}>
                <div className={"overflow-hidden"}>
                  <table className={"min-w-full text-center"}>
                    <thead className={"border-b bg-gray-800"}>
                    <tr>
                      <th scope={"col"} className={"text-sm font-medium text-white px-6 py-4"}>
                        Machine
                      </th>
                      <th scope={"col"} className={"text-sm font-medium text-white px-6 py-4"}>
                        Operation
                      </th>
                    </tr>
                    </thead>

                    <tbody>
                    {data && data.map((image: Image) => (
                      <tr className={"bg-white border-b"}>
                        <td className={"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"}>
                          {image.tags}
                        </td>
                        <td>
                          <button
                            className={"inline-flex items-center justify-center h-10 gap-2 px-5 text-sm" +
                              " font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap" +
                              " bg-emerald-500 ring-offset-2 hover:bg-emerald-600 focus:bg-emerald-600 focus:ring-2 " +
                              "focus:ring-emerald-300 disabled:cursor-not-allowed disabled:border-emerald-300 " +
                              "disabled:bg-emerald-300 disabled:shadow-none"}
                            onClick={() => seeImageDetails(image)}
                          >
                            <span>See details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {!currentImage && (
            <h5>Please select a machine</h5>
          )}
          {currentImage && (
            <div>
              <h5 className={"text-gray-900 text-xl font-medium mb-2"}>
                Selected machine
              </h5>

              <div className={"py-6"}>
                <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
                  ID: {currentImage.id}
                </h5>

                <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
                  Tags
                </h5>

                <ul className={"bg-white rounded-lg border border-gray-200 w-96 text-gray-900"}>
                  {currentImage.tags.map((tag: string) => {
                    return <li className={"px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"}>
                      {tag}
                    </li>
                  })}
                </ul>

                <StartContainerForm image={currentImage}/>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}