import axios                      from "axios";
import {useQuery}                 from "react-query";
import {useDispatch, useSelector} from "react-redux";
import {RootState}                from "../../app/store";
import {AgGridReact}              from "ag-grid-react";
import {useRef}                   from "react";
import {Button, Card, Spinner}      from "react-bootstrap";
import Container, {Network, Volume} from "../../interfaces/Container";

import './ContainersTable.scss';
import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-alpine.min.css'
import {setCurrentContainer}      from "./containerSlice";

async function getContainers(): Promise<any[]> {
  const response = await axios.get("http://localhost:5000/docker/list");
  return response.data;
}

export default function ContainersTable(): JSX.Element {
  const {isLoading, isError, error, refetch, data} = useQuery('getContainers', getContainers);
  const {columnDefs, currentContainer} = useSelector((state: RootState) => state.containers);
  const dispatch = useDispatch();

  const gridRef: any = useRef();

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

  function seeContainerDetails(event: any) {
    console.log(event.data.volumes[0]);
    dispatch(setCurrentContainer(event.data));
  }

  return (
    <Card style={{marginTop: ".5rem"}}>
      <Card.Header>Manage your containers</Card.Header>
      <Card.Body>
        <div className={"row"}>
          <div className={"col-sm-6"}>
            <h5>Currently running containers</h5>
            <div style={{height: "40rem", width: "40rem"}}>
              {isError && error instanceof Error &&
                  <span>Error: {error.message}</span>}
              {isLoading &&
                (<div>
                  <Spinner animation={"border"} role={"status"} size={"sm"}>
                    <span className={"visually-hidden"}>Loading...</span>
                  </Spinner>
                  <span>Loading...</span>
                </div>)}
              <AgGridReact
                ref={gridRef}
                className={"ag-theme-alpine"}
                rowData={parseContainers()}
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection={'multiple'}
                onCellClicked={seeContainerDetails}
              />
            </div>
          </div>

          <div style={{marginTop: "2rem"}} className={"col-sm-6"}>
            {currentContainer && (
              <Card>
                <Card.Header>Selected container details</Card.Header>
                <Card.Text>
                  <div>
                    <p><b>ID:</b> {currentContainer.id}</p>
                    <b>Names:</b>
                    <ul>
                      {currentContainer.names.map((name: string) => {
                        return <li>{name}</li>
                      })}
                    </ul>
                    <b>Ports:</b>
                    <ul>
                      {currentContainer.ports.map((port: number) => {
                        return <li>{port}</li>
                      })}
                    </ul>
                    <p><b>State:</b> {currentContainer.state}</p>
                    <p><b>Status:</b> {currentContainer.status}</p>
                    <b>IP Addresses:</b>
                    <ul>
                      {currentContainer.networks.map((network: Network) => {
                        return <li>{network.ipAddress}</li>
                      })}
                    </ul>
                    <b>Volumes:</b>
                    <ul>
                      {currentContainer.volumes.map((volume: Volume) => {
                        return <li>{volume.path}</li>
                      })}
                    </ul>
                  </div>
                </Card.Text>
                <Card.Footer>
                  <Button variant={"danger"}>Stop Container</Button>
                </Card.Footer>
              </Card>
            )}
            {!currentContainer &&
                <h5>Please, select a container</h5>
            }
          </div>
        </div>
      </Card.Body>
    </Card>
  )
};