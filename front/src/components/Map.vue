<template>
  <GmapMap
    :options="{ disableDefaultUI: true, minZoom: 6, maxZoom: 17 }"
    :center="center"
    :zoom="zoom"
    map-type-id="roadmap"
    style="width: 100%; height: 100%"
    @zoom_changed="$event => set('zoom', $event)">
    <GmapMarker
      v-for="m in markers"
      :icon="stationIcon"
      :key="m.name"
      :title="m.name"
      :position="m.coordinates"
      :clickable="true"
      @click="m.popupOpen = !m.popupOpen">
      <GmapInfoWindow
        :options="{ maxWidth: 350 }"
        :position="m.coordinates"
        :opened="m.popupOpen"
        @closeclick="m.popupOpen = false">
        <div>{{ m.name + ' - Fréquence : ' + Math.round(m.count / max * 100) + '%' }}</div>
        <div class="text-xs-center">
          <a @click="set('startStation', m.name)">Partir de là</a>
          <span class="mx-2">-</span>
          <a @click="set('endStation', m.name)">Y aller</a>
        </div>
      </GmapInfoWindow>
    </GmapMarker>
    <GmapMarker
      v-if="userLocation"
      :icon="positionIcon"
      :position="userLocation"/>
  </GmapMap>
</template>

<script>
import positionSVG from '../assets/location.svg';
import trainSVG from '../assets/train.svg';

export default {
  data() {
    return {
      positionIcon: { url: positionSVG, anchor: { x: 15, y: 15 } },
      stationIcon: { url: trainSVG, anchor: { x: 12, y: 12 } },
    };
  },
  computed: {
    userLocation() {
      return this.$store.state.userLocation;
    },
    startStation() {
      return this.$store.state.startStation;
    },
    endStation() {
      return this.$store.state.endStation;
    },
    max() {
      return this.$store.state.max;
    },
    markers() {
      return this.$store.state.stations;
    },
    center() {
      return this.$store.state.center;
    },
    zoom() {
      return this.$store.state.zoom;
    }, // TODO: spread getters
  },
  methods: {
    set(key, value) {
      this.$store.commit('set', { key, value });
    },
  },
};
</script>
