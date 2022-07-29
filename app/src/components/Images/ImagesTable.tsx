import axios                      from "axios";
import {useQuery}                 from "react-query";
import Image                      from "../../interfaces/Image";
import {useDispatch, useSelector} from "react-redux";
import {RootState}                from "../../app/store";
import {Card, Spinner}            from "react-bootstrap";
import {AgGridReact}              from "ag-grid-react";
import {useRef}                   from "react";

import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-alpine.min.css'
import {setCurrentImage}          from "./imageSlice";
import StartContainerForm         from "./StartContainerForm";

async function getImages(): Promise<Image[]> {
  const response = await axios.get("http://localhost:5000/docker/images");
  return await response.data;
}

export default function ImagesTable(): JSX.Element {
  const {isLoading, isError, error, data} = useQuery('getImages', getImages);
  const {columnDefs, currentImage} = useSelector((state: RootState) => state.images);
  const dispatch = useDispatch();

  const gridRef: any = useRef();

  function seeImageDetails(event: any) {
    dispatch(setCurrentImage(event.data));
  }

  return (
    <div className={"row"}>
      <div className={"col-sm-4"}>
        <h5>Available images</h5>
        <div style={{height: "40rem", width: "25rem"}}>
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
            rowData={data}
            columnDefs={columnDefs}
            animateRows={true}
            rowSelection={'single'}
            onCellClicked={seeImageDetails}
          />
        </div>
      </div>

      <div style={{marginTop: "2rem"}} className={"col-sm-8"}>
        {currentImage && (
          <Card>
            <Card.Header>Selected machine</Card.Header>
            <Card.Text>
              <div style={{marginTop: '.5rem', marginLeft: '.5rem', marginBottom: '.5rem'}}>
                <p><b>ID:</b> {currentImage.id}</p>
                <b>Tags:</b>
                <ul>
                  {currentImage.tags.map((tag: string) => {
                    return <li>{tag}</li>
                  })}
                </ul>

                <StartContainerForm image={currentImage}/>
              </div>
            </Card.Text>
          </Card>
        )}
        {!currentImage &&
            <h5>Please, select a machine</h5>
        }
      </div>
    </div>
  )
}