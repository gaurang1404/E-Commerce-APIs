import fs from 'fs';    //File system module

const fsPromise = fs.promises;  //uses promises to use fs operations

//Adding date and appending the logData to log.txt using fs
async function log(logData) {
    try {
        logData = `\n ${new Date().toString()} - ${logData}`;
        await fsPromise.appendFile('log.txt', logData);
    } catch(err) {
        console.log(err);
    }
}

//Actual middleware that we'll export 
const loggerMiddleware = async (req, res, next) => { 
    // 1. Log request body.
    if(!req.url.includes("signin")){
        const logData = `${req.url} - ${JSON.stringify(req.body)}`; //Since req.body is not in string format we need to convert it from JSON to string
        await log(logData);
    }
    next();
};

export default loggerMiddleware;