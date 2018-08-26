import Vue from 'vue';
import App from './components/App.vue';
import * as VueGoogleMaps from 'vue2-google-maps';

import '../node_modules/vuetify/src/stylus/app.styl';
import Vuetify from 'vuetify/es5/components/Vuetify';
import VApp from 'vuetify/es5/components/VApp';
import VSelect from 'vuetify/es5/components/VSelect';
import VAutocomplete from 'vuetify/es5/components/VAutocomplete';
import VAlert from 'vuetify/es5/components/VAlert';
import VMenu from 'vuetify/es5/components/VMenu';
import VGrid from 'vuetify/es5/components/VGrid';
import VDatePicker from 'vuetify/es5/components/VDatePicker';
import VTextField from 'vuetify/es5/components/VTextField';
import VCard from 'vuetify/es5/components/VCard';
import VIcon from 'vuetify/es5/components/VIcon';
import VBtn from 'vuetify/es5/components/VBtn';
import VTooltip from 'vuetify/es5/components/VTooltip';

Vue.use(Vuetify, {
  components: {
    VApp,
    VSelect,
    VAutocomplete,
    VAlert,
    VGrid,
    VMenu,
    VDatePicker,
    VTextField,
    VCard,
    VIcon,
    VBtn,
    VTooltip,
  },
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAsq0jBT7iBfw9b2_tAsHbkUuY532ZY9wA',
  },
});

new Vue({
  el: '#app',
  render: h => h(App),
});