$(document).ready(function () {
  
  function setPlaceholder(selector, placeholder){
    var element = $(selector);
    if(element.length != 0){
      element.attr('placeholder', placeholder);
      element.focus(function(e){ $(this).attr('placeholder', ''); });
      element.focusout(function(e){ $(this).attr('placeholder', placeholder); });
    }
  }

  setPlaceholder('#CardNumber', '1111 2222 3333 4444');
  setPlaceholder('#Cardholder', 'PETR IVANOV');
  setPlaceholder('#CVC2', '123');


});

