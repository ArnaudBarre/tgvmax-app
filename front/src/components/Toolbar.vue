<template>
  <v-autocomplete label="Gare TGV"
                  no-data-text="Aucune station trouvée"
                  solo
                  single-line
                  hide-details
                  clearable
                  append-icon=""
                  :prepend-inner-icon="waitingLocation ? 'autorenew' : 'gps_fixed'"
                  @click:prepend-inner="locate"
                  :class="{ spinIcon: waitingLocation }"
                  :items="stationsNames"
                  v-model="station"
                  v-on:change="$emit('startSelected', $event)"
                  autofocus>
  </v-autocomplete>
</template>

<script>
import CheapRuler from '../CheapRuler';

export default {
  props: ['stations'],
  data() {
    return {
      station: '',
      stationsNames: this.stations.map(s => s.name),
      waitingLocation: false,
    };
  },
  methods: {
    locate() {
      if (this.waitingLocation) return;
      this.waitingLocation = true;
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const gCoords = { lat: coords.latitude, lng: coords.longitude };
        this.$emit('locate', gCoords);
        this.waitingLocation = false;
        const cheapRuler = new CheapRuler(gCoords.lat);
        const nearestStation = this.stations.map(s => {
          s.distance = cheapRuler.distance(gCoords, s.coordinates);
          return s;
        }).sort((a, b) => a.distance - b.distance)[0];
        this.station = nearestStation.name;
      }, () => this.waitingLocation = false);
    },
  },
};
</script>

<style>
.spinIcon .v-input__icon--prepend-inner {
  animation: spin 2s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
