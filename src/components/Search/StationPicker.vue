<template>
  <v-autocomplete
    :label="label"
    :value="station"
    :items="stationsNames"
    :autofocus="autofocus"
    no-data-text="Aucune station trouvée"
    single-line
    hide-details
    clearable
    class="pt-0"
    @change="set" />
</template>

<script>
import stations from '../../../stations.json';

export default {
  props: {
    label: { type: String, required: true },
    autofocus: { type: Boolean, default: false },
    storeKey: { type: String, required: true },
  },
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
