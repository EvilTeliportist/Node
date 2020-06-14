// ----- Bring in required packages ------ //
const express = require("express");
const cors = require("cors");
var sqlite = require("sqlite3").verbose();


// ------ Create App Constants and Initialize Some Stuff ----- //
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/pages'));

var db = new sqlite.Database("main.db");


// ----------------------- Custom JS Functions ----------------------- //
function signupValid(info){
  return info.email.toString().trim() !== '' && info.pass.toString().trim !== '';
}


// ----------------------- App Routes ---------------------- //
app.get('/', (req, res) => {
    // ACCESS COOKIES IN THE REQUEST AND AUTO SIGN IN
  res.sendFile(__dirname+'/pages/intro.html')
});

app.post('/signup', (req, res) => {

  // Check credentials
  if (signupValid(req.body)) {
    const info = {
      username: req.body.email.toString(),
      pass: req.body.pass.toString()
    };

    // Insert into DB
    db.all('INSERT INTO users(email, password) VALUES ("' + info.username + '", "' + info.pass + '");', (err, rows) => {

      // Handle Error in SQL
      if (err){
        res.json({
          message: err.message
        });
        console.log(err.message)
        } else {

        // Redirect on successful signup
        res.redirect('/dash')

        }
    });


  // Handle bad/duplicate credentials
  } else {
    res.status(422);
    res.json({
      "message":"Somthing's wrong here..."
    });
    console.log("422")
  }
});

app.get('/dash', (req, res) => {
    console.log('dash')
    res.set('content-type', 'text/html');
    res.sendFile(__dirname+'/pages/dash.html');
})

// Listen
app.listen(5000, () => {
  console.log("Listening on https://localhost:5000");
})
