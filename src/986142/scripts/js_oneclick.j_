$(document).ready(function (){
   var OperationID = $('#Operation_ID');
   var t = this;
           
        $.ajax({
            url: "/pay/bindFcns.cfc"
                , type: "post"
                , dataType: "html"
                , data: {
                    method: "getOneClickState",
                    Operation_ID: OperationID.val()
                    }
                    , success: function (data){
                        //empData.innerHTML = data;
						if(data == 1) {
							$('#empData').fadeToggle();
							$('#empData').css("display","block").removeClass("OneClickOff");
							$('.Title1').slideToggle();
						}

                    }
                    , error: function (xhr, textStatus, errorThrown){
                        try {
                            alert(request.responseText);
                        } catch (e) {
                            //nothing
                        }
                    }
                });

    this.lastValue = this.value;

    $('body').append('<div id="ajaxBusy"><p><img src="/template/img/loading.gif"></p></div>');

    $('#ajaxBusy').css({    display:"none",    margin:"0px",    paddingLeft:"0px",    paddingRight:"0px",    paddingTop:"0px",    paddingBottom:"0px",    position:"absolute",    right:"3px",    top:"3px",     width:"auto"  });



    $(document).ajaxStart(function()	{
        $('#ajaxBusy').show();
    }).ajaxStop(function(){
                $('#ajaxBusy').hide();
            });

});