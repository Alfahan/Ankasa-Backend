const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const usersRouter = require('./src/routes/users')
const locationRouter = require('./src/routes/location')
const airlinesRouter = require('./src/routes/airlines')

const { PORT } = require('./src/helpers/env')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(cors())

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/location', locationRouter)
app.use('/api/v1/airlines', airlinesRouter)

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
});


