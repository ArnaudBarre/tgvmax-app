let express = require('express');
let request = require('request');
let stations = require('./stations.json');

const api = 'https://ressources.data.sncf.com/api/records/1.0/search/?dataset=tgvmax';

let app = express();

app.use(express.static(__dirname + '/front'));

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.get('/lastUpdate', (req, res) => {
  request(api, (error, response, body) => {
    if (error) error.statusCode ? res.sendStatus(error.statusCode) : res.sendStatus(500);
    else res.send(JSON.parse(body).records[0].record_timestamp);
  });
});

let groupData = (body, key) => {
  return JSON.parse(body).records
             .map(r => r.fields)
             .sort((a, b) => a.heure_depart.replace(":", "") - b.heure_depart.replace(":", ""))
             .reduce((acc, val) => {
               (acc[val[key]] = acc[val[key]] || new Set()).add(val.heure_depart + ' -> ' + val.heure_arrivee);
               return acc;
             }, {});
};

app.get('/stations', (req, res) => {
  let dataGo, dataBack;
  let requests = 2;
  let combine = () => {
    if (dataGo.error) dataGo.error.statusCode ? res.sendStatus(dataGo.error.statusCode) : res.sendStatus(500);
    if (dataBack.error) dataBack.error.statusCode ? res.sendStatus(dataBack.error.statusCode) : res.sendStatus(500);
    let common = [];
    Object.keys(dataGo).forEach(station => {
      if (dataBack.hasOwnProperty(station)) common.push({station, go: [...dataGo[station]], back:[...dataBack[station]]})
    });
    res.send(common);
  };
  request({
    url: api,
    qs: {
      rows: 1000, 'refine.date': req.query.startDate, 'refine.od_happy_card': 'OUI', 'refine.origine': req.query.from
    }
  }, (error, response, body) => {
    dataGo = error ? {error} : groupData(body, 'destination');
    if (--requests === 0) combine()
  });
  request({
    url: api,
    qs: {
      rows: 1000, 'refine.date': req.query.endDate, 'refine.od_happy_card': 'OUI', 'refine.destination': req.query.from
    }
  }, (error, response, body) => {
    dataBack = error ? {error} : groupData(body, 'origine');
    if (--requests === 0) combine()
  });
});

app.listen(process.env.PORT || 3000, () => console.log('App running at http://localhost:3000'));
