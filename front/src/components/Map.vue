<template>
  <GmapMap :options="{ disableDefaultUI: true }"
           :center="center"
           :zoom="zoom"
           map-type-id="roadmap"
           style="width: 100%; height: 100%">
    <GmapMarker :icon="stationIcon"
                :key="s.name"
                :title="s.name"
                v-for="s in stations"
                :position="s.coordinates"
                :clickable="true"
                @click="s.open = !s.open">
      <GmapInfoWindow :options="{ maxWidth: 300 }"
                      :position="s.coordinates"
                      :opened="s.open"
                      @closeclick="s.open = false">
        <div>{{ s.name + ' - Fréquence : ' + Math.round(s.count / max * 100) + '%' }}</div>
      </GmapInfoWindow>
    </GmapMarker>
    <GmapMarker v-if="userLocation" :icon="positionIcon" :position="userPosition"></GmapMarker>
  </GmapMap>
</template>

<script>
import positionSVG from '../assets/location.svg';
import trainSVG from '../assets/train.svg';

export default {
  props: ['stations', 'userLocation', 'startStation'],
  data() {
    return {
      markers: this.stations.map(marker => {
        this.$set(marker, 'open', false);
        return marker;
      }),
      max: Math.max(...this.stations.map(s => s.count)),
      userPosition: undefined,
      positionIcon: { url: positionSVG, anchor: { x: 15, y: 15 } },
      stationIcon: { url: trainSVG, anchor: { x: 12, y: 12 } },
      center: { lat: 46.5, lng: 2.5 },
      zoom: 6,
    };
  },
  watch: {
    userLocation: function (value) {
      this.userPosition = { lat: value.latitude, lng: value.longitude };
      this.center = this.userPosition;
      this.zoom = 11;
    },
    startStation: function (value) {
      if (!value) return;
      this.center = this.stations.find(s => s.name === value).coordinates;
      this.zoom = 11;
      this.markers.find(m => m.name === value).open = true;
    },
  },
};
</script>
