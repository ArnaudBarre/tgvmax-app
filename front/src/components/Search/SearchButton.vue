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
import { mapGetters } from 'vuex';
import stations from '../../../../stations.json';

export default {
  data() {
    return {
      stationsNames: stations.map(s => s.name),
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['startDate', 'startStation', 'endStation']),
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
      this.$store.commit('set', { key: 'results', value: undefined });
      this.$store.commit('set', { key: 'error', value: false });
      const { startDate, startStation, endStation } = this.$store.state;
      axios.get('search', { params: { startDate, startStation, endStation } })
        .then(({ data }) => {
          this.$store.commit('set', { key: 'results', value: data });
        })
        .catch(() => {
          this.$store.commit('set', { key: 'error', value: true });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
