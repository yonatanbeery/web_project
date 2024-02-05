// var fs = require('fs');
// var http = require('http');
// var https = require('https');
const env = require("dotenv").config();
const initApp = require("./app");

initApp().then((app) => {
  if (process.env.NODE_ENV == "development") {
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`server listening at http://localhost:${port}`);
    });
  } else {
    var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
    var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
    var credentials = {key: privateKey, cert: certificate};
  }
  
});
