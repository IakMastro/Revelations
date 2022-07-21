import React                     from "react";
import {Button, Card, Container} from "react-bootstrap";
import ImagesTable               from "../../components/Images/ImagesTable";
import {Link}                    from "react-router-dom";

class Images extends React.Component {
  render() {
    return (
      <Container>
        <Card style={{marginTop: ".5rem"}}>
          <Card.Header>Available Images</Card.Header>
          <Card.Body>
            <ImagesTable/>
          </Card.Body>
          <Card.Footer>
            <h5>Want something different?</h5>
            <Button variant={"primary"}>
              <Link to={"/images/build"} style={{color: "white", textDecoration: "none"}}>
                Click here to build your container
              </Link>
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

export default Images;