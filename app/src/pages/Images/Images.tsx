import React       from "react";
import ImagesTable from "../../components/Images/ImagesTable";
import {Link}      from "react-router-dom";

class Images extends React.Component {
  render() {
    return (
      <div className={"p-6"}>
        <ImagesTable/>

        <h5 className={"text-gray-900 text-xl font-medium mb-2 my-2"}>
          Want something different?
        </h5>

        <button className={"inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium" +
          " tracking-wide transition duration-300 rounded justify-self-center whitespace-nowrap text-emerald-500" +
          " hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-100 focus:text-emerald-600 " +
          "disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"}>
            <Link to={"/images/build"} className={"text-black font-medium no-underline"}>
              Click here to build your machine
            </Link>
        </button>
      </div>
    );
  }
}

export default Images;