import axios                        from "axios";
import {useMutation, useQuery}      from "react-query";
import {useDispatch, useSelector}   from "react-redux";
import {RootState}                  from "../../app/store";
import {AgGridReact}                from "ag-grid-react";
import React, {useRef}              from "react";
import {Button, Card, Spinner}      from "react-bootstrap";
import Container, {Network, Volume} from "../../interfaces/Container";
import {setCurrentContainer}        from "./containerSlice";

import './ContainersTable.scss';
import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-alpine.min.css'

async function getContainers(): Promise<any[]> {
  const response = await axios.get("http://localhost:5000/docker/list");
  return response.data;
}

async function stopContainer(containerId: string): Promise<any[]> {
  const response = await axios.post("http://localhost:5000/docker/stop", {
    id: containerId
  });
  return response.data;
}

export default function ContainersTable(): JSX.Element {
  const {isLoading, isError, error, data} = useQuery('getContainers', getContainers);
  const stopContainerMutation = useMutation(stopContainer);
  const {currentContainer} = useSelector((state: RootState) => state.containers);
  const dispatch = useDispatch();

  function parseName(name: string) {
    return name
      .replaceAll("\"", "")
      .replaceAll("/", "")
      .replaceAll("-", " ")
      .replaceAll(/(^\w)|(\s+\w)/g, (match: string) =>
        match.toUpperCase()
      );
  }

  function parseContainers(): Container[] {
    if (data) {
      return data?.map((container: Container) => {
        return {
          id: container.id,
          names: container.names.map((name: string) => parseName(name)),
          ports: container.ports,
          state: container.state.replaceAll(/(^\w)|(\s+\w)/g, (match: string) => match.toUpperCase()),
          status: container.status,
          networks: container.networks,
          volumes: container.volumes
        }
      });
    }
    return [];
  }

  function seeContainerDetails(container: Container) {
    dispatch(setCurrentContainer(container));
  }

  return (
    <div>
      <div className={"p-6 grid grid-cols-2 gap-2"}>
        <div>
          <h5 className={"text-gray-900 text-xl font-medium mb-2"}>
            Currently running machines
            {isError && error instanceof Error &&
                <div className={"bg-red-100 rounded-lg py-4 px-6 mb-4 text-base text-red-700 mb-3"} role={"alert"}>
                    <span>Error: {error.message}</span>
                </div>
            }
            {isLoading && (
              <div className={"bg-purple-100 rounded-lg py-3 px-6 mb-4 text-base text-purple mb-3"} role={"alert"}>
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
                     role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </h5>
          <div className={"flex flex-col"}>
            <div className={"overflow-x-auto sm:-mx-6 lg:-mx-8"}>
              <div className={"py-4 inline-block min-w-full sm:px-6 lg:px-8"}>
                <div className={"overflow-hidden"}>
                  <table className={"min-w-full text-center"}>
                    <thead className={"border-b bg-gray-800"}>
                    <tr>
                      <th scope={"col"} className={"text-sm font-medium text-white px-6 py-4"}>
                        Names
                      </th>
                      <th scope={"col"} className={"text-sm font-medium text-white px-6 py-4"}>
                        State
                      </th>
                      <th scope={"col"} className={"text-sm font-medium text-white px-6 py-4"}>
                        Actions
                      </th>
                    </tr>
                    </thead>

                    <tbody>
                    {data && parseContainers().map((container: Container) => (
                      <tr className={"bg-white border-b"}>
                        <td className={"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"}>
                          {container.names}
                        </td>
                        <td className={"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"}>
                          {container.state}
                        </td>
                        <td>
                          <button
                            className={"inline-flex items-center justify-center h-10 gap-2 px-5 text-sm" +
                              " font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap" +
                              " bg-emerald-500 ring-offset-2 hover:bg-emerald-600 focus:bg-emerald-600 focus:ring-2 " +
                              "focus:ring-emerald-300 disabled:cursor-not-allowed disabled:border-emerald-300 " +
                              "disabled:bg-emerald-300 disabled:shadow-none"}
                            onClick={() => seeContainerDetails(container)}
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
          {!currentContainer && (
            <h5>Please select a machine</h5>
          )}
          {currentContainer && (
            <div>
              <h5 className={"text-gray-900 text-xl font-medium mb-2"}>
                Selected machine details
              </h5>
              <div className={"py-6"}>
                <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
                  ID: {currentContainer.id}
                </h5>
                <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
                  Names:
                </h5>
                <ul className={"bg-white rounded-lg border border-gray-200 w-96 text-gray-900"}>
                  {currentContainer.names.map((name: string) => {
                    return <li className={"px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"}>
                      {name}
                    </li>
                  })}
                </ul>
                <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
                  Ports:
                </h5>
                <ul className={"bg-white rounded-lg border border-gray-200 w-96 text-gray-900"}>
                  {currentContainer.ports.map((ports: number) => {
                    return <li className={"px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"}>
                      {ports}
                    </li>
                  })}
                </ul>
                <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
                  IP Addresses:
                </h5>
                <ul className={"bg-white rounded-lg border border-gray-200 w-96 text-gray-900"}>
                  {currentContainer.networks.map((network: Network) => {
                    return <li className={"px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"}>
                      {network.ipAddress}
                    </li>
                  })}
                </ul>
                {currentContainer.volumes && (
                  <>
                    <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
                      Volumes:
                    </h5>
                    <ul className={"bg-white rounded-lg border border-gray-200 w-96 text-gray-900"}>
                      {currentContainer.volumes.map((volume: Volume) => {
                        return <li className={"px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"}>
                          {volume.path}
                        </li>
                      })}
                    </ul>
                  </>
                )}

                <button
                  className={"inline-flex items-center justify-center h-10 gap-2 px-5 text-sm" +
                    " font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap" +
                    " bg-red-500 ring-offset-2 hover:bg-red-600 focus:bg-emerald-600 focus:ring-2 " +
                    "focus:ring-red-300 disabled:cursor-not-allowed disabled:border-red-300 " +
                    "disabled:bg-red-300 disabled:shadow-none mx-2"}
                  onClick={() => stopContainerMutation.mutate(currentContainer.id)}
                >
                  <span>Stop container</span>
                </button>
              </div>
            </div>
            )}
        </div>
      </div>
    </div>
  )
};