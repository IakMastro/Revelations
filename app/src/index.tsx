import React                              from 'react';
import {createRoot}                       from 'react-dom/client';
import {Provider}                         from 'react-redux';
import {store}                            from './app/store';
import App                                from './App';
import reportWebVitals                    from './reportWebVitals';
import keycloakConfig                     from "./app/keycloakConfig";
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools}               from "react-query/devtools";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

const {keycloak, initOptions} = keycloakConfig;
keycloak.init(initOptions)
        .then((auth: boolean) => {
          if (!auth)
            window.location.reload();

          root.render(
            <React.StrictMode>
              <Provider store={store}>
                <QueryClientProvider client={new QueryClient()}>
                  <App/>
                  <ReactQueryDevtools/>
                </QueryClientProvider>
              </Provider>
            </React.StrictMode>
          );

          localStorage.setItem('token', keycloak.token as string);
          localStorage.setItem('token-refresh', keycloak.refreshToken as string);

          setTimeout(() => {
            keycloak.updateToken(70).then((refreshed: boolean) => {
              if (refreshed) {
                localStorage.setItem('token', keycloak.token as string);
                localStorage.setItem('token-refresh', keycloak.refreshToken as string);
              }
            }).catch(() => {
              console.log("Failed to refresh token");
            });
          }, 6000);
        })
        .catch(() => {
          console.log("Authentication failed");
        });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
