import axios from 'axios';
import moment from 'moment';
import { api } from './search';

moment.locale('fr');

export function handler(event, context, callback) {
  axios(api)
    .then(response => callback(null, {
      statusCode: 200,
      body: response.data.records.length
        ? moment(response.data.records[0].record_timestamp).fromNow()
        : 'Aucune donnée disponible',
    }))
    .catch(({ statusCode = 500 }) => callback(null, { statusCode }));
}
