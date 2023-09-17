const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs')
const EventEmitter = require('events');
const fsPromises = require('fs').promises;
const path = require('path');


const emitter = new EventEmitter();
const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'logs.txt'), logItem);
    } catch (err) {
        console.log("logEvents",err);
    }
}

const logger = (req, res, next) => {
    emitter.emit('log', `${req.method}:\t${req.headers.origin}\t${req.url}`)
    next();
}

const errorHandler = (err,req,res,next) =>{
    emitter.emit('error',`${err.name}:\t${err.message}\t from ${req.headers.origin}\t for url:${req.url}`);
    res.status(500).send("Not allowed by CORS Policy.") 
}

emitter.on('log', (msg) => {
    logEvents(msg);
});

emitter.on('error', (msg) => {
    logEvents(msg);
});
module.exports = { logEvents, logger,errorHandler };