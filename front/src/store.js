/* eslint-disable no-param-reassign */

import stations from '../../stations.json';

export default {
  state: {
    startStation: undefined,
    endStation: undefined,
    startDate: undefined,
    endDate: undefined,
    userLocation: undefined,
    results: undefined,
    zoom: 5,
    center: { lat: 46.5, lng: 2.5 },
    stations: stations.map(s => ({ ...s, popupOpen: false })),
    max: Math.max(...stations.map(s => s.count)),
  },
  mutations: {
    set(state, { key, value }) {
      state[key] = value;
      if (key === 'startStation' || key === 'endStation') {
        state.zoom = 5;
        if (value) {
          state.stations.find(s => s.name === value).popupOpen = true;
        }
      }
    },
  },
};
