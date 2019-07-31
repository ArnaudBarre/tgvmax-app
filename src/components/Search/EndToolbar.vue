<template>
  <v-toolbar dense>
    <v-icon
      class="mr-2"
      @click="reverse">swap_vert</v-icon>
    <StationPicker
      label="Arrivée à"
      store-key="endStation" />
    <SearchButton />
  </v-toolbar>
</template>

<script>
import StationPicker from './StationPicker.vue';
import SearchButton from './SearchButton.vue';

export default {
  components: { StationPicker, SearchButton },
  methods: {
    reverse() {
      const { startStation, endStation } = this.$store.state;
      this.$store.commit('set', { key: 'startStation', value: endStation });
      this.$store.commit('set', { key: 'endStation', value: startStation });
    },
  },
};
</script>
