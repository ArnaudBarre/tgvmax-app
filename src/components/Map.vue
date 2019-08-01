<template>
  <l-map
    :zoom="zoom"
    :min-zoom="6"
    :max-zoom="17"
    :center="center"
    :options="{ zoomControl: false, attributionControl: false }"
    style="width: 100%; height: 100%">
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <l-marker
      v-for="m in markers"
      :ref="m.name"
      :icon="stationIcon"
      :key="m.name"
      :lat-lng="m.coordinates">
      <l-popup :options="{ autoClose: false, closeOnClick: false }">
        <div>{{ m.name + ' - Fréquence : ' + Math.round(m.count / max * 100) + '%' }}</div>
        <div class="text-xs-center">
          <a @click="set('startStation', m.name)">Partir de là</a>
          <span class="mx-2">-</span>
          <a @click="set('endStation', m.name)">Y aller</a>
        </div>
      </l-popup>
    </l-marker>
    <l-marker
      v-if="userLocation"
      :icon="positionIcon"
      :lat-lng="userLocation" />
    <l-control-attribution
      prefix="OpenStreetMap"
      position="bottomright" />
  </l-map>
</template>

<script>
import { mapGetters } from 'vuex';
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

const positionIcon = divIcon({
  html: '<i class="material-icons">my_location</i>',
  className: 'primary--text',
  iconSize: [24, 24], // default material icon size
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
  data() {
    return {
      stationIcon,
      positionIcon,
    };
  },
  computed: {
    ...mapGetters(['userLocation', 'startStation', 'endStation', 'max', 'markers', 'center', 'zoom']),
  },
  watch: {
    startStation(newStation) {
      if (newStation) {
        this.$refs[newStation][0].mapObject.openPopup();
        if (this.$refs[this.endStation]) {
          this.$refs[this.endStation][0].mapObject.openPopup();
        }
      }
    },
    endStation(newStation) {
      if (newStation) {
        this.$refs[newStation][0].mapObject.openPopup();
      }
    },
  },
  methods: {
    set(key, value) {
      this.$store.commit('set', { key, value });
    },
  },
};
</script>
