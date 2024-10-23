import config from '../config';
import * as http from 'http';
import app, { startDatabase } from '../app';
import { Utils } from '../application/utils/utils.service';


const port = normalizePort(Number(config.PORT));
if (!port) {
    Utils.LOGGER.error(`Invalid port: ${config.PORT}`);
    process.exit(1);
}
app.set('port', port);

const server = http.createServer(app);

startDatabase().then(() => {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
}).catch(err => {
    Utils.LOGGER.error('Error initializing the database:', err);
    process.exit(1);
});

function normalizePort(val: number) {
    const nPort = typeof val === 'number' ? val : parseInt(val, 10);

    if (isNaN(nPort) || nPort < 0) {
        return false;
    }

    return nPort;
}

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    switch (error.code) {
        case 'EACCES':
            Utils.LOGGER.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            Utils.LOGGER.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ${(address as any).port}`;
    Utils.LOGGER.info(`Listening on ${bind}`);
    
}