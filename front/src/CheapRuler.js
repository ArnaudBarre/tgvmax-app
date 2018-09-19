/* eslint-disable no-mixed-operators */

// From: mapbox/cheap-ruler
export default class CheapRuler {
  constructor(lat) {
    const cos = Math.cos(lat * Math.PI / 180);
    const cos2 = 2 * cos * cos - 1;
    const cos3 = 2 * cos * cos2 - cos;
    const cos4 = 2 * cos * cos3 - cos2;
    const cos5 = 2 * cos * cos4 - cos3;
    // multipliers for converting longitude and latitude degrees into distance (http://1.usa.gov/1Wb1bv7)
    this.kx = 111.41513 * cos - 0.09455 * cos3 + 0.00012 * cos5;
    this.ky = 111.13209 - 0.56605 * cos2 + 0.0012 * cos4;
  }

  distance(a, b) {
    const dx = (a.lng - b.lng) * this.kx;
    const dy = (a.lat - b.lat) * this.ky;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
