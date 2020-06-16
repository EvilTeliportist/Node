var rotate = 0;

$("#colors").click(function() {
  rotate += 20;
  document.querySelector('html').style.filter = 'hue-rotate('+String(rotate)+'deg)'
});

$("#newgoalbutton").click(function() {
    var w = $(".dash-content").width() + 72;
    $("#new-goal").css({left:202})
});

$("#minimize-button").click(function() {
    $("#new-goal").css({left:'-80%'})
});

window.onresize = goals_resize;
