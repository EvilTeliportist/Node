const express = require("express");
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());

function loginValid(info){
  return info.email.toString().trim() !== '' && info.pass.toString().trim !== '';
}

app.get('/', (req, res) => {
  res.json({
    message: "Hi!"
  })
})

app.post('/signup', (req, res) => {
  if (loginValid(req.body)) {
    //insert into DB
    const info = {
      username: req.body.email.toString(),
      pass: req.body.pass.toString()
    };

    console.log(info);
  } else {
    res.status(422);
    res.json({
      "message":"Somthing's wrong here..."
    })
  }
})

app.listen(5000, () => {
  console.log("Listening on https://localhost:5000");
})
