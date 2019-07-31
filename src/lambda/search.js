import axios from 'axios';

export const api = 'https://ressources.data.sncf.com/api/records/1.0/search/?dataset=tgvmax';

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
  }
  return diffStartTime;
};

const filterResult = key => (value, index, array) =>
  array.findIndex(v => v[key] === value[key] && v.heure_depart === value.heure_depart) === index;

const groupResults = (data, key) =>
  data.records
    .map(r => r.fields)
    .sort(timeSort)
    .filter(filterResult(key))
    .map(fields => ({
      city: fields[key],
      number: fields.train_no,
      hours: { start: fields.heure_depart, end: fields.heure_arrivee },
    }))
    .reduce((acc, val) => {
      (acc[val.city] = acc[val.city] || []).push(val);
      return acc;
    }, {});


export function handler(event, context, callback) {
  const { startDate, startStation, endStation } = event.queryStringParameters;
  Promise.all([
    callApi(startDate, startStation, endStation),
    callApi(startDate, startStation, null),
    callApi(startDate, null, endStation),
  ]).then(([directRideResponse, firstRideResponse, secondRideResponse]) => {
    const dataDirectRide = groupResults(directRideResponse.data, 'origine')[startStation] || [];
    const dataFirstRide = groupResults(firstRideResponse.data, 'destination');
    const dataSecondRide = groupResults(secondRideResponse.data, 'origine');

    const directTrainNumbers = dataDirectRide.map(train => train.number);
    const connections = [];
    Object.keys(dataFirstRide).forEach((station) => {
      if (dataSecondRide.hasOwnProperty(station)) {
        const firstFistRideEnd = dataFirstRide[station][0].hours.end;
        const lastSecondRideStart =
          dataSecondRide[station][dataSecondRide[station].length - 1].hours.start;
        const possibleFirstRides = dataFirstRide[station].filter(({hours, number}) =>
          !directTrainNumbers.includes(number) &&
          hours.end.replace(':', '') - hours.start.replace(':', '') > 0 && // avoid night train for first ride
          hours.end.replace(':', '') - lastSecondRideStart.replace(':', '') < 0
        );
        const possibleSecondRides = dataSecondRide[station].filter(({hours, number}) =>
          !directTrainNumbers.includes(number) &&
          hours.start.replace(':', '') - firstFistRideEnd.replace(':', '') > 0
        );
        if (possibleFirstRides.length && possibleSecondRides.length) {
          connections.push({
            station,
            firstRide: possibleFirstRides.map(({ hours }) => `${hours.start} -> ${hours.end}`),
            secondRide: possibleSecondRides.map(({ hours }) => `${hours.start} -> ${hours.end}`),
          });
        }
      }
    });

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        directRide: dataDirectRide.map(({ hours }) => `${hours.start} -> ${hours.end}`),
        connections,
      }),
    });
  }).catch(({ statusCode = 500 }) => callback(null, { statusCode }));
}
