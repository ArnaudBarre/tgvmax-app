<template>
  <div class="align">
    <span class="grey--text mr-2">Dernière mise à jour : {{lastUpdate}}</span>
    <v-progress-circular v-show="!lastUpdate" indeterminate :size="24" class="primary--text mr-2"></v-progress-circular>
    <span v-tooltip:right="{html: 'La SNCF met à jour ses données publiques toutes les 24 heures'}"
          class="hidden-sm-and-down">
      <v-icon>help</v-icon>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastUpdate: ''
    }
  },
  created: function () {
    this.$http.get('lastUpdate').then(
      response => this.lastUpdate = new Date(Date.parse(response.body))
        .toLocaleString('fr-FR', {month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}),
      error => this.lastUpdate = error.statusText
    )
  }
}
</script>

<style>
  .align {
    display: flex;
    align-items: center;
  }
</style>
