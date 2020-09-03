const express = require('express');

const users = require('./routes/users');


const app = express();

app.use(express.json());
app.use('/api/users',users);

const port = 3000;

app.listen(3000, () => {
    console.log(`Listening to port ${port}`);
    
})