
const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        // conectar a base de datos
        this.conectarDB();

        // Middleware
        this.middlewares();
        
        // Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB() {
        await dbConnection();
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/user.routes'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto : ', this.port)
        })
    }
    middlewares() {

        // CORS
        this.app.use(cors());

        // para cuando la informacion que resiva el backend (post,put,delete) se reciba en formato JSON
        // lectura y parseo del body
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'));
    }
}
module.exports = Server;

// El Intercambio de Recursos de Origen Cruzado (CORS (en-US))