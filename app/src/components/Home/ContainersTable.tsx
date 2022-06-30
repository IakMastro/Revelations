import {Button, Card, Table} from "react-bootstrap";
import Container             from "../../interfaces/Container";
import axios                 from "axios";
import {useQuery}            from "react-query";
import './ContainersTable.scss';

async function getContainers(): Promise<any[]> {
  const response = await axios.get("http://localhost:5000/docker/list");
  return response.data;
}

export default function ContainersTable(): JSX.Element {
  const {isLoading, isError, error, refetch, data} = useQuery('getContainers', getContainers);

  return (
    <div className={"containerTable"}>
      <Card>
        <Card.Header>Manage your containers</Card.Header>
        <Card.Body>
          <h3>Containers</h3>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>ID</th>
              <th>Names</th>
              <th>State</th>
              <th colSpan={30}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {isLoading && <tr>
                <td>Loading...</td>
            </tr>}
            {isError && error instanceof Error && <tr>
                <td>Error: {error.message}</td>
            </tr>}
            {
              data && data.map((container: Container) => {
                return (
                  <tr key={container.id}>
                    <td>{
                      container.id
                               .slice(0, 10)
                               .concat("...")}
                    </td>
                    <td>{
                      container.names
                               .map(
                                 (name: string) =>
                                   name
                                     .replaceAll("\"", "")
                                     .replaceAll("/", "")
                                     .replaceAll("-", " ")
                                     .replaceAll(/(^\w)|(\s+\w)/g, (match: string) =>
                                       match.toUpperCase()
                                     )
                               )
                    }</td>
                    <td>{container.state
                                  .replaceAll(/(^\w)|(\s+\w)/g, (match: string) =>
                                    match.toUpperCase()
                                  )
                    }</td>
                    <td>
                      <Button style={{marginRight: ".5rem"}} variant={"outline-primary"}>Details</Button>
                      <Button variant={"outline-danger"}>Stop</Button>
                    </td>
                  </tr>
                );
              })
            }
            {!data && !isLoading && !isError && <tr>No containers currently running</tr>}
            </tbody>
          </Table>
          <Button variant={"outline-primary"} onClick={() => {
            refetch();
          }
          }>
            Refresh Table
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}