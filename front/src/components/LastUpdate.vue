<template>
  <v-layout align-center class="white caption">
    <v-tooltip right>
      <span slot="activator" class="grey--text mx-2">Dernière mise à jour : {{ lastUpdate }}</span>
      <span>La SNCF met à jour ses données publiques toutes les 24 heures</span>
    </v-tooltip>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      lastUpdate: '...chargement',
    };
  },
  created() {
    axios.get('lastUpdate')
      .then(({ data }) => this.lastUpdate = data)
      .catch(({ statusText }) => this.lastUpdate = statusText);
  },
};
</script>
