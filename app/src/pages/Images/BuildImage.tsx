import React             from "react";
import {Card, Container} from "react-bootstrap";
import BuildImageForm    from "../../components/Images/BuildImageForm";

class BuildImage extends React.Component {
  render() {
    return (
      <Container>
        <BuildImageForm />
      </Container>
    )
  }
}

export default BuildImage;