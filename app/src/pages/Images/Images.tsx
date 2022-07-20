import React             from "react";
import {Card, Container} from "react-bootstrap";
import ImagesTable       from "../../components/Images/ImagesTable";

class Images extends React.Component {
  render() {
    return (
      <Container>
        <Card style={{marginTop: ".5rem"}}>
          <Card.Header>Available Images</Card.Header>
          <Card.Body>
            <ImagesTable />
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Images;