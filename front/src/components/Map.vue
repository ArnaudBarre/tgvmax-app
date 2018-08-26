<template>
  <GmapMap :options="{ disableDefaultUI: true, minZoom: 6, maxZoom: 17 }"
           :center="center"
           :zoom="zoom"
           @zoom_changed="$event => this.zoom = $event"
           map-type-id="roadmap"
           style="width: 100%; height: 100%">
    <GmapMarker :icon="stationIcon"
                :key="m.name"
                :title="m.name"
                v-for="m in markers"
                :position="m.coordinates"
                :clickable="true"
                @click="m.open = !m.open">
      <GmapInfoWindow :options="{ maxWidth: 350 }"
                      :position="m.coordinates"
                      :opened="m.open"
                      @closeclick="m.open = false">
        <div>{{ m.name + ' - Fréquence : ' + Math.round(m.count / max * 100) + '%' }}</div>
      </GmapInfoWindow>
    </GmapMarker>
    <GmapMarker v-if="userLocation" :icon="positionIcon" :position="userLocation"></GmapMarker>
  </GmapMap>
</template>

<script>
import positionSVG from '../assets/location.svg';
import trainSVG from '../assets/train.svg';
import stations from '../../../stations';

export default {
  data() {
    return {
      markers: stations.map(marker => {
        this.$set(marker, 'open', false);
        return marker;
      }),
      max: Math.max(...stations.map(s => s.count)),
      positionIcon: { url: positionSVG, anchor: { x: 15, y: 15 } },
      stationIcon: { url: trainSVG, anchor: { x: 12, y: 12 } },
      center: { lat: 46.5, lng: 2.5 },
      zoom: 6,
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
    }, // TODO: spread getters
  },
  methods: {
    stationSelected(value) {
      if (!value) return;
      this.center = this.markers.find(s => s.name === value).coordinates;
      this.zoom = 11;
      this.markers.find(m => m.name === value).open = true;
    },
  },
  watch: {
    startStation(value) {
      this.stationSelected(value);
    },
    endStation(value) {
      this.stationSelected(value);
    },
  },
};
</script>
