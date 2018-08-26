<template>
  <v-menu :close-on-content-click="true"
          transition="scale-transition"
          full-width
          :z-index="1002"
          offset-y
          max-width="290px">
    <span v-if="date" slot="activator">{{ displayDate }}</span>
    <v-icon v-else style="width: 35px" slot="activator">event</v-icon>
    <v-date-picker v-on:input="set"
                   :min="minDate"
                   :max="maxDate"
                   no-title
                   :value="date"
                   scrollable
                   first-day-of-week="1"
                   locale="fr"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: ['storeKey'],
  data() {
    return {
      minDate: new Date().toISOString().substr(0, 10),
      maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().substr(0, 10),
    };
  },
  computed: {
    date() {
      return this.$store.state[this.storeKey];
    },
    displayDate() {
      const parts = this.date.split('-');
      return `${parts[2]}/${parts[1]}`;
    },
  },
  methods: {
    set(event) {
      this.$store.commit('set', { key: this.storeKey, value: event });
    },
  },
};
</script>
