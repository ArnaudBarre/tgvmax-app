<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-layout justify-center>
          <v-flex lg6 md8 sm10>
            <v-select :items="stations" v-model="station" label="Gare TGV de départ" prepend-icon="directions_transit" autocomplete autofocus></v-select>
            <v-layout row>
              <v-flex mr-2>
                <v-menu :close-on-content-click="true" transition="scale-transition" full-width offset-y max-width="290px">
                  <v-text-field slot="activator" label="Aller" :value="displayDate(startDate)" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="startDate" :min="minDate" :max="maxDate" no-title scrollable first-day-of-week="1" locale="fr"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex ml-2>
                <v-menu :close-on-content-click="true" transition="scale-transition" full-width offset-y max-width="290px">
                  <v-text-field slot="activator" label="Retour" :value="displayDate(endDate)" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="endDate" :min="minDate" :max="maxDate" no-title scrollable first-day-of-week="1" locale="fr"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-btn color="primary" block @click.native="submit" :loading="loading" :disabled="hasErrors">Rechercher !</v-btn>
            <last-update class="my-3"></last-update>
            <v-alert error dismissible v-model="httpError" class="mb-4" transition="scale-transition">Oups ! {{httpErrorText}}</v-alert>
            <v-layout justify-center>
              <v-progress-circular v-show="loading" indeterminate :size="60" class="mb-4 primary--text"></v-progress-circular>
              <span v-show="noResults" class="display-1">Aucun voyage disponible ☹️</span>
            </v-layout>
            <result v-show="!loading" v-for="result in results" :result="result" :key="result.station" class="mb-3"></result>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import stations from './../../stations.json';
import result from './Result.vue';
import lastUpdate from './LastUpdate.vue';
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      station: '',
      stations: stations,
      startDate: null,
      endDate: null,
      results: [],
      httpError: false,
      httpErrorText: '',
      loading: false,
      noResults: false,
      minDate: moment().format('YYYY-MM-DD'),
      maxDate: moment().add(1, 'months').format('YYYY-MM-DD')
    };
  },
  computed: {
    hasErrors() {
      return !this.startDate || !this.endDate || stations.indexOf(this.station) === -1;
    }
  },
  methods: {
    submit() {
      this.loading = true;
      this.noResults = false;
      axios.get('stations', {
        params: {
          from: this.station,
          startDate: this.startDate,
          endDate: this.endDate
        }
      }).then(response => {
        this.loading = false;
        this.results = response.data;
        this.noResults = response.data.length === 0;
      }).catch(error => {
        this.httpErrorText = error.response.statusText;
        this.httpError = true;
        this.loading = false;
      });
    },
    displayDate(date) {
      return date ? moment(date).format("ddd D MMM") : '';
    }
  },
  components: { result, lastUpdate }
};
</script>
