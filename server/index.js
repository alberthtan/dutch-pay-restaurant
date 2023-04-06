const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, 'build')));

// Route all requests to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', '../public/index.html'));
});

app.get('/apple-app-site-association', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/.well-known/apple-app-site-association'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});