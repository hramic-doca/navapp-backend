const express = require('express');
const app = express();
app.use(express.json());

// Testni radari u BiH
const radari = [
  { id: 1, lng: 18.3441, lat: 43.9016, limit: 50, naziv: "Vogošća centar" },
  { id: 2, lng: 18.4131, lat: 43.8563, limit: 80, naziv: "Sarajevo - Titova" },
];

function udaljenost(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *
            Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Endpoint kojeg će React Native app zvati
app.get('/radari/blizina', (req, res) => {
  const { lat, lng, radijus = 2000 } = req.query;

  const bliznji = radari.filter(r =>
    udaljenost(parseFloat(lat), parseFloat(lng), r.lat, r.lng) <= radijus
  );

  res.json({ radari: bliznji });
});

app.get('/', (req, res) => res.json({ status: 'NavApp backend radi!' }));

app.listen(3000, () => console.log('Server radi'));
