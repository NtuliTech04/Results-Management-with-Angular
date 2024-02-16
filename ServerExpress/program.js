//CORS Options - Whitelisted URLS
var whitelist = ["http://localhost:4200", "http://localhost:4000", "http://localhost:8080"];
var corsOptions = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    };
  }
  else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};

module.exports = {corsOptions} 
