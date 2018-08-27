<template>
  <div v-if="results">
    <v-card v-if="!hasResults">
      <v-card-text class="text-xs-center">
        <span>Aucun trajet disponible 😞</span>
      </v-card-text>
    </v-card>
    <DirectRideResults v-if="hasResults" :results="results.directRide" class="mb-3" />
    <ConnectionResult v-for="result in results.connections"
                      :connection="true"
                      :result="result"
                      :key="result.station"
                      class="mb-3" />
  </div>
</template>

<script>
import ConnectionResult from './ConnectionResult.vue';
import DirectRideResults from './DirectRideResults.vue';

export default {
  components: { DirectRideResults, ConnectionResult },
  computed: {
    results() {
      return this.$store.state.results;
    },
    hasResults() {
      return this.results.connections.length || this.results.directRide.length;
    },
  },
};
</script>
