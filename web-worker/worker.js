// Now the worker is effectively the global scope.
// Thus worker.onmessage can be used as onmessage
onmessage = function(e) {
  console.log('Message received from main script: ');
  console.log(e);
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
};
