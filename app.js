const express = require('express');
const mongoose = require('mongoose');
const swipeRoutes = require('./routes/swipeRoutes');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api', swipeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
