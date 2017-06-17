let express = require('express');

let app = express();

app.use(express.static(__dirname + '/front'));

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(process.env.PORT || 3000, () => console.log('App running at http://localhost:3000'));
