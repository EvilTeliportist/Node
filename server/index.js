// ----- Bring in required packages ------ //
const express = require("express");
const cors = require("cors");
var sqlite = require("sqlite3").verbose();
const cookieparser = require('cookie-parser');


// ------ Create App Constants and Initialize Some Stuff ----- //
const app = express();
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.static(__dirname + '/pages'));

var db = new sqlite.Database("main.db");


// ----------------------- Custom JS Functions ----------------------- //
function signupValid(info){
  return info.email.toString().trim() !== '' && info.pass.toString().trim !== '';
}

function checkUser(email, password, res){
  db.get("SELECT id FROM users WHERE email='"+email.toString()+"' AND password='"+password.toString()+"';", (err, rows) => {
    if (err) {
      console.log(err.message);
    }

    if (rows != undefined){
      res.sendFile(__dirname+'/pages/dash/dash.html')
    } else {
      res.sendFile(__dirname+'/pages/intro/intro.html')
    }
  })
}

// ----------------------- App Routes ---------------------- //
app.get('/', (req, res) => {
  // ACCESS COOKIES IN THE REQUEST AND AUTO SIGN IN
  // Return intro if cookies incorrect
  email = req.cookies.email || '';
  password = req.cookies.password || '';
  checkUser(email, password, res);
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
        res.redirect('/')
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


app.post('/login', (req, res) => {
  const info = {
    email: req.body.email.toString(),
    password: req.body.password.toString()
  }

  res.redirect('/');
})


app.get('/new_goal', (req, res) =>  {
  res.sendFile(__dirname+'/pages/new_goal/new_goal.html')
})

// Listen
app.listen(5000, () => {
  console.log("Listening on https://localhost:5000");
})
