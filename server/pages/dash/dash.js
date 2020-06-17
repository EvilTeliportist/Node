
// Load All Stats and Goals
API_URL = 'http://localhost:5000/info'

fetch(API_URL, {
  method: "GET",
  header: {
    'content-type':'application/json'
  }
}).then(res => res.json())
  .then(function(res) {
    console.log(res);

    // use the info
    $('#totalLandmarks').text(res.userInfo.totalLandmarks);
    $('#hours').text(res.userInfo.totalHours);
    $('#ongoinggoals').text(res.userInfo.goals.length);


    // populate the sidebar with goals
});




// Runtime functions

var color_rotate = 0;

$("#colors").click(function() {
  color_rotate += 20;
  document.querySelector('html').style.filter = 'hue-rotate('+String(color_rotate)+'deg)'
});

$("#newgoalbutton").click(function() {
  $(".goals-container").append("<div class='goal-title'>New Goal</div>");
});
