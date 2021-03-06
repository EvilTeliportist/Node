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

function checkUser(email, password, res, destination){
  db.get("SELECT id FROM users WHERE email='"+email.toString()+"' AND password='"+password.toString()+"';", (err, rows) => {
    if (err) {
      console.log(err.message);
    }

    if (rows != undefined){
      // GET GOALS INFO AND SEND IT BACK WITH THE FILE IN RES.JSON
      res.sendFile(__dirname+'/pages/'+destination+'/'+destination+'.html')
    } else {
      res.sendFile(__dirname+'/pages/intro/intro.html')
    }
  })
}

function getUserInfo(email, password, res){
  if(email.toString() == '' || password.toString() == ''){

    res.json({info:''});

  } else {
    db.get("SELECT * FROM users WHERE email='" + email.toString() +
           "' AND password='" + password.toString() + "';", (err, rows) => {

      // handle errors
      if(err || rows == undefined){
        console.log(err);
        res.send({
          userInfo:{
            totalHours:'error',
            totalLandmarks:'error',
            goals: []
          }
        })
      }

      // return res.json with user info
      res.send({
        userInfo:{
          totalHours:(rows.totalMinutes/60).toFixed(2),
          totalLandmarks:rows.totalLandmarks,
          goals: []
        }
      });
    });
  }
}

// ----------------------- App Routes ---------------------- //
app.get('/', (req, res) => {
  // ACCESS COOKIES IN THE REQUEST AND AUTO SIGN IN
  // Return intro if cookies incorrect
  email = req.cookies.email || '';
  password = req.cookies.password || '';
  checkUser(email, password, res, 'dash');
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

app.get('/info', (req, res) => {
  email = req.cookies.email || '';
  password = req.cookies.password || '';
  getUserInfo(email, password, res);
})

app.get('/new_goal', (req, res) => {
  email = req.cookies.email || '';
  password = req.cookies.password || '';
  checkUser(email, password, res, 'new_goal');
})

// Listen
app.listen(5000, () => {
  console.log("Listening on https://localhost:5000");
})
