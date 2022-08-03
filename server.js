const express = require('express');
const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
})