const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const usersRouter = require('./src/routes/users')

const { PORT } = require('./src/helpers/env')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(cors())

app.use('/api/v1/users', usersRouter)

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
});


