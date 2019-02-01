function getApiRoute(target) {
    var apiUrl = location.origin + '/api/';
    var apiRoute = apiUrl + target;

    return apiRoute;
}

function ajaxRequestToApi(apiTarget, dataSend, successCallback, customBeforeSendCallback, customCompleteCallback){
    $.ajax({
        url: getApiRoute(apiTarget),
        contentType: 'application/json',
        data : dataSend,
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
        complete: function() {
            if(customCompleteCallback)
                customCompleteCallback();
        }
    });
}
