$(function() {
  $('.form-control').focus(formFocus);
});

function formFocus() {
  $('#alert-field')
    .removeClass()
    .addClass('hidden');
}

function sendOffroad(e) {
  e.preventDefault();

  console.log("in sendOffroad");
  
  const POST_URL = 'https://script.google.com/macros/s/AKfycbwVIhA_IOoj3eA9tI5i05kkg6kC-48lF-MQiJK3ctVIv6CGdvAoqEefkbO3NREeWSX6eQ/exec'
  const postRequest = {
    name   : e.target['name'].value,
    email  : e.target['email'].value,
    message: e.target['message'].value,
  };

  if(POST_URL) {
    $.post(POST_URL, JSON.stringify(postRequest))
      .then(res => {
        e.target.reset();
        $('#alert-field')
          .removeClass()
          .addClass(`alert alert-${res.code}`)
          .text(res.msg);
      });

    $('#alert-field')
      .removeClass()
      .html('<progress></progress>')
      .removeClass('hidden');
  } else {
    alert('You must set the POST_URL variable with your script ID');
  }
}

