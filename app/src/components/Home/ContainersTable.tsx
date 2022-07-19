import axios                      from "axios";
import {useMutation, useQuery}    from "react-query";
import {useDispatch, useSelector} from "react-redux";
import {RootState}                  from "../../app/store";
import {AgGridReact}                from "ag-grid-react";
import {useRef}                     from "react";
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
  const {isLoading, isError, error, refetch, data} = useQuery('getContainers', getContainers);
  const stopContainerMutation = useMutation(stopContainer);
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
    dispatch(setCurrentContainer(event.data));
  }

  function stopContainerButton(): void {
    if (currentContainer) {
      stopContainerMutation.mutate(currentContainer.id);
      setCurrentContainer(undefined);
    }
  }

  return (
    <Card style={{marginTop: ".5rem"}}>
      <Card.Header>Manage your machines</Card.Header>
      <Card.Body>
        <div className={"row"}>
          <div className={"col-sm-4"}>
            <h5>Currently running machines</h5>
            <div style={{height: "40rem", width: "25rem"}}>
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

          <div style={{marginTop: "2rem"}} className={"col-sm-8"}>
            {currentContainer && (
              <Card>
                <Card.Header>Selected machine details</Card.Header>
                <Card.Text>
                  <div style={{marginTop: '.5rem', marginLeft: '.5rem'}}>
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
                  <Button onClick={stopContainerButton} variant={"danger"}>Stop Machine</Button>
                </Card.Footer>
              </Card>
            )}
            {!currentContainer &&
                <h5>Please, select a machine</h5>
            }
          </div>
        </div>
      </Card.Body>
    </Card>
  )
};