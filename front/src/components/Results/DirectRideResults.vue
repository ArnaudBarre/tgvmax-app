<template>
  <v-card>
    <v-card-title class="primary">
      <v-layout justify-space-between>
        <div class="title white--text">Trajets directs</div>
        <v-icon color="white" @click="clearResults" style="float: right">close</v-icon>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <div v-if="!results.length" class="text-xs-center">
        <span>Aucun trajet direct disponible 😞</span>
      </div>
      <ScheduleList :hide="hide" :list="results" />
    </v-card-text>
    <v-card-actions class="py-0" v-if="results.length > 3">
      <v-btn icon mall class="mx-auto" @click.native="hide = !hide">
        <v-icon class="primary--text">{{hide ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ScheduleList from './ScheduleList.vue';

export default {
  props: ['results'],
  components: { ScheduleList },
  data() {
    return {
      hide: true,
    };
  },
  methods: {
    clearResults() {
      this.$store.commit('set', { key: 'results', value: undefined });
    },
  },
};
</script>
