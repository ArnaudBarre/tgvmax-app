<template>
  <v-card>
    <v-card-title class="primary white--text">
      <div class="headline">{{result.station}}</div>
    </v-card-title>
    <v-card-text>
      <v-layout align-center row wrap>
        <v-flex xs6 sm3 order-sm1>
          <div class="text-muted title text-xs-center py-2">Aller{{result.go.length > 1 ? 's' : ''}}</div>
        </v-flex>
        <v-flex xs6 sm3 order-sm3>
          <div class="text-muted title text-xs-center py-2">Retour{{result.back.length > 1 ? 's' : ''}}</div>
        </v-flex>
        <v-flex xs6 sm3 order-sm2>
          <schedule-list :list="result.go"></schedule-list>
        </v-flex>
        <v-flex xs6 sm3 order-sm4>
          <schedule-list :list="result.back"></schedule-list>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import scheduleList from './ScheduleList.vue'

export default {
  props: ['result'],
  components: {scheduleList}
}
</script>