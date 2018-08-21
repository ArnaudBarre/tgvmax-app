<template>
  <l-map style="height: 400px" :zoom="5" :minZoom="5" :maxZoom="14" :center="[46.5, 2.5]" :maxBounds="[[53, -7], [40, 10]]" :options="{ attributionControl: false }">
    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
    <l-marker v-for="station in stations" :icon="stationIcon" :key="station.name" :lat-lng="station.coordinates">
      <l-tooltip :content="station.name" />
      <l-popup :content="station.name + ' - Fréquence : ' + Math.round(station.count / max * 100) + '%'" />
    </l-marker>
    <l-control-attribution prefix="OpenStreetMap" position="bottomright"></l-control-attribution>
  </l-map>
</template>

<script>
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LTooltip, LPopup, LControlAttribution } from 'vue2-leaflet';

const stationIcon = divIcon({
  html: '<i class="material-icons">train</i>',
  className: '', // remove default class
  iconSize: [24, 24], // default material icon size
  tooltipAnchor: [7, 0], // on the side
  popupAnchor: [0, -7], // on the top
});

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPopup,
    LControlAttribution,
  },
  props: ['stations'],
  data() {
    return {
      max: Math.max(...this.stations.map(s => s.count)),
      stationIcon,
    }
  }
}
</script>
