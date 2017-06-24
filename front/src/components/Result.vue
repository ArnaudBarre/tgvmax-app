<template>
  <div class="card card-outline-primary mb-3">
    <div class="card-block row">
      <div class="col-12 col-md-4">
        <h4 class="card-title">{{result.station}}</h4>
      </div>
      <div class="col-6 col-md-4">
        <h6 class="card-subtitle mb-2 text-muted">Allers</h6>
        <div v-for="go in result.go">{{go}}</div>
      </div>
      <div class="col-6 col-md-4">
        <h6 class="card-subtitle mb-2 text-muted">Retours</h6>
        <div v-for="back in result.back">{{back}}</div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['result']
}
</script>