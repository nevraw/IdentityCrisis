(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
//  console.log('Submit');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
 //  console.log('Cancel');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}

// Radio control for selecting presets or color choice
var $dateDisplay=0;

$("input[name=dateDisplay]").change(function () {
 $dateDisplay = parseInt(this.value);
});


/*
$("input[name=dateDisplay]").on('click', function() {
 var $dateCheck = parseInt(this.value);
 console.log('$dateCheck: ' + $dateCheck);
 if ($presetCheck > 0) {
//    document.getElementById("cont2").style.visibility="hidden";
    document.getElementById("cont2").style.display="none";
 } else {
//    document.getElementById("cont2").style.visibility="visible"; 
    document.getElementById("cont2").style.display="block";
 }
});
*/

function loadOptions() {
 if (localStorage.dateDisplay) {
  $dateDisplay = localStorage.dateDisplay;
//  console.log('localStorage.dateDisplay: ' + $dateDisplay);
  // setting radio' value
  $("input[name=dateDisplay][value='" + $dateDisplay + "']").attr('checked', 'checked');
 } else {
  $dateDisplay = 0;
//  console.log('localStorage.preset was undefined, now set to: ' + $dateDisplay);
  $("input[name=dateDisplay][value='" + $dateDisplay + "']").attr('checked', 'checked');
 }

// console.log('in loadOptions() $dateDisplay: ' + $dateDisplay);

} 

function getAndStoreConfigData() {
 var options = {
  dateDisplay: $dateDisplay
 };
 
// console.log('Got options: ' + JSON.stringify(options));

 localStorage.dateDisplay = $dateDisplay;

 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}
