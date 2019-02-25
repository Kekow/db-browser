function successDialog(successMessage = 'Yeah!') {
    const toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    toast({
        type: 'success',
        title: successMessage
    });
}

function errorDialog(errorMessage = 'Sorry, something went wrong!', errorTitle = 'Ops...', functionComplete) {
    swal({
        type: 'error',
        title: errorTitle,
        html: errorMessage,
        width: 500,
    }).then((result) => {
        if (functionComplete) {
            functionComplete();
        }
    });
}

function confirmDialog(confirmMessage, functionYes, functionNo, param) {
    swal({
        type: 'question',
        title: 'Tell me...',
        html: confirmMessage,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        width: 500,
    }).then((result) => {
        if (result.value) {
            if (!functionYes) {
                return;
            }
                
            if (param) {
                functionYes(param);
            } else {
                functionYes();    
            }
        } else {
            if (!functionNo) {
                return;
            }

            if (param) {
                functionNo(param);    
            } else {
                functionNo();    
            }
        }
    });
}
