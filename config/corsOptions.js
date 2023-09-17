const whitelist = ["https://www.google.co.uk"]

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            console.log("Not allowed by CORS")
            callback(new Error("Not allowed by CORS Policy."));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;