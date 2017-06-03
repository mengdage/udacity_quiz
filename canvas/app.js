var c = document.querySelector('#canvas');
var ctx = c.getContext('2d');

// var image = new Image();
// // image.src='http://placekitten.com/200/300';
// image.src='http://via.placeholder.com/350x150';
// image.onload = function() {
//   console.log('Loaded image');
//   ctx.drawImage(image, 0, 0, 350, 150);
//   var savedImage = c.toDataURL();
//   console.log(savedImage);
//   window.open(savedImage);
// }
// ctx.strokeRect(50, 50, 100, 100);
//
// ctx.beginPath();
// ctx.moveTo(75, 75);
// ctx.lineTo(125, 125);
// ctx.lineTo(125, 75);
// ctx.fill();
// ctx.rotate(0.1415);

// ctx.fillStyle = '#ff0';
// ctx.fillRect(100, 100, 50, 50);
// ctx.strokeRect(50, 50, 50, 50);

// ctx.save();
// ctx.fillStyle = 'blue';
// ctx.translate(10,10);
// ctx.fillRect(0,0,10,10);
// ctx.restore();
//
//
// ctx.rotate(Math.PI/4);
// ctx.translate(50,0);
// // ctx.fillStyle = 'green';
// ctx.fillRect(0,0, 10,10);
// ctx.rotate(Math.PI/2);

ctx.strokeStyle = '#000';
ctx.font = '36px Impact';
ctx.textAlign = 'center';
ctx.lineWidth = '3px';
ctx.strokeText('CANVAS MEMES!', c.width/2, 40);
