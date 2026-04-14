const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ status: 'NavApp backend radi!' });
});

app.listen(3000, () => console.log('Server radi na portu 3000'));