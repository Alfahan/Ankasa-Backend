const express = require('express');
const cors = require('cors')
const { PORT } = require('./src/helpers/env')

const app = express();

app.use(cors())

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
});


