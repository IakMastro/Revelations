import axios                          from "axios";
import {useMutation}                  from "react-query";
import {SubmitHandler, useForm}       from "react-hook-form";
import React                          from "react";
import Image                          from "../../interfaces/Image";

type ContainerFormValues = {
  name: string;
  tag: string;
}

interface StartContainerFormProps {
  image: Image;
}

async function startContainer(container: ContainerFormValues): Promise<any[]> {
  const response = await axios.post("http://localhost:5000/docker/run", container);
  return response.data;
}

export default function StartContainerForm({image}: StartContainerFormProps): JSX.Element {
  const startContainerMutation = useMutation(startContainer);
  const {register, handleSubmit} = useForm<ContainerFormValues>();

  const onSubmit: SubmitHandler<ContainerFormValues> = container => {
    if (container.tag) {
      container.name = image.tags[0];
      startContainerMutation.mutate(container);
    }
  };

  return (
    <div>
      {startContainerMutation.isError &&
          <div className={"bg-red-100 rounded-lg py-4 px-6 mb-4 text-base text-red-700 mb-3"} role={"alert"}>
              <span>Error starting the machine</span>
          </div>
      }

      {startContainerMutation.isLoading &&
          <div className={"bg-purple-100 rounded-lg py-3 px-6 mb-4 text-base text-purple mb-3"} role={"alert"}>
              <div className={"spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"}
                   role="status">
                  <span className={"visually-hidden"}>Launching the machine...</span>
              </div>
              <span className={"mx-2"}>Launching the machine...</span>
          </div>
      }

      {!startContainerMutation.isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"mb-6"}>
            <input
              type={"text"}
              className={"form-control block w-full px-4 px-2 text-xl font-normal text-gray-700 bg-white" +
                " bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0" +
                " focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"}
              {...register("tag")}
              id={"tagForm"}
              placeholder={"Give machine name here"}
            />
          </div>

          <button className={"inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium" +
            " tracking-wide transition duration-300 rounded justify-self-center whitespace-nowrap bg-emerald-200" +
            " text-emerald-600 ring-offset-2 hover:bg-emerald-300 hover:text-emerald-700 focus:bg-emerald-300 " +
            "focus:text-emerald-700 focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed " +
            "disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"}>
            <span className={"order-2"}>Start Machine</span>
            <span className={"relative only:-mx-6"}>
              <svg
                xmlns={"http://www.w3.org/2000/svg"}
                className={"w-5 h-5"}
                fill={"none"}
                viewBox={"0 0 24 24"}
                stroke={"currentColor"}
                stroke-width={"2"}
                role={"graphics-symbol"}
                aria-labelledby={"title-16 desc-16"}>
                  <title id={"title-16"}>Icon title</title>
                  <desc id={"desc-16"}>
                      A more detailed description of the icon
                  </desc>
                  <path stroke-linecap={"round"} stroke-linejoin={"round"}
                        d={"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"}/>
              </svg>
            </span>
          </button>
        </form>
      )}
    </div>
  )
}