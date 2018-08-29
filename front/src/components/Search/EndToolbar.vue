<template>
  <v-toolbar dense>
    <v-icon @click="reverse" class="mr-2">swap_vert</v-icon>
    <StationPicker label="Arrivée à" storeKey="endStation" />
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
