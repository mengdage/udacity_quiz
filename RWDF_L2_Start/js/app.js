var menu = document.querySelector('#menu');
var main = document.querySelector('main');
var nav = document.querySelector('.nav');
menu.addEventListener('click', function(e){
  nav.classList.toggle('open');
  e.stopPropagation();
});

main.addEventListener('click', function(){
  nav.classList.remove('open');
})
