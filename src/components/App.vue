<template>
  <v-app>
    <v-content>
      <LastUpdate class="topRight" />
      <v-layout
        :class="['search', {
          fullWidth: $vuetify.breakpoint.smAndDown,
          topLeft: $vuetify.breakpoint.mdAndUp
        }]"
        column>
        <v-flex>
          <Search class="mb-2" />
        </v-flex>
        <v-flex
          fill-height
          style="overflow-y: scroll">
          <Results />
        </v-flex>
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
  components: {
    Search, AppMap, Results, LastUpdate,
  },
};
</script>

<style>
.topRight {
  position: absolute;
  right: 0;
  z-index: 1001;
}

.search {
  position: absolute !important;
  z-index: 1001;
  max-height: 100%;
}

.topLeft {
  width: 350px;
  left: 16px;
  padding-top: 16px;
}

.fullWidth {
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 20px;
}
</style>
