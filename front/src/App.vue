<template>
  <div class="container">
    <div class="form-group row">
      <label class="col-md-1 col-form-label">Depuis</label>
      <div class="col-md-11" :class="{'has-danger': stationError}">
        <input type="text" v-model="station" class="form-control" placeholder="Gare TGV de départ"
               @input="search($event.target.value)" @keyup.enter="selectFirst" @blur="inputBlur" autofocus>
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action" v-for="station in filterStations"
             @click="selected(station)">
            {{ station }}
          </a>
        </div>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-md-1 col-form-label">Aller</label>
      <div class="col-md-5">
        <datepicker v-model="startDate" input-class="form-control" language="fr" :monday-first="true"
                    placeholder="Sélectionnez un jour" :disabled="disabledStart" @selected="startSelected"></datepicker>
      </div>
      <label class="col-md-1 col-form-label">Retour</label>
      <div class="col-md-5">
        <datepicker v-model="endDate" input-class="form-control" language="fr" :monday-first="true"
                    placeholder="Sélectionnez un jour" :disabled="disabledEnd" @selected="endSelected"></datepicker>
      </div>
    </div>
    <button type="submit" class="btn btn-primary btn-block form-group" :class="{disabled: hasErrors}" @click="submit">
      Rechercher !
    </button>
    <transition name="fade">
      <div v-if="httpError" class="alert alert-danger">Oups ! {{httpError}}</div>
    </transition>
  </div>
</template>

<script>
import stations from './stations.json'
import Datepicker from 'vuejs-datepicker';

let oneMonth = () => new Date(new Date().setMonth((new Date().getMonth() + 1) % 11));
let today = () => new Date(new Date().setHours(0, 0, 0, 0));
let getDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export default {
  data () {
    return {
      station: '',
      startDate: null,
      endDate: null,
      filterStations: [],
      results: [],
      disabledStart: {
        to: today(),
        from: oneMonth()
      },
      disabledEnd: {
        to: today(),
        from: oneMonth()
      },
      stationError: false,
      httpError: null
    }
  },
  computed: {
    hasErrors () {
      return !(this.startDate && this.endDate && stations.indexOf(this.station) != -1)
    }
  },
  methods: {
    search (value) {
      this.filterStations = stations.filter(name => name.toUpperCase().indexOf(value.toUpperCase()) >= 0).slice(0, 5);
    },
    selected (value) {
      this.stationError = false;
      this.station = value;
      this.filterStations = [];
    },
    selectFirst () {
      if (this.filterStations.length) this.selected(this.filterStations[0])
    },
    startSelected (date) {
      this.disabledEnd.to = date;
    },
    endSelected (date) {
      this.disabledStart.from = date;
    },
    submit () {
      if (!this.hasErrors) {
        this.$http.get('stations', {
          params: {from: this.station, startDate: getDate(this.startDate), endDate: getDate(this.endDate)}
        }).then(
          response => {this.results = response.body},
          error => {
            this.httpError = error.statusText;
            setTimeout(() => this.httpError = null, 3000);
          });
      }
    },
    inputBlur () {
      this.stationError = this.station && stations.indexOf(this.station) == -1
    }
  },
  components: {Datepicker}
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>