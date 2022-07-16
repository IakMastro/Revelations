import axios                   from "axios";
import {useQuery}              from "react-query";
import {useSelector}           from "react-redux";
import {RootState}             from "../../app/store";
import {AgGridReact}           from "ag-grid-react";

import './ContainersTable.scss';
import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-alpine.min.css'
import {useRef}                from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import Container               from "../../interfaces/Container";

async function getContainers(): Promise<any[]> {
  const response = await axios.get("http://localhost:5000/docker/list");
  return response.data;
}

export default function ContainersTable(): JSX.Element {
  const {isLoading, isError, error, refetch, data} = useQuery('getContainers', getContainers);
  const {columnDefs} = useSelector((state: RootState) => state.containers)

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
          id: container.id.slice(0, 10).concat("..."),
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
    console.log(event.data);
  }

  return (
    <Card style={{marginTop: ".5rem"}}>
      <Card.Header>Manage your containers</Card.Header>
      <Card.Body>
        <Button style={{marginBottom: '.5rem'}} variant={"outline-primary"} onClick={() => refetch}>Refresh Table</Button>
        <div style={{height: "14.5rem", width: "40rem"}}>
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
      </Card.Body>
    </Card>
  )

  // return (
  //   <div className={"containerTable"}>
  //     <Card>
  //       <Card.Header>Manage your containers</Card.Header>
  //       <Card.Body>
  //         <h3>Containers</h3>
  //         <Table striped bordered hover>
  //           <thead>
  //           <tr>
  //             <th>ID</th>
  //             <th>Names</th>
  //             <th>State</th>
  //             <th colSpan={30}>Actions</th>
  //           </tr>
  //           </thead>
  //           <tbody>
  //           {isError && error instanceof Error && <tr>
  //               <td>Error: {error.message}</td>
  //           </tr>}
  //           {
  //             data && data.map((container: Container) => {
  //               return (
  //                 <tr key={container.id}>
  //                   <td>{
  //                     container.id
  //                              .slice(0, 10)
  //                              .concat("...")}
  //                   </td>
  //                   <td>{
  //                     container.names
  //                              .map(
  //                                (name: string) =>
  //                                  name
  //                                    .replaceAll("\"", "")
  //                                    .replaceAll("/", "")
  //                                    .replaceAll("-", " ")
  //                                    .replaceAll(/(^\w)|(\s+\w)/g, (match: string) =>
  //                                      match.toUpperCase()
  //                                    )
  //                              )
  //                   }</td>
  //                   <td>{container.state
  //                                 .replaceAll(/(^\w)|(\s+\w)/g, (match: string) =>
  //                                   match.toUpperCase()
  //                                 )
  //                   }</td>
  //                   <td>
  //                     <Button style={{marginRight: ".5rem"}} variant={"outline-primary"}>Details</Button>
  //                     <Button variant={"outline-danger"}>Stop</Button>
  //                   </td>
  //                 </tr>
  //               );
  //             })
  //           }
  //           {!data && !isLoading && !isError && <tr>No containers currently running</tr>}
  //           </tbody>
  //         </Table>
  //         <Button variant={"outline-primary"} onClick={() => {
  //           refetch();
  //         }
  //         }>
  //           Refresh Table
  //         </Button>
  //       </Card.Body>
  //     </Card>
  //   </div>
  // );
}