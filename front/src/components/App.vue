<template>
  <v-app>
    <v-content>
      <last-update class="topRight"></last-update>
      <toolbar class="topLeft"
               :stations="stations"
               v-on:startSelected="startStation = $event"
               v-on:locate="userLocation = $event"></toolbar>
      <app-map :stations="stations"
               :startStation="startStation"
               :userLocation="userLocation"></app-map>
    </v-content>
  </v-app>
</template>

<script>
import stations from './../../../stations.json';
import appMap from './Map.vue';
import toolbar from './Toolbar.vue';
import lastUpdate from './LastUpdate.vue';

export default {
  data() {
    return {
      stations,
      startStation: '',
      userLocation: undefined,
    };
  },
  components: { toolbar, appMap, lastUpdate },
};
</script>

<style>
.topRight {
  position: absolute;
  right: 0;
  z-index: 1001;
}

.topLeft {
  position: absolute !important;
  width: 350px;
  z-index: 1001;
  left: 16px;
  top: 16px;
}
</style>
