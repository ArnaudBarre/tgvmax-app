const express = require('express');
const axios = require('axios');
const compression = require('compression');
const moment = require('moment');

const api = 'https://ressources.data.sncf.com/api/records/1.0/search/?dataset=tgvmax';

const app = express();
app.use(compression());
app.use(express.static(__dirname + '/front/dist'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

moment.locale('fr');

app.get('/lastUpdate', (req, res) => {
  axios(api)
    .then(response => res.send(
      response.data.records.length
        ? moment(response.data.records[0].record_timestamp).fromNow()
        : 'Aucune donnée disponible'),
    )
    .catch(({ statusCode }) => res.sendStatus(statusCode ? statusCode : 500));
});

const callApi = (date, orgine, destination) => axios.get(api, {
  params: {
    rows: 1000,
    'refine.date': date,
    'refine.od_happy_card': 'OUI',
    'refine.origine': orgine,
    'refine.destination': destination,
  },
});

const timeSort = (a, b) => {
  const diffStartTime = a.heure_depart.replace(':', '') - b.heure_depart.replace(':', '');
  if (diffStartTime === 0) {
    return a.heure_arrivee.replace(':', '') - b.heure_arrivee.replace(':', '');
  } else {
    return diffStartTime;
  }
};

const filterResult = (value, index, array) => {
  return array.findIndex(v => v.heure_depart === value.heure_depart) === index;
};

const groupResults = (data, key) => {
  return data.records
    .map(r => r.fields)
    .sort(timeSort)
    .filter(filterResult)
    .map(fields => ({ city: fields[key], hours: `${fields.heure_depart} -> ${fields.heure_arrivee}` }))
    .reduce((acc, val) => {
      (acc[val.city] = acc[val.city] || new Set()).add(val.hours);
      return acc;
    }, {});
};

const groupDirectResults = data => {
  return data.records
    .map(r => r.fields)
    .sort(timeSort)
    .filter(filterResult)
    .map(fields => `${fields.heure_depart} -> ${fields.heure_arrivee}`);
};

app.get('/search', (req, res) => {
  const { startDate, startStation, endStation } = req.query;
  Promise.all([
    callApi(startDate, startStation, endStation),
    callApi(startDate, startStation, null),
    callApi(startDate, null, endStation),
  ]).then(([directRideResponse, firstRideResponse, secondRideResponse]) => {
    const dataDirectRide = groupDirectResults(directRideResponse.data);
    const dataFirstRide = groupResults(firstRideResponse.data, 'destination');
    const dataSecondRide = groupResults(secondRideResponse.data, 'origine');

    const connections = [];
    Object.keys(dataFirstRide).forEach(station => {
      if (dataSecondRide.hasOwnProperty(station)) {
        connections.push({ station, firstRide: [...dataFirstRide[station]], secondRide: [...dataSecondRide[station]] });
      }
    });

    res.send({
      directRide: dataDirectRide,
      connections,
    });
  }).catch(({ statusCode }) => res.sendStatus(statusCode ? statusCode : 500));
});

app.listen(process.env.PORT || 3000, () => console.log('App running at http://localhost:3000'));
