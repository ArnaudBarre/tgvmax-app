<template>
  <div class="card card-outline-primary mb-4">
    <div class="card-block row">
      <div class="col-12 col-md-4">
        <h4 class="card-title">{{result.station}}</h4>
      </div>
      <div class="col-6 col-md-4">
        <scheduleList title="Aller" :list="result.go"></scheduleList>
      </div>
      <div class="col-6 col-md-4">
        <scheduleList title="Retour" :list="result.back"></scheduleList>
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