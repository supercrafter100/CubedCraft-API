// Dependencies
import http from 'http';
import app from './index';

import './util/UUIDCache';

(async () => {

    // Setting up
    const port = process.env.PORT || 8080;
    const server = http.createServer(app);

    // Start server
    server.listen(port);
    server.on('listening', () => {
        console.log(`Server listening on port ${port}`);
    })
})()