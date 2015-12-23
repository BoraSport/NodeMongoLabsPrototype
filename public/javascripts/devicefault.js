// Faultlist data array for filling in info box
var deviceFaultData = [];

// DOM Ready =============================================================


// Polling interval to find new records in the database
var refreshId = setInterval(function(){checkFaults();}, 5000);

// Functions =============================================================

// Stop polling the database for faults
function stopPollFaults() {
	console.log("Stop polling faults");
    clearInterval(refreshId);
};

// Update call to change the data in Axure
// Inputs are the device type and the ID, both are required
function updateAxure(deviceType, deviceId) {
    $axure.setGlobalVariable(deviceType, deviceId);    
};

// Set the device fault data for Axure
function checkFaults() {
    
    // jQuery AJAX call for JSON
    $.getJSON( '/faults/devicefault', function( data ) {

        // Stick our fault data array into a faultlist variable in the global object
        deviceFaultData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        	// Establish the database ID for the fault record
        	$deviceFaultInfoId = this._id;
        	// Logic check to determine if the fault was from an oven or light
        	if (this.device === "light"){
        		$deviceFaultInfoDevice = "device01fault";
        		// $axure.setGlobalVariable(“device01fault", deviceFaultId);
        		console.log("Failed light! Check:" + $deviceFaultInfoId);
        		}
        		else if (this.device === "oven"){
        			$deviceFaultInfoDevice = "device02fault";
        			// $axure.setGlobalVariable(“device02fault", deviceFaultId);
        			console.log("Failed oven! Check:" + $deviceFaultInfoId);
        			}
        		else{
        			// Condition to handle unexpected records
        			$deviceFaultInfoDevice = "Unknown";
        			};
        		});
        	// If there is data update the Axure variables
	    	if (deviceFaultData !== []){
	    		// Sending the device type and the ID to Axure
    			updateAxure($deviceFaultInfoDevice, $deviceFaultInfoId);
	   		 	};
        });

};
