<template>
  <div class="d-flex flex-row align-items-center">
    <div class="text-muted mr-2">Dernière mise à jour : {{lastUpdate}}</div>
    <loader v-show="!lastUpdate" size="24px" class="mr-2"></loader>
    <span class="badge badge-info" v-tooltip="{content: 'La SNCF met à jour ses données publiques toutes les 24 heures',
          placement: 'right', trigger:'hover click', classes: 'tooltip-right'}">?</span>
  </div>
</template>

<script>
import loader from './Loader.vue'

export default {
  data () {
    return {
      lastUpdate: ''
    }
  },
  created: function () {
    this.$http.get('lastUpdate').then(
      response => this.lastUpdate = new Date(Date.parse(response.body)).toLocaleString('fr-FR',
        {month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}),
      error => this.lastUpdate = error.statusText
    )
  },
  components: {loader}
}
</script>

<style>
  /* Bootstrap 4 - v-tooltip compatibility fix */
  .tooltip[aria-hidden='false'] {
    opacity: 1;
  }

  /* one line tooltip */
  .tooltip-inner {
    max-width: none;
  }
</style>
