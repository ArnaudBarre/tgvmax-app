<template>
  <v-toolbar dense>
    <v-btn
      :loading="waitingLocation"
      flat
      small
      icon
      class="mr-2"
      @click="locate">
      <v-icon :color="userLocated ? 'primary': ''">gps_fixed</v-icon>
    </v-btn>
    <StationPicker
      label="Partir de"
      store-key="startStation"
      autofocus />
    <DatePicker
      class="ml-2"
      store-key="startDate" />
  </v-toolbar>
</template>

<script>
import CheapRuler from '../../CheapRuler';
import stations from '../../../stations.json';
import StationPicker from './StationPicker.vue';
import DatePicker from './DatePicker.vue';

export default {
  components: { DatePicker, StationPicker },
  data() {
    return {
      waitingLocation: false,
      userLocated: false,
    };
  },
  methods: {
    locate() {
      if (this.waitingLocation) return;
      this.waitingLocation = true;
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const gCoords = { lat: coords.latitude, lng: coords.longitude };
        this.$store.commit('set', { key: 'userLocation', value: gCoords });
        this.waitingLocation = false;
        this.userLocated = true;
        const cheapRuler = new CheapRuler(gCoords.lat);
        const nearestStation = stations.map(s => ({
          ...s,
          distance: cheapRuler.distance(gCoords, s.coordinates),
        })).sort((a, b) => a.distance - b.distance)[0];
        this.$store.commit('set', { key: 'startStation', value: nearestStation.name });
      }, () => {
        this.waitingLocation = false;
      });
    },
  },
};
</script>
