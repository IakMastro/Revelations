import Keycloak, {KeycloakInitOptions} from "keycloak-js";

const keycloak = new Keycloak(
  {
    url: 'http://localhost:8080/auth',
    realm: 'Revelations',
    clientId: 'react-js'
  });

const initOptions: KeycloakInitOptions = {
  flow: 'standard',
  checkLoginIframe: false,
  onLoad: 'login-required',
}

export default {keycloak, initOptions};