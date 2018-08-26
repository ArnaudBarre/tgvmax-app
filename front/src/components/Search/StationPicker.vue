<template>
  <v-autocomplete :label="label"
                  no-data-text="Aucune station trouvée"
                  single-line
                  hide-details
                  clearable
                  :value="station"
                  :items="stationsNames"
                  v-on:change="set"
                  :autofocus="autofocus">
  </v-autocomplete>
</template>

<script>
import stations from '../../../../stations';

export default {
  props: ['label', 'autofocus', 'storeKey'],
  data() {
    return {
      stationsNames: stations.map(s => s.name),
    };
  },
  computed: {
    station() {
      return this.$store.state[this.storeKey];
    },
  },
  methods: {
    set(event) {
      this.$store.commit('set', { key: this.storeKey, value: event });
    },
  },
};
</script>
