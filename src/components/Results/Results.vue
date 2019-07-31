<template>
  <div>
    <v-card v-if="hasError">
      <v-card-text class="text-xs-center">
        <span>Une erreur est survenue 👨‍🔧</span>
        <v-icon
          style="float: right; height: 21px"
          @click="clearError">close
        </v-icon>
      </v-card-text>
    </v-card>
    <v-card v-if="noResults">
      <v-card-text class="text-xs-center">
        <span>Aucun trajet disponible 😞</span>
        <v-icon
          style="float: right; height: 21px"
          @click="clearResults">close
        </v-icon>
      </v-card-text>
    </v-card>
    <div v-if="hasResults">
      <DirectRideResults
        :results="results.directRide"
        class="mb-3" />
      <ConnectionResult
        v-for="result in results.connections"
        :connection="true"
        :result="result"
        :key="result.station"
        class="mb-3" />
    </div>
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
    hasError() {
      return this.$store.state.error;
    },
    hasResults() {
      return this.results && (this.results.connections.length || this.results.directRide.length);
    },
    noResults() {
      return this.results && !this.results.connections.length && !this.results.directRide.length;
    },
  },
  methods: {
    clearResults() {
      this.$store.commit('set', { key: 'results', value: undefined });
    },
    clearError() {
      this.$store.commit('set', { key: 'error', value: false });
    },
  },
};
</script>
