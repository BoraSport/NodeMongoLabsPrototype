// Faultlist data array for filling in info box
var faultListData = [];


// DOM Ready =============================================================
$(document).ready(function() {

	// Warning notice about using the TEAGUE internal network
	console.log("Warning! This page will not run on the TEAGUE internal network");

    // Populate the fault table on initial page load
    populateTable();

    // Fault link click
    $('#faultList table tbody').on('click', 'td a.linkshowfault', showFaultInfo);

    // Add Fault button click
    $('#btnAddFault').on('click', addFault);

    // Delete Fault link click
    $('#faultList table tbody').on('click', 'td a.linkdeletefault', deleteFault);

    // Stop Polling Faults click
    $('#btnStopPolling').on('click', stopPollFaults);

});

// Polling interval to find new records in the database
var refreshId = setInterval(function(){populateTable();}, 5000);

// Functions =============================================================

// Stop polling the database for faults
function stopPollFaults() {
	console.log("Stop polling faults");
    clearInterval(refreshId);
};

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';
    
    // jQuery AJAX call for JSON
    $.getJSON( '/faults/faultlist', function( data ) {

        // Stick our fault data array into a faultlist variable in the global object
        faultListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        	var lastRecordId = this._id
            tableContent += '<tr>';
            tableContent += '<td>' + this.datetime + '</td>';
            tableContent += '<td><a href="#" class="linkshowfault" rel="' + this.url + '" title="Show Details">' + this.url + '</a></td>';
            tableContent += '<td>' + this.device + '</td>';
            tableContent += '<td><a href="#" class="linkdeletefault" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#faultList table tbody').html(tableContent);
    });
};


// Show Fault Info
function showFaultInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve URL from link rel attribute
    var thisUrl = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = faultListData.map(function(arrayItem) { return arrayItem.url; }).indexOf(thisUrl);

    // Get our Fault Object
    var thisFaultObject = faultListData[arrayPosition];

    //Populate Info Box
    $('#faultInfoId').text(thisFaultObject._id);
    $('#faultInfoDatetime').text(thisFaultObject.datetime);
    $('#faultInfoUrl').text(thisFaultObject.url);
    $('#faultInfoDevice').text(thisFaultObject.device);

};

// Add fault
function addFault(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addFault input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all fault info into one object
        var newFault = {
            'url': $('#addFault fieldset input#inputUrl').val(),
            'device': $('#addFault fieldset input#inputDevice').val(),
        }

        // Use AJAX to post the object to our addfault service
        $.ajax({
            type: 'POST',
            data: newFault,
            url: '/faults/addfault',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addFault fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete fault
function deleteFault(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this fault record?');

    // Check and make sure the fault confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/faults/deletefault/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};