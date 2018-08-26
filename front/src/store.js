export default {
  state: {
    startStation: undefined,
    endStation: undefined,
    startDate: undefined,
    endDate: undefined,
    userLocation: undefined,
    results: undefined,
  },
  mutations: {
    set(state, payload) {
      state[payload.key] = payload.value;
    }
  }
};
