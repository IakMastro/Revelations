import React             from "react";
import BuildImageForm    from "../../components/Images/BuildImageForm";

class BuildImage extends React.Component {
  render() {
    return (
      <div className={"p-6"}>
        <h4 className={"text-gray-900 text-2xl font-medium mb-2 my-2"}>
          Make your own machine
        </h4>
        <BuildImageForm/>
      </div>
    )
  }
}

export default BuildImage;