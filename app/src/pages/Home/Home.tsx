import {Button, Card, Container, Form} from "react-bootstrap";
import ContainersTable                 from "../../components/Home/ContainersTable";
import React                           from "react";
import './Home.scss';
import UploadDatasetForm               from "../../components/Home/UploadDatasetForm";

class Home extends React.Component {
  render() {
    return (
      <Container>
        <ContainersTable/>
        <Card style={{marginTop: "2rem"}}>
          <Card.Header>Import data</Card.Header>
          <Card.Body>
            You can upload a dataset you find in the web! It can be a CSV, JSON, or XML file!
            <UploadDatasetForm/>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

export default Home;