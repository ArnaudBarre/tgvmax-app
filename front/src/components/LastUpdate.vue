<template>
  <v-layout align-center>
    <span class="grey--text mr-2">Dernière mise à jour : {{lastUpdate}}</span>
    <v-progress-circular v-show="!lastUpdate" indeterminate :size="24" class="primary--text mr-2"></v-progress-circular>
    <v-tooltip right class="hidden-sm-and-down">
      <v-icon slot="activator">help</v-icon>
      <span>La SNCF met à jour ses données publiques toutes les 24 heures</span>
    </v-tooltip>
  </v-layout>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      lastUpdate: ''
    };
  },
  created() {
    axios.get('lastUpdate')
      .then(response => this.lastUpdate = moment(response.data).fromNow())
      .catch(error => (this.lastUpdate = error.statusText));
  }
};
</script>