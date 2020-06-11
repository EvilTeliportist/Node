
var startbutton = $("#startbutton");
var loginbutton = $("#loginbutton")

startbutton.click(function() {
  $("#first").fadeOut("swing");
  setTimeout(present_signup, 1000);
})

loginbutton.click(function() {
  $("#first").fadeOut("swing");
  setTimeout(present_login, 1000);
})

function present_login(){
  console.log("login");
  $("#login-form").fadeIn("swing");
}

function present_signup(){
  console.log("signup");
  $("#sign-up-form").fadeIn("swing");
}
