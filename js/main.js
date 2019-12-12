window.addEventListener('load', onLoad);

function onLoad(){
  const adminEmail = "admin@email.com";
  const userEmail = "user@email.com";
  let isAdmin = true;
  const minPasswordLength =  8;
  document.querySelectorAll('.js_input')[1].oninput = function doesInputExist(){
  document.querySelectorAll('.js_button')[0].disabled = this.value.length >= minPasswordLength ? 0 : 1;
  }
  
  document.querySelectorAll('.js_form')[0].onsubmit = function(e){
    e.preventDefault();

    let email = document.querySelectorAll('.js_input')[0].value;
    let password = document.querySelectorAll('.js_input')[1].value;

    if(email == adminEmail){
      localStorage.setItem('isAdmin', isAdmin);
      console.log( "isAdmin:"+localStorage.getItem('isAdmin'));
      display({
        'text': 'Logged in. Redirecting...'
      });
      setTimeout(function(){
        window.location.assign('news.html');
      }, 1000);
    }
    else if(email == userEmail){
      isAdmin = false;
      localStorage.setItem('isAdmin', isAdmin);
      console.log("isAdmin:"+localStorage.getItem('isAdmin'));
      display({
        'text': 'Logged in. You are common user. Redirecting...'
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
