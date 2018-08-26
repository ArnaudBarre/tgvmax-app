<template>
  <v-toolbar dense>
    <v-icon @click="reverse" class="mr-2">swap_vert</v-icon>
    <StationPicker label="Arrivée à" storeKey="endStation" />
    <v-tooltip left class="ml-2">
      <v-icon slot="activator" style="width: 35px" disabled>event</v-icon>
      <span>Fonctionalité bientôt disponible !</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
import StationPicker from './StationPicker.vue';
import DatePicker from './DatePicker.vue';

export default {
  components: { StationPicker, DatePicker },
  methods: {
    reverse() {
      const { startStation, endStation } = this.$store.state;
      this.$store.commit('set', { key: 'startStation', value: endStation });
      this.$store.commit('set', { key: 'endStation', value: startStation });
    },
  },
};
</script>
