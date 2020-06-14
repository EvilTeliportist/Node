
var startbutton = $("#startbutton");
var loginbutton = $("#loginbutton");

const signup = document.getElementById("sign-up-form");
const login = document.getElementById("login-form");
const SIGNUP_URL = 'http://localhost:5000/signup';
const LOGIN_URL = 'http://localhost:5000/login';

// ----- Animations
startbutton.click(function() {
  $("#first").fadeOut("swing");
  setTimeout(present_intro, 1000);
})

loginbutton.click(function() {
  $("#first").fadeOut("swing");
  setTimeout(present_login, 1000);
})

$("#intro-arrow").click(function() {
  $("#intro").fadeOut("swing");
  setTimeout(present_intro_two, 1000);
})

$("#intro2-arrow").click(function() {
  $("#intro2").fadeOut("swing");
  setTimeout(present_signup, 1000);
})

function present_login(){
  $("#login-form").fadeIn("swing");
}

function present_signup(){
  $("#sign-up-form").fadeIn("swing");
}

function present_first(){
  $("#first").fadeIn("swing");
}

function present_intro(){
  $("#intro").fadeIn("swing");
}

function present_intro_two() {
  $("#intro2").fadeIn("swing");
}

$("#backarrow1").click(function(){
  $("#sign-up-form").fadeOut("swing");
  setTimeout(present_first, 1000);
});

$("#backarrow2").click(function(){
  $("#login-form").fadeOut("swing");
  setTimeout(present_first, 1000);
});

// Form Submitting to Post Routes
signup.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(signup);
  const email = formData.get('email')
  const pass = formData.get('password')
  const confirm = formData.get('confirm-password')

  if (pass == confirm){
    const info = {
      email, pass
    }

      fetch(SIGNUP_URL, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          'content-type':'application/json'
        }
      }).then(res => {
        if (res.redirected){
          document.cookie = 'email='+info.email;
          document.cookie = 'password='+info.pass;
          window.location.href = res.url;
        }
      })

    } else {
      // handle passwords that dont match
    }
});


login.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(login);
  const email = formData.get('email');
  const password = formData.get('password');
  const info = {
    email, password
  }

  fetch(LOGIN_URL, {
    method: 'post',
    body: JSON.stringify(info),
    headers: {
      'content-type':'application/json'
    }
  }).then(res => {
    if (res.redirected){
      document.cookie = 'email='+info.email;
      document.cookie = 'password='+info.password;
      window.location.href = res.url;
    }
  })
})
