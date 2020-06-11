
var startbutton = $("#startbutton");
var loginbutton = $("#loginbutton");
const signup = document.getElementById("sign-up-form");
const API_URL = 'http://localhost:5000/signup';

// ----- Animations
startbutton.click(function() {
  $("#first").fadeOut("swing");
  setTimeout(present_signup, 1000);
})

loginbutton.click(function() {
  $("#first").fadeOut("swing");
  setTimeout(present_login, 1000);
})

function present_login(){
  $("#login-form").fadeIn("swing");
}

function present_signup(){
  $("#sign-up-form").fadeIn("swing");
}


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
