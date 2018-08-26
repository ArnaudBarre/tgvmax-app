<template>
  <v-layout column>
    <StartToolbar class="fixedMarginBottom" />
    <SearchButton class="searchButton" />
    <EndToolbar class="mb-3" />
    <v-card v-if="results">
      <v-card-title class="primary">
        <v-layout justify-space-between>
          <div class="white--text">Horaires disponibles</div>
          <v-icon color="white" @click="clearResults" style="float: right">close</v-icon>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-layout column align-center>
          <span v-if="!results.length">Aucun trajet disponible 😞</span>
          <div v-for="result in results" :key="result">{{ result }}</div>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import StartToolbar from './StartToolbar.vue';
import SearchButton from './SearchButton.vue';
import EndToolbar from './EndToolbar.vue';

export default {
  components: { StartToolbar, SearchButton, EndToolbar },
  methods: {
    clearResults() {
      this.$store.commit('set', { key: 'results', value: undefined });
    },
  },
  computed: {
    results() {
      return this.$store.state.results;
    },
  },
};
</script>

<style>
.fixedMarginBottom {
  margin-bottom: 6px;
}

.searchButton {
  /* Small button: 40px - Toolbar height: 48px - Space: 6px */
  right: -20px; /* 40/2  */
  top: 31px; /* (48 + 6/2) - 40/2 */
}
</style>
