function ajaxRequestToApi(apiTarget, dataSend, successCallback, customBeforeSendCallback, customCompleteCallback) {
    let url = "";
    try {
        url = route(apiTarget);
    } catch(err) {
        url = apiTarget;
    }
    $.ajax({
        url: url,
        contentType: 'application/json',
        data : dataSend,
        dataType: 'json',
        beforeSend: function() {
            startLoading();

            if(customBeforeSendCallback)
                customBeforeSendCallback();
        },
        success : function(resultData) {
            stopLoading();
            setTimeout(
                function(){
                    if(successCallback)
                        successCallback(resultData);
                },
                500
            );
        },
        error: function(errorObj, textStatus, errorThrown) {
            stopLoading();
            setTimeout(
                function(){
                    let statusCode = errorObj.status
                    let message = textStatus + ' ' + statusCode + ' - ' + errorThrown;
                    errorDialog( message );
                },
                500
            );
        },
        complete: function(resultData) {
            if(customCompleteCallback)
                customCompleteCallback(resultData);
        }
    });
}
