// ----- Bring in required packages ------ //
const express = require("express");
const cors = require("cors");
var sqlite = require("sqlite3").verbose();

// ------ Create App Constants and Initialize Some Stuff ----- //
const app = express();
app.use(cors());
app.use(express.json());
var db = new sqlite.Database("main.db");


// --------- Custom JS Functions ----------- //
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
  } else {
    console.log(result)
    console.log('oaosd')
  }

  return true;
}


// -------- App Routes -------- //
app.get('/', (req, res) => {

  db.all("SELECT * FROM users", (err, rows) => {

    if (err){
      res.json({
        message: err.message
      });
    }

    res.json({
      message: rows[0].email
    });

  });


});

app.post('/signup', (req, res) => {
  if (signupValid(req.body)) {

    // Insert into DB if valid
    const info = {
      username: req.body.email.toString(),
      pass: req.body.pass.toString()
    };

    db.all('INSERT INTO users(email, password) VALUES ("' + info.username + '", "' + info.pass + '");', (err, rows) => {

      if (err){
        res.json({
          message: err.message
        });

        console.log(err.message)
      }

      res.json({
        message: "Success!"
      });
      console.log("Success!")

    });

  } else {
    res.status(422);
    res.json({
      "message":"Somthing's wrong here..."
    });
    console.log("422")
  }
});

app.listen(5000, () => {
  console.log("Listening on https://localhost:5000");
})
