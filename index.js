const express = require('express');
const cors = require('cors')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const usersRouter = require('./src/routes/users')
const locationRouter = require('./src/routes/location')
const airlinesRouter = require('./src/routes/airlines')
const flightRouter = require('./src/routes/flight')

const { PORT } = require('./src/helpers/env')


const app = express();
app.set('views', path.join(__dirname,'src/views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())



app.use(cors())

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/location', locationRouter)
app.use('/api/v1/airlines', airlinesRouter)
app.use('/api/v1/flight', flightRouter)

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
});


