const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT =  3000;

app.use(bodyParser.json());
app.use('/', routes);
app.get('/', (req, res) => {

    const message = '<h1>Hello, World!</h1>';

    // Send the message as a response
    res.send(message);
});

mongoose.connect(`mongodb+srv://parthasarathi:sarathi31@cluster0.przcikx.mongodb.net/NodeThree`)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));