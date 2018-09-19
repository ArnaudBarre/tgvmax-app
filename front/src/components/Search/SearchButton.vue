<template>
  <v-btn
    :loading="loading"
    :disabled="hasErrors"
    flat
    icon
    class="ml-2 mr-0"
    color="primary"
    @click="search">
    <v-icon style="width: 35px">search</v-icon>
  </v-btn>
</template>

<script>
import axios from 'axios';
import stations from '../../../../stations.json';

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
        }).catch(() => {
          this.loading = false; // TODO
        });
    },
  },
};
</script>
