// TODO: Convert to Class!

function showSelectResult(idContainer, queryData) {
    // TODO: Send Data.
}

function showErrorQueryResult(queryRunResult) {
    let queryException = queryRunResult.exception;
    let queryMessage = queryRunResult.message;

    errorDialog(queryException, queryMessage, 700);
}

function showSuccessQueryResult(idContainer, queryRunResult) {
    let queryType = queryRunResult.type;
    let queryMessage = queryRunResult.message;

    if (queryType == 'SELECT') {
        let queryData = queryRunResult.data;

        showSelectResult(queryData);
    }

    successDialog(queryMessage);
}

function showQueryResult(idContainer, queryRunResult) {
    let queryState = queryRunResult.state;

    if (queryState == 'success') {
        showSuccessQueryResult(queryRunResult);
    } else if (queryState == 'error') {
        showErrorQueryResult(queryRunResult);
    }

    // TODO: Unknown.
}

function runQuery(idContainer, query) {
	// TODO: Fix!

    $.ajax({
        type: 'POST',
        url: route('api.query.run'),
        data : { 'query': query },
        dataType: 'JSON',
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        beforeSend: function() {
            startLoading();
        }
    }).done(function(queryRunResult) {
    	stopLoading();

        showQueryResult(idContainer, queryRunResult);
	});
}
