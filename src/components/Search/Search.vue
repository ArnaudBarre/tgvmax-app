<template>
  <v-layout column>
    <StartToolbar class="mb-1" />
    <EndToolbar />
  </v-layout>
</template>

<script>
import StartToolbar from './StartToolbar.vue';
import EndToolbar from './EndToolbar.vue';

export default {
  components: { StartToolbar, EndToolbar },
};
</script>
