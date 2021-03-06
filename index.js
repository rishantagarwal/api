var express = require('express');
var bodyParser = require('body-parser');
var MailParser = require('mailparser').MailParser;
var mailparser = new MailParser();
var ReactEngine = require('express-react-engine');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// views is directory for all template files
app.set('views', __dirname + '/components');
// app.set('view engine', 'ejs');
app.engine('jsx', reactEngine({wrapper: 'index.jsx'}));

app.get('/', function(request, response) {
  response.render('react/index.html');
});

app.post('/mail',function(req,res){

  mailparser.write(req.body.mail);
  mailparser.end();
  res.send("Done");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


mailparser.on("end",function(mail_object){
  console.log("From:", mail_object.from); //[{address:'sender@example.com',name:'Sender Name'}]
  console.log("Subject:", mail_object.subject); // Hello world!
  console.log("Text body:", mail_object.text); // How are you today?
});
