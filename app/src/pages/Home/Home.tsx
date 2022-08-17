import ContainersTable                 from "../../components/Home/ContainersTable";
import React                           from "react";
import './Home.scss';
import UploadDatasetForm               from "../../components/Home/UploadDatasetForm";

class Home extends React.Component {
  render() {
    return (
      <>
        <ContainersTable/>
        <div className={"flex justify-center"}>
          <div className={"block rounded-lg shadow-lg bg-white max-w-sm text-center"}>
            <div className={"py-3 px-6 border-b border-gray-300"}>
              Import data
            </div>
            <div className={"p-6"}>
              <h5 className={"text-gray-900 text-xl font-medium mb-2"}>
                You can upload a dataset you find in the web!
              </h5>
              <p className={"text-gray-700 text-base mb-4"}>
                It can be a CSV, JSON or XML file!
              </p>
              <UploadDatasetForm />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home;