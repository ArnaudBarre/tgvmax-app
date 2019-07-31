/* eslint-disable no-param-reassign */
import stations from '../stations.json';

const initialState = {
  startStation: undefined,
  endStation: undefined,
  startDate: undefined,
  userLocation: undefined,
  results: undefined,
  error: false,
  zoom: 6,
  center: { lat: 46.5, lng: 2.5 },
  markers: stations,
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
        state.zoom = 6;
      }
    },
  },
};
