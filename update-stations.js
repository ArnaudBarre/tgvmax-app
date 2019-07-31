const fs = require('fs');
const axios = require('axios');
const prevStations = require('./stations.json');

const statsAPI = 'https://ressources.data.sncf.com/api/records/1.0/analyze/?dataset=tgvmax&x=destination&y.count.func=COUNT';
const googleAPI = 'https://maps.googleapis.com/maps/api/geocode/json?region=fr&key=AIzaSyAsq0jBT7iBfw9b2_tAsHbkUuY532ZY9wA';

axios(statsAPI).then(async ({ data }) => {
  const stations = [];

  for (const element of data) {
    const name = element.x;
    const previousStation = prevStations.find(s => s.name === name);
    const coordinates = previousStation && previousStation.coordinates.lat
      ? previousStation.coordinates
      : await geocodeStation(name);
    stations.push({ name, coordinates, count: element.count });
  }

  fs.writeFile(
    './stations.json',
    JSON.stringify(stations),
    () => console.log('Stations updated'),
  );
}).catch(console.error);

const geocodeStation = async name => {
  const searchName = name.includes('TGV') ? name : `${name} TGV`;
  const response = await axios(googleAPI, { params: { address: searchName } });
  const firstResult = response.data.results[0];
  if (firstResult) {
    return firstResult.geometry.location;
  } else {
    console.warn(`No results for : ${searchName}`);
    return {};
  }
};
