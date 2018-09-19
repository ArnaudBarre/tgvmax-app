/* eslint-disable no-param-reassign */

import stations from '../../stations.json';

const initialState = {
  startStation: undefined,
  endStation: undefined,
  startDate: undefined,
  userLocation: undefined,
  results: undefined,
  zoom: 5,
  center: { lat: 46.5, lng: 2.5 },
  markers: stations.map(s => ({ ...s, popupOpen: false })),
  max: Math.max(...stations.map(s => s.count)),
};

export default {
  state: initialState,
  getters: Object.keys(initialState).reduce((acc, key) => {
    acc[key] = state => state[key];
    return acc;
  }, {}),
  mutations: {
    set(state, { key, value }) {
      state[key] = value;
      if (key === 'startStation' || key === 'endStation') {
        state.zoom = 5;
        if (value) {
          state.markers.find(s => s.name === value).popupOpen = true;
        }
      }
    },
  },
};
