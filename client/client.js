
var startbutton = $("#startbutton");
var loginbutton = $("#loginbutton");

const signup = document.getElementById("sign-up-form");
const API_URL = 'http://localhost:5000/signup';

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

      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          'content-type':'application/json'
        }
      });
    } else {
      // handle passwords that dont match
    }
});
