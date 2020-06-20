var rotate = 0;

$("#colors").click(function() {
  rotate += 20;
  document.querySelector('html').style.filter = 'hue-rotate('+String(rotate)+'deg)'
});
