// ----- Bring in required packages ------ //
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var sqlite = require("sqlite3").verbose();


// ------ Create App Constants and Initialize Some Stuff ----- //
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
var db = new sqlite.Database("main.db");


// ----------------------- Custom JS Functions ----------------------- //
function signupValid(info){

  // Check for null cases
  if (info.email.toString().trim() === '' || info.pass.toString().trim === ''){
    return false;
  }

  // Check if email already exists
  var result = db.get("SELECT id FROM users WHERE email = '" + info.email + "';").rows
  if (result != undefined){
    return false;
    console.log('repeat')
  }

  return true;
}


// ----------------------- App Routes ---------------------- //
app.get('/', (req, res) => {
  res.json({
    'cookies': req.headers.cookie
  })
});

app.get('/signup', (req, res) => {

  console.log(req.headers.cookie);

  res.json({

  })
  /*// Check credentials
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
      }

      // Set cookies on succesful sign up

      //res.cookie('email', info.username, {maxAge: 1000 * 60 * 60 * 24}).send();
    });


  // Handle bad/duplicate credentials
  } else {
    res.status(422);
    res.json({
      "message":"Somthing's wrong here..."
    });
    console.log("422")
  }
  */
});


// Listen
app.listen(5000, () => {
  console.log("Listening on https://localhost:5000");
})
