var fs = require('fs');
var http = require('http');
var https = require('https');
const env = require("dotenv").config();
const initApp = require("./app");

initApp().then((app) => {
  if (process.env.NODE_ENV == "development") {
    const port = process.env.HTTP_PORT;
    var httpServer = http.createServer(app);
    httpServer.listen(port, () => {
      console.log(`server listening at http://localhost:${port}`);
    });
  }
    const port = process.env.HTTPS_PORT;
    var privateKey  = fs.readFileSync('./client-key.pem', 'utf8');
    var certificate = fs.readFileSync('./client-cert.pem', 'utf8');
    var credentials = {key: privateKey, cert: certificate};
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port, () => {
      console.log(`server listening at https://localhost:${port}`);
    });
});

