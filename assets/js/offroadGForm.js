function pleaseWaite() {
  $('#submitButton').hide();
  $('#alert-field')
    .removeClass()
    .html("<span><p>Please wait while we're sending your message . . .</p><progress></progress></span>");
}
          
function hasError() {
  // console.log("Something went wrong...");
  alert('Oh no! something went wrong. Please let us know of your problem.');
  $('#alert-field')
    .removeClass()
    .html("<span><p>Oh no! Something went wrong. Please let us know of your problem.</p></span>");
}
          
function formReset() {
  // console.log("in formReset");
  $('#alert-field').show()
    .html("<span><p>Thank you, we'll get back to you asap.</p></span><br>");
  document.getElementById("offroadGForm").reset();
  // $('#offroadGForm')[0].reset();
  setTimeout(() => {
    $('#submitButton').show();
    $('#alert-field').hide();
    console.log('setTimeout for 3 seconds!'); 
  }, 3000);
}

//selector from your HTML form
function offroadGForm(e) {
  // console.log("in offroadGForm");
  //prevent the form from submiting so we can post to the google form
  e.preventDefault();
  pleaseWaite();

  // form is in yong@yonglim.com
  //The public Google Form url, but replace /view with /formResponse
  const formID  = '1FAIpQLSdjjFnL4Hg8Eut6K4cPyW4Tn9UqueCONtghZUJUQZMKoycrNg';
  const formURL = `https://docs.google.com/forms/d/e/${formID}/formResponse`;     
  //AJAX request
  $.ajax({
    url: formURL,     
    data: $('#offroadGForm').serialize(), //Nifty jquery function that gets all the input data 
    type: 'POST', //tells ajax to post the data to the url
    dataType: "json", //the standard data type for most ajax requests
    statusCode: { //the status code from the POST request
      0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
       //success
        formReset();
      }, 
      200: function(data) {//200 is a success code. it went through!
         //success
         // $('#form-success').text('hooray! 200');
        formReset();
      },
      403: function(data) {//403 is when something went wrong and the submission didn't go through
        //error
        hasError();
      }
    }  
  });
};
