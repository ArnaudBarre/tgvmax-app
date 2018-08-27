<template>
  <v-app>
    <v-content>
      <LastUpdate class="topRight" />
      <v-layout class="topLeft" column>
        <Search class="mb-3" />
        <Results />
      </v-layout>
      <AppMap />
    </v-content>
  </v-app>
</template>

<script>
import AppMap from './Map.vue';
import LastUpdate from './LastUpdate.vue';
import Search from './Search/Search.vue';
import Results from './Results/Results.vue';

export default {
  components: { Search, AppMap, Results, LastUpdate },
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
