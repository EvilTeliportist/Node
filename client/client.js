
var startbutton = $("#startbutton");


startbutton.click(function() {
  $("#first").fadeOut("swing");
  setTimeout(present_login, 1000);
})

function present_login(){
  $("#login-form").fadeIn();
  console.log("2");
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}
