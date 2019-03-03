// When view_formatted button is clicked, clear results div and setup ajax request
$("#view_formatted").click( function() {
  $("#results").html('');
  var request = $.ajax({
    cache: false,
    url: "data.json",
    dataType: "text",
    async: true
  });

  // Do this if the request is successful
  request.done(function (data, status, request) {
    var json = $.parseJSON(data);
      $("#results").html("<p>" + 
                          json.stu_name + " is taking " +
                          json.course + " and can be reached by email at " +
                          json.stu_email + 
                          "</p>");
    });

  // Do this if there is a problem with the request  
  request.fail(function(request, status, err ) {
    var uStatus = status.toUpperCase(); // clean up status message
    $("#results").html("<p>" + uStatus + ": " + err + "</p>");    

  });

});

// When the view_raw button is clicked
$("#view_raw").click( function() {
  $("#results").html('<pre></pre>');
  $("#results pre").load("data.json", function(response, status, xhr) {
    // Deal with potential errors
    if (status == "error") {
      $("#results").html("<p>" + xhr.status + ": " + xhr.statusText + "</p>");    
    }
  });
});

// Clear the results div
$("#clear").click( function() {
  $("#results").html('');
});