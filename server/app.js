const express = require('express');

const app = express();
const port = process.env.PORT || 5000


require('./db/conn');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require('./router/auth'));



app.listen(port, () => {
    console.log('listening')
})