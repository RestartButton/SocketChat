const app = require('./app');
const ws = require('./app-ws');
const http = require('http').createServer(app);
const io = ws(http);


require('dotenv').config()
const { PORT, HOST } = process.env;

app.set('io', io);

http.listen(PORT || 3000, () => {
    console.log(`Server listening at ${HOST}:${PORT}`);
});