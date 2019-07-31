<template>
  <v-menu
    :close-on-content-click="true"
    :z-index="1002"
    transition="scale-transition"
    full-width
    offset-y
    max-width="290px">
    <span
      v-if="date"
      slot="activator">{{ displayDate }}</span>
    <v-icon
      v-else
      slot="activator"
      style="width: 35px">event
    </v-icon>
    <v-date-picker
      :min="minDate"
      :max="maxDate"
      :value="date"
      no-title
      scrollable
      first-day-of-week="1"
      locale="fr"
      @input="set" />
  </v-menu>
</template>

<script>
export default {
  props: { storeKey: { type: String, required: true } },
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
