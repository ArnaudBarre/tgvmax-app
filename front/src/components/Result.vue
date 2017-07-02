<template>
  <div class="card card-outline-primary mb-4">
    <div class="card-block row">
      <div class="col-12 col-md-4">
        <h4 class="card-title">{{result.station}}</h4>
      </div>
      <div class="col-6 col-md-4">
        <schedule-list title="Aller" :list="result.go"></schedule-list>
      </div>
      <div class="col-6 col-md-4">
        <schedule-list title="Retour" :list="result.back"></schedule-list>
      </div>
    </div>
  </div>
</template>

<script>
import scheduleList from './ScheduleList.vue'

export default {
  props: ['result'],
  components: {scheduleList}
}
</script>