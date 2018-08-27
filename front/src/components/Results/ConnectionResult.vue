<template>
  <v-card>
    <v-card-title class="primary white--text">
      <div class="title">{{ result.station }}</div>
    </v-card-title>
    <v-card-text>
      <v-layout row class="pb-2 text-xs-center text-muted subheading">
        <v-flex>
          <span>1<sup>er</sup> Trajet</span>
        </v-flex>
        <v-flex>
          <span>2<sup>nd</sup> Trajet</span>
        </v-flex>
      </v-layout>
      <v-layout align-center row wrap>
        <v-flex>
          <schedule-list :hide="hide" :list="result.firstRide"></schedule-list>
        </v-flex>
        <v-flex>
          <schedule-list :hide="hide" :list="result.secondRide"></schedule-list>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="py-0"
                    v-if="result.firstRide.length > 3 || result.secondRide.length > 3">
      <v-btn icon mall class="mx-auto" @click.native="hide = !hide">
        <v-icon class="primary--text">{{hide ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ScheduleList from './ScheduleList.vue';

export default {
  props: ['result'],
  components: { ScheduleList },
  data() {
    return {
      hide: true,
    };
  },
};
</script>
