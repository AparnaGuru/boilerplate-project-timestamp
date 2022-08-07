// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


var respJson={};
app.get("/api/:inputval", (req,res) => {
  console.log(req.url)
  var inputval=req.params.inputval

  if (isNaN(inputval) == false) {
    inputval = parseInt(inputval);
  }
  var dateObject = new Date(inputval);
  
  if (dateObject.toString() == "Invalid Date") {
    respJson["error"]= "Invalid Date"
  }
  else if (inputval.toString().includes("-")) {
    respJson['unix'] = new Date(inputval).getTime();
    respJson['utc'] = new Date(inputval).toUTCString();    
  } 
  else  {
    console.log("hello");
    respJson['unix'] = new Date(inputval).getTime();
    respJson['utc'] = new Date(inputval).toUTCString();    
  }
console.log(respJson)
res.json(respJson);
})

app.get("/api", (req,res) => {
  respJson['unix'] = new Date().getTime();
  respJson['utc'] = new Date().toUTCString();
  res.json(respJson);
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
