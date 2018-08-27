<template>
  <v-btn
    absolute
    :loading="loading"
    :disabled="hasErrors"
    fab
    small
    @click="search"
    color="primary">
    <v-icon>search</v-icon>
  </v-btn>
</template>

<script>
import axios from 'axios';
import stations from '../../../../stations';

export default {
  data() {
    return {
      stationsNames: stations.map(s => s.name),
      loading: false,
    };
  },
  computed: {
    startDate() {
      return this.$store.state.startDate;
    },
    endDate() {
      return this.$store.state.endDate;
    },
    startStation() {
      return this.$store.state.startStation;
    },
    endStation() {
      return this.$store.state.endStation;
    }, // TODO : spread getters
    hasErrors() {
      return !(
        this.startDate
        && this.stationsNames.includes(this.startStation)
        && this.stationsNames.includes(this.endStation)
      );
    },
  },
  methods: {
    search() {
      this.loading = true;
      const { startDate, startStation, endStation } = this.$store.state;
      axios.get('search', { params: { startDate, startStation, endStation } })
        .then(({ data }) => {
          this.$store.commit('set', { key: 'results', value: data });
          this.loading = false; // TODO use finally and check babel transformation
        }).catch(() => this.loading = false); // TODO
    },
  },
};
</script>
