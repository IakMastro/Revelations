import Container, {Network, Volume} from "../../interfaces/Container";
import React                        from "react";
import {useMutation}                from "react-query";
import {stopContainer}              from "../../services/container.service";

type ContainerDetailsProp = {
  container: Container
}

export default function ContainerDetails({container}: ContainerDetailsProp): JSX.Element {
  const stopContainerMutation = useMutation(stopContainer);

  return (
    <div>
      <h5 className={"text-gray-900 text-xl font-medium mb-2"}>
        Selected machine details
      </h5>
      <div className={"py-6"}>
        <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
          ID: {container.id}
        </h5>
        <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
          Names:
        </h5>
        <ul className={"bg-white rounded-lg border border-gray-200 w-96 text-gray-900"}>
          {container.names.map((name: string) => {
            return <li className={"px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"}>
              {name}
            </li>
          })}
        </ul>
        <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
          Ports:
        </h5>
        <ul className={"bg-white rounded-lg border border-gray-200 w-96 text-gray-900"}>
          {container.ports.map((ports: number) => {
            return <li className={"px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"}>
              {ports}
            </li>
          })}
        </ul>
        <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
          IP Addresses:
        </h5>
        <ul className={"bg-white rounded-lg border border-gray-200 w-96 text-gray-900"}>
          {container.networks.map((network: Network) => {
            return <li className={"px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"}>
              {network.ipAddress}
            </li>
          })}
        </ul>
        {container.volumes && (
          <>
            <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
              Volumes:
            </h5>
            <ul className={"bg-white rounded-lg border border-gray-200 w-96 text-gray-900"}>
              {container.volumes.map((volume: Volume) => {
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
          onClick={() => stopContainerMutation.mutate(container.id)}
        >
          <span>Stop container</span>
        </button>
      </div>
    </div>
  )
}