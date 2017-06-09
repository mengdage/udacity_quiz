var myWorker = new Worker('worker.js');

var first = document.querySelectorAll('input')[0];
first.onchange = function() {
  myWorker.postMessage([first.value, second.value]);
  console.log('Message posted to worker');
};

var second = document.querySelectorAll('input')[1];
second.onchange = function() {
  myWorker.postMessage([first.value, second.value]);
  console.log('Message posted to worker');
};

var result = document.querySelector('.result');
myWorker.onmessage = function(e) {
  result.textContent = e.data;
  console.log('Message received from worker');
};
