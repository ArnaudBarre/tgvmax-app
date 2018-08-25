const express = require('express');
const axios = require('axios');
const compression = require('compression');
const moment = require('moment');

const api = 'https://ressources.data.sncf.com/api/records/1.0/search/?dataset=tgvmax';

const app = express();
app.use(compression());
app.use(express.static(__dirname + '/front'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

moment.locale('fr');

app.get('/lastUpdate', (req, res) => {
  axios(api)
    .then(response => res.send(moment(response.data.records[0].record_timestamp).fromNow()))
    .catch(({ statusCode }) => res.sendStatus(statusCode ? statusCode : 500));
});

const groupData = (data, key) => {
  return data.records
    .map(r => r.fields)
    .sort((a, b) => a.heure_depart.replace(':', '') - b.heure_depart.replace(':', ''))
    .map(fields => ({ city: fields[key], hours: `${fields.heure_depart} -> ${fields.heure_arrivee}` }))
    .reduce((acc, val) => {
      (acc[val.city] = acc[val.city] || new Set()).add(val.hours);
      return acc;
    }, {});
};

const callApi = (date, orgine, destination) => axios.get(api, {
  params: {
    rows: 1000,
    'refine.date': date,
    'refine.od_happy_card': 'OUI',
    'refine.origine': orgine,
    'refine.destination': destination,
  },
});

app.get('/search', (req, res) => {
  Promise.all([
    callApi(req.query.startDate, req.query.from, null),
    callApi(req.query.endDate, null, req.query.from),
  ]).then(([startResponse, backResponse]) => {
    const dataGo = groupData(startResponse.data, 'destination');
    const dataBack = groupData(backResponse.data, 'origine');
    const commons = [];
    Object.keys(dataGo).forEach(station => {
      if (dataBack.hasOwnProperty(station)) {
        commons.push({ station, go: [...dataGo[station]], back: [...dataBack[station]] });
      }
    });
    res.send(commons);
  }).catch(({ statusCode }) => res.sendStatus(statusCode ? statusCode : 500));
});

app.listen(process.env.PORT || 3000, () => console.log('App running at http://localhost:3000'));
