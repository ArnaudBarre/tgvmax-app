const fs = require('fs');
const axios = require('axios');

const statsAPI = 'https://ressources.data.sncf.com/api/records/1.0/analyze/?dataset=tgvmax&x=destination&y.count.func=COUNT'

axios.get(statsAPI).then(({ data }) => {
  fs.writeFile(
    './stations.json',
    JSON.stringify(data.map(d => d.x)),
    () => console.log('Stations updated')
  );
});
