import Image              from "../../interfaces/Image";
import StartContainerForm from "./StartContainerForm";
import React              from "react";

type ImageDetailsProps = {
  image: Image;
}

export default class ImageDetails extends React.Component<ImageDetailsProps>{
  render() {
    return (
      <div>
        <h5 className={"text-gray-900 text-xl font-medium mb-2"}>
          Selected machine
        </h5>

        <div className={"py-6"}>
          <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
            ID: {this.props.image.id}
          </h5>

          <h5 className={"text-gray-900 text-xl font-medium mb-2 mx-1"}>
            Tags
          </h5>

          <ul className={"bg-white rounded-lg border border-gray-200 w-96 text-gray-900"}>
            {this.props.image.tags.map((tag: string) => {
              return <li className={"px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"}>
                {tag}
              </li>
            })}
          </ul>

          <StartContainerForm image={this.props.image}/>
        </div>
      </div>
    )
  }
}