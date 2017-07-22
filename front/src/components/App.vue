<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-text-field label="Gare TGV de départ" prepend-icon="directions_transit" v-model="station" @input="search"
                      @keyup.enter.native="selectFirst" @blur="inputBlur" autofocus></v-text-field>
        <v-list class="py-0">
          <v-list-tile v-for="station in filterStations" :key="station">
            <v-list-tile-content @click="selected(station)">
              <v-list-tile-title>{{station}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-menu :close-on-content-click="true" transition="scale-transition" offset-y full-width :nudge-left="40"
                max-width="290px">
          <v-text-field slot="activator" label="Aller" v-model="startDateDisplay" prepend-icon="event"
                        readonly></v-text-field>
          <v-date-picker v-model="startDate" no-title scrollable first-day-of-week="1" locale="fr"
                         :allowed-dates="allowedStart" @click.native="startSelected"
                         :date-format="date => new Date(date).toDateString()"
                         :formatted-value.sync="startDateDisplay"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs12 sm6>
        <v-menu :close-on-content-click="true" transition="scale-transition" offset-y full-width :nudge-left="40"
                max-width="290px">
          <v-text-field slot="activator" label="Retour" v-model="endDateDisplay" prepend-icon="event"
                        readonly></v-text-field>
          <v-date-picker v-model="endDate" no-title scrollable first-day-of-week="1" locale="fr"
                         :allowed-dates="allowedEnd" @click.native="endSelected"
                         :date-format="date => new Date(date).toDateString()"
                         :formatted-value.sync="endDateDisplay"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-btn primary block @click.native="submit" :loading="loading" :disabled="hasErrors">Rechercher !</v-btn>
    <last-update class="my-3"></last-update>
    <v-alert error dismissible v-model="httpError" class="mb-4" transition="scale-transition">Oups !
      {{httpErrorText}}
    </v-alert>
    <v-layout justify-center>
      <v-progress-circular v-show="loading" indeterminate :size="60" class="mb-4 primary--text"></v-progress-circular>
    </v-layout>
    <result v-show="!loading" v-for="result in results" :result="result" :key="result.station" class="mb-3"></result>
  </v-container>
</template>

<script>
import stations from './../../../json/stations.json'
import defaultResponse from './../../../json/response.json'
import result from './Result.vue'
import lastUpdate from './LastUpdate.vue'

let oneMonth = () => new Date(new Date().setMonth((new Date().getMonth() + 1) % 11));
let today = () => new Date(new Date().setHours(0, 0, 0, 0));

export default {
  data () {
    return {
      station: '',
      startDate: null,
      endDate: null,
      startDateDisplay: null,
      endDateDisplay: null,
      filterStations: [],
      results: [],
      allowedStart: {
        min: today(),
        max: oneMonth()
      },
      allowedEnd: {
        min: today(),
        max: oneMonth()
      },
      stationError: false,
      httpError: false,
      httpErrorText: '',
      loading: false
    }
  },
  computed: {
    hasErrors () {
      return !(this.startDate && this.endDate && stations.indexOf(this.station) !== -1)
    }
  },
  methods: {
    search (value) {
      this.filterStations = value ?
        stations.filter(name => name.toUpperCase().indexOf(value.toUpperCase()) >= 0).slice(0, 5) : [];
    },
    selected (value) {
      this.stationError = false;
      this.station = value;
      this.filterStations = [];
    },
    selectFirst () {
      if (this.filterStations.length) this.selected(this.filterStations[0])
    },
    startSelected () {
      if (this.startDate) this.allowedEnd.min = this.startDate;
    },
    endSelected () {
      if (this.endDate) this.allowedStart.max = this.endDate;
    },
    submit () {
      if (!this.hasErrors) {
        this.loading = true;
        this.$http.get('stations', {
          params: {from: this.station, startDate: this.startDate, endDate: this.endDate}
        }).then(
          response => {
            this.loading = false;
            this.results = response.body
          },
          error => {
            this.httpErrorText = error.statusText;
            this.httpError = true;
            this.loading = false;
            if (error.status === 404) this.results = defaultResponse;
          });
      }
    },
    inputBlur () {
      this.stationError = this.station && stations.indexOf(this.station) === -1
    },
    dismiss() {
      this.httpError = null;
    }
  },
  components: {result, lastUpdate}
}
</script>
