import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router/router.js';
import * as Keycloak from 'keycloak-js';
import VueLogger from 'vuejs-logger';

import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false

let path = window.location.href
let realm = path.substring(path.indexOf("/#")).split("/")[2];
if (realm.includes("&")) {
  realm = realm.split("&")[0];
}
console.log(realm)

const options = {
  isEnabled: true,
  logLevel: Vue.config.productionTip ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
};
Vue.use(VueLogger, options);

let initOptions = {
  url: "http://localhost:8080/auth/",
  realm: realm.toUpperCase(),
  clientId: "ASEG_UMG",
  onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad, checkLoginIframe: false }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    Vue.$log.info("Autenticado");

    //Vue
    new Vue({
      vuetify,
      router,
      render: h => h(App, { props: { keycloak: keycloak } })
    }).$mount('#app')
  }

  //Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        Vue.$log.info('Token actualizado: ' + refreshed);
      } else {
        Vue.$log.warn('Token no actualizado, valido por '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      Vue.$log.error('No se pudo actualizar el token');
    });
  }, 6000)

}).catch(() => {
  Vue.$log.error("Autenticacion fallida");
});





