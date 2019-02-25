function trySaveConnection() {
	let questionConnectionName = function(connectionDataJson) {
		swal({
        	title: 'Tell me a name for your new connection.',
        	showCancelButton: true,
        	allowOutsideClick: false,
        	confirmButtonText: 'Save',
        	input: 'text',
        	width: 700,
    	}).then((result) => {
	        let connectionName = result.value;

	        let completeCallback = function(validationResult) {
	        	let validationResultJson = validationResult.responseJSON;

	        	if (validationResultJson) {
	        		let completeCallback = function (storeResult) {
        				let storeResultJson = storeResult.responseJSON;

        				if (storeResultJson.success) {
        					successDialog('Connection saved!');	
        				} else {
        					errorDialog('The connection can not be saved, please try again!', 'Ops...', trySaveConnection);
        				}
	        		};

	        		ajaxRequestToApi(
        				'api.connection.store',
        				{ "name": connectionName, "data":  connectionDataJson},
        				null,
        				null,
        				completeCallback
    				);	
	        	} else {
	        		errorDialog('There is already a connection with this name, please try again!', 'Ops...', trySaveConnection);
	        	}
	        }

	        ajaxRequestToApi(
        		'api.connection.store.validation',
        		{ "name": connectionName },
        		null,
        		null,
        		completeCallback
    		);
    	});
	};

	// TODO: Use Resources.
	let completeCallback = function(connectionData) {
		let connectionDataJson = connectionData.responseJSON;
        
        if (connectionDataJson) {
			confirmDialog(
				'It looks like you started a new connection on this instance of DBBrowser, do you want to save it in the list of known connections?',
				questionConnectionName,
				null,
				connectionDataJson
			);
        }
    };

	ajaxRequestToApi(
        'api.connection.info',
        null,
        null,
        null,
        completeCallback
    );
}

function isNewConnection() {
	return true;
}

$(document).ready(function() {
	let newConnection = isNewConnection();

	if (newConnection) {
		trySaveConnection();
	}
})