window.addCardToOneClick = false;

if (typeof window.observeOneClickState === 'undefined') {
    window.observeOneClickState = function () {
        if (window.addCardToOneClick) {
            $('#empData').fadeIn('slow');
        } else {
            $('#empData').hide();
        }
    };
}

$(document).ready(function () {
    var OperationID = $('#Operation_ID');
    var t = this;
    $.ajax({
        url: "/pay/bindFcns.cfc",
        type: "post",
        dataType: "html",
        data: {
            method: "getOneClickSaveCard",
            Operation_ID: OperationID.val()
        }, success: function (data) {
            if (data == 1) {
                window.addCardToOneClick = true;
                observeOneClickState();
            }
        }, error: function (xhr, textStatus, errorThrown) {
            try {
                alert(request.responseText);
            } catch (e) {
                //nothing
            }
        }
    });
});
