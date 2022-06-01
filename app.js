require('dotenv').config();

// import del modelo
const Server = require('./models/server');


const server = new Server();
server.listen();
