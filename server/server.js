import cluster from 'cluster';
import app from './express';
import http from 'http';
import config from '../config/config';
import dbConnect from './database/dbConnect';

dbConnect();

// const cpuCount = require('os').cpus().length;

// if (cluster.isMaster) {
//     console.log(`Primary process(${process.pid}) is up and running...`);

//     for (let i = 0; i < cpuCount; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.error(`Worker(${worker.process.pid}) died with code(${code}) and signal(${signal})`);
//         cluster.fork();
//     });
// } else {
    http.createServer(app).listen(config.port);
    // console.log(`Worker(${process.pid}) started listening on ${config.port}`);
// }