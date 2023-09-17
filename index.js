const { logger } = require('./middleware/logEvents')
const path = require('path')
const express = require('express')
const cors = require('cors')
const { errorHandler } = require('./middleware/logEvents')
const corsOptions = require("./config/corsOptions")

const app = express()
const PORT = process.env.PORT || 3000;

app.use(logger)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/',express.static(path.join(__dirname, 'public')))


//routes
app.use("/",require("./routes/root"))
app.use("/employees",require("./routes/employees"))


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        req.send('<h1>404 Not Found</h1>')
    }
    else if (req.accepts('json')) {
        req.json({error:"Not Found"})
    }else{
        res.type('text').send("404 Not Found")
    }
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("Server listening on port 3000...")
})