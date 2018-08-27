<template>
  <v-layout column>
    <StartToolbar class="fixedMarginBottom" />
    <SearchButton class="searchButton" />
    <EndToolbar />
  </v-layout>
</template>

<script>
import StartToolbar from './StartToolbar.vue';
import SearchButton from './SearchButton.vue';
import EndToolbar from './EndToolbar.vue';

export default {
  components: { StartToolbar, SearchButton, EndToolbar },
};
</script>

<style>
.fixedMarginBottom {
  margin-bottom: 6px;
}

.searchButton {
  /* Small button: 40px - Toolbar height: 48px - Space: 6px */
  right: -20px; /* 40/2  */
  top: 31px; /* (48 + 6/2) - 40/2 */
}
</style>
