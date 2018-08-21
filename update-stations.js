const fs = require('fs');
const axios = require('axios');
const prevStations = fs.existsSync('./stations.json') ? require('./stations.json') : [];
const keys = require('./keys.json')

const statsAPI = 'https://ressources.data.sncf.com/api/records/1.0/analyze/?dataset=tgvmax&x=destination&y.count.func=COUNT';
const googleAPI = `https://maps.googleapis.com/maps/api/geocode/json?region=fr&key=${keys.googleAPI}`;

const prevStationsNames = prevStations.map(s => s.name);

axios(statsAPI).then(async ({ data }) => {
  stations = [];

  for (element of data) {
    const name = element.x;
    let coordinates;
    if (prevStationsNames.includes(name)) {
      coordinates = prevStations.find(s => s.name === name).coordinates;
    } else {
      coordinates = await geocodeStation(name);
    }
    stations.push({ name, coordinates, count: element.count });
  }

  fs.writeFile(
    './stations.json',
    JSON.stringify(stations),
    () => console.log('Stations updated')
  );
}).catch(console.error);

const geocodeStation = async name => {
  const searchName = name.includes('TGV') ? name : `${name} TGV`
  const response = await axios(googleAPI, { params: { address: searchName } });
  const firstResult = response.data.results[0];
  if (firstResult) {
    const location = firstResult.geometry.location;
    return [location.lat, location.lng]; // leaflet format
  } else {
    console.warn(`No results for : ${searchName}`);
    return [];
  }
}
