---
sidebar_position: 5
---

# Web Application

The last step to be able to develop in the Revelations platform is your understanding of how the Web Application works!

## ReactJS

ReactJS is an open source framework mantained by Meta (formerly known as Facebook) which supports a rich ecosystem of
libraries, like Redux Toolkit and React Query, which are both used in this platform!

:::tip Check the docs

Check out the docs in each one of them:

1. [ReactJS](https://reactjs.org/)
2. [Redux Toolkit](https://redux-toolkit.js.org/)
3. [React Query](https://react-query-v3.tanstack.com/)

:::

## TailwindCSS

TailwindCSS motto is "rapidly build modern websites without ever leaving your HTML". And that's what it does!

:::tip Tailwind components we are followind

1. [WindUI](https://wind-ui.com/)
2. [Tailwind Components](https://tailwindcomponents.com/)

:::

## Structure

```
.
├── Dockerfile
├── package.json
├── package-lock.json
├── public
│   ├── about.txt
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── site.webmanifest
├── README.md
├── src
│   ├── app
│   │   ├── hooks.ts
│   │   ├── keycloakConfig.ts
│   │   └── store.ts
│   ├── App.scss
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── Add your components here!
│   ├── index.tsx
│   ├── interfaces
│   │   ├── Add the interfaces needed here!
│   ├── pages
│   │   └── Add your pages here!
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── tailwind.config.js
└── tsconfig.json
```

:::danger Try to follow the structure

No code will be accepted that doesn't follow the structure to the core!

:::

## Example - Containers

Containers is a great example to how the web application is built.

There is the ``ContainerTables`` component for displaying the data in a table. The data is queried with the help of
react query. We also have a ``currentContainer`` variable stored in the storage management with the help of Redux
Toolkit.

```ts
const {isLoading, isError, error, data} = useQuery('getContainers', getContainers);
const {currentContainer} = useSelector((state: RootState) => state.containers);
const dispatch = useDispatch();

...

function seeContainerDetails(container: Container) {
  dispatch(setCurrentContainer(container));
}
```

In the function ``parseName``, it parses the name to be more presentable to the final user. It is used on 
``parseContainers`` that does the same job for the containers in total.

```ts
function parseName(name: string) {
  return name
    .replaceAll("\"", "")
    .replaceAll("/", "")
    .replaceAll("-", " ")
    .replaceAll(/(^\w)|(\s+\w)/g, (match: string) =>
      match.toUpperCase()
    );
}

function parseContainers(): Container[] {
  if (data) {
    return data?.map((container: Container) => {
      return {
        id: container.id,
        names: container.names.map((name: string) => parseName(name)),
        ports: container.ports,
        state: container.state.replaceAll(/(^\w)|(\s+\w)/g, (match: string) => match.toUpperCase()),
        status: container.status,
        networks: container.networks,
        volumes: container.volumes
      }
    });
  }
  return [];
}
```

:::tip Final result

```ts
export default function ContainersTable(): JSX.Element {
  const {isLoading, isError, error, data} = useQuery('getContainers', getContainers);
  const {currentContainer} = useSelector((state: RootState) => state.containers);
  const dispatch = useDispatch();

  function parseName(name: string) {
    return name
      .replaceAll("\"", "")
      .replaceAll("/", "")
      .replaceAll("-", " ")
      .replaceAll(/(^\w)|(\s+\w)/g, (match: string) =>
        match.toUpperCase()
      );
  }

  function parseContainers(): Container[] {
    if (data) {
      return data?.map((container: Container) => {
        return {
          id: container.id,
          names: container.names.map((name: string) => parseName(name)),
          ports: container.ports,
          state: container.state.replaceAll(/(^\w)|(\s+\w)/g, (match: string) => match.toUpperCase()),
          status: container.status,
          networks: container.networks,
          volumes: container.volumes
        }
      });
    }
    return [];
  }

  function seeContainerDetails(container: Container) {
    dispatch(setCurrentContainer(container));
  }

  return (
    <div>
      <div className={"p-6 grid grid-cols-2 gap-2"}>
        <div>
          <h5 className={"text-gray-900 text-xl font-medium mb-2"}>
            Currently running machines
            {isError && error instanceof Error &&
                <div className={"bg-red-100 rounded-lg py-4 px-6 mb-4 text-base text-red-700 mb-3"} role={"alert"}>
                    <span>Error: {error.message}</span>
                </div>
            }
            {isLoading && (
              <div className={"bg-purple-100 rounded-lg py-3 px-6 mb-4 text-base text-purple mb-3"} role={"alert"}>
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
                     role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </h5>
          <div className={"flex flex-col"}>
            <div className={"overflow-x-auto sm:-mx-6 lg:-mx-8"}>
              <div className={"py-4 inline-block min-w-full sm:px-6 lg:px-8"}>
                <div className={"overflow-hidden"}>
                  <table className={"min-w-full text-center"}>
                    <thead className={"border-b bg-emerald-800"}>
                    <tr>
                      <th scope={"col"} className={"text-sm font-medium text-white px-6 py-4"}>
                        Names
                      </th>
                      <th scope={"col"} className={"text-sm font-medium text-white px-6 py-4"}>
                        State
                      </th>
                      <th scope={"col"} className={"text-sm font-medium text-white px-6 py-4"}>
                        Actions
                      </th>
                    </tr>
                    </thead>

                    <tbody>
                    {data && parseContainers().map((container: Container) => (
                      <tr className={"bg-white border-b"}>
                        <td className={"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"}>
                          {container.names}
                        </td>
                        <td className={"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"}>
                          {container.state}
                        </td>
                        <td>
                          <button
                            className={"inline-flex items-center justify-center h-10 gap-2 px-5 text-sm" +
                              " font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap" +
                              " bg-emerald-500 ring-offset-2 hover:bg-emerald-600 focus:bg-emerald-600 focus:ring-2 " +
                              "focus:ring-emerald-300 disabled:cursor-not-allowed disabled:border-emerald-300 " +
                              "disabled:bg-emerald-300 disabled:shadow-none"}
                            onClick={() => seeContainerDetails(container)}
                          >
                            <span>See details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {!currentContainer && (
            <h5>Please select a machine</h5>
          )}
          {currentContainer && (
            <ContainerDetails container={currentContainer}/>
          )}
        </div>
      </div>
    </div>
  )
};
```

:::
