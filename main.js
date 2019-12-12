window.addEventListener('load', onLoad);

function onLoad(){
  document.querySelectorAll('.input')[1].oninput = function(){
  document.querySelectorAll('.button')[0].disabled = this.value.length >= 8 ? 0 : 1;
  }
  
  document.querySelectorAll('.form')[0].onsubmit = function(e){
    e.preventDefault();

    let email = document.querySelectorAll('.input')[0].value;
    let password = document.querySelectorAll('.input')[1].value;

    if(email == 'admin@email.com'){
      localStorage.setItem('isAdmin', true);
      console.log( "isAdmin:"+localStorage.getItem('isAdmin'));
      display({
        'text': 'Authorization is successful. You are admin. Redirecting...'
      });
      setTimeout(function(){
        window.location.assign('news.html');
      }, 1000);
    }
    else if(email == 'user@email.com'){
      localStorage.setItem('isAdmin', false);
      console.log("isAdmin:"+localStorage.getItem('isAdmin'));
      display({
        'text': 'Authorization is successful. You are common user. Redirecting...'
      });
      setTimeout(function(){
        window.location.assign('news.html');
      }, 1000);
    }else display({
      'text': 'Username or password do not match',
      'error': 1
    });
  }
}

function display(data){
  clearTimeout(this.timer);
  clearTimeout(this.timerHide);
  let msg = document.querySelectorAll('.message')[0];
  msg.className = data['error'] ? 'message error' : 'message';
  msg.innerHTML = data['text'];
  msg.style.visibility = "visible";
  msg.style.opacity = 1;
  this.timer = setTimeout(function(){
    msg.style.opacity = 0;
    display.timerHide = setTimeout(function(){
      msg.style.visibility = "hidden";
    }, 400);
  }, 3000);
}
