const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', '../public/index.html'));
});

app.get('/apple-app-site-association', function(req, res) {
    res.sendFile(path.join(__dirname, '/apple-app-site-association'));
});

app.get('/terms-of-use', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'terms-of-use.html'));
});

app.get('/privacy-policy', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'privacy-policy.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});