var c = document.querySelector('#canvas');
var ctx = c.getContext('2d');

// var image = new Image();
// // image.src='http://placekitten.com/200/300';
// image.src='http://via.placeholder.com/350x150';
// image.onload = function() {
//   console.log('Loaded image');
//   ctx.drawImage(image, 0, 0);
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

// ctx.strokeStyle = '#000';
// ctx.font = '36px Impact';
// ctx.textAlign = 'center';
// ctx.lineWidth = '3px';
// ctx.strokeText('CANVAS MEMES!', c.width/2, 40);
// function changeNthPixelToGreen(imageData, n) {
//   var index = (n)*4;
//   imageData.data[index] = 0;
//   imageData.data[index+1] = 255;
//   imageData.data[index+2] = 0;
//   imageData.data[index+3] = 255;
// }
// var imgData = ctx.getImageData(0, 0, c.width, c.height);
// function paintGreen(imageData) {
//   var dataLength = imageData.width * imageData.height;
//   for(var n = 0; n < dataLength; n+=10) {
//     changeNthPixelToGreen(imageData, n);
//   }
//   ctx.putImageData(imageData, 0, 0);
// }
// paintGreen(imgData);
// console.log(imgData);

document.addEventListener('DOMContentLoaded', function(){
  var v = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  v.addEventListener('loadedmetadata', function() {
    canvas.width = this.videoWidth;
    canvas.height = this.videoHeight;
  });

  var draw = function() {
    canvas.getContext('2d').drawImage(v, 0, 0);
  }

  v.addEventListener('play', function(){
    draw();
  })
})
