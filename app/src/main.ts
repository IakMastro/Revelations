import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// Keycloak libraries
import { vueKeycloak } from '@baloise/vue-keycloak';

// Axios libraries
import { vueAxios } from '@baloise/vue-axios';

// Bootstrap libraries
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

createApp(App)
  .use(store)
  .use(router)
  .use(BootstrapVue3)
  .use(vueAxios, {
    baseURL: 'http://api:5000/'
  })
  .use(vueKeycloak, {
    initOptions: {
      flow: 'standard',
      checkLoginIframe: false,
      onLoad: 'login-required',
    },
    config: {
      clientId: 'test',
      realm: 'Revelations',
      url: 'http://localhost:8080/auth',
    }
  })
  .mount('#app');
