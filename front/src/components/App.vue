<template>
  <v-app>
    <v-content>
      <last-update class="topRight" />
      <search class="topLeft" />
      <app-map />
    </v-content>
  </v-app>
</template>

<script>
import AppMap from './Map.vue';
import LastUpdate from './LastUpdate.vue';
import Search from './Search/Search.vue';

export default {
  components: { Search, AppMap, LastUpdate },
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
